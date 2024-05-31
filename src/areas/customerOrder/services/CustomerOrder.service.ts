import { PrismaClient, Cart, Order, Customer } from "@prisma/client";
import ICustomerOrderService from "./ICustomerOrder.service";
import DBClient from "../../../PrismaClient";
import moment from 'moment-timezone';

export class CustomerOrderService implements ICustomerOrderService {
  readonly _db: DBClient = DBClient.getInstance();

  async getCartItemByUserIdAndProductId(userId: number, productId: number): Promise<Cart | null> {
    try {
      return await this._db.prisma.cart.findFirst({
        where: { userId, productId },
      });
    } catch (error) {
      console.error("Error fetching cart item:", error);
      throw new Error("Failed to fetch cart item");
    }
  }

  async addProductToCart(customerId: number, productId: number, quantity: number): Promise<Cart> {
    try {
      return await this._db.prisma.cart.create({
        data: {
          userId: customerId,
          productId,
          quantity: quantity,
        },
      });
    } catch (error) {
      console.error("Error adding product to cart:", error);
      throw new Error("Failed to add product to cart");
    }
  }

  async addQuantityByOne(cartId: number): Promise<Cart> {
    try {
      const existingCartItem = await this._db.prisma.cart.findUnique({
        where: { cartId },
      });
      if (!existingCartItem) {
        throw new Error("Cart item not found");
      }
  
      const newQuantity = existingCartItem.quantity + 1;
  
      return await this._db.prisma.cart.update({
        where: { cartId },
        data: { quantity: newQuantity },
      });
    } catch (error) {
      console.error("Error adding quantity to cart item:", error);
      throw new Error("Failed to add quantity to cart item");
    }
  }

  async getCart(userId: number): Promise<Cart[]> {
    const cartItems = await this._db.prisma.cart.findMany({
      where: { userId },
      include: { product: true },
    });
    return cartItems;
  }

  async checkCartItemsAvailability(userId: number): Promise<void> {
    try {
      const cartItems = await this._db.prisma.cart.findMany({
        where: { userId },
        include: { product: true },
      });

      for (const item of cartItems) {
        if (item.quantity > item.product.quantity) {
          throw new Error(`Product ${item.product.name} is not available in the requested quantity.`);
        }
      }
    } catch (error) {
      console.error("Error checking cart items availability:", error);
      throw new Error("Product is not available in the requested quantity.");
    }
  }

  
  async deleteCartItemsForUser(userId: number): Promise<void> {
    try {
      await this._db.prisma.cart.deleteMany({
        where: { userId },
      });
    } catch (error) {
      console.error("Error deleting cart items:", error);
      throw new Error("Failed to delete cart items");
    }
  }

  async createOrder(
    customerId: number,
    contactFirstname: string,
    contactLastname: string,
    contactEmail: string,
    schedule: Date,
    total: number,
    type: string
  ): Promise<Order> {
    try {
      const timeZone = 'America/Vancouver';
      const pacificTime = moment().tz(timeZone).format('YYYY-MM-DDTHH:mm:ssZ');

      const order = await this._db.prisma.order.create({
        data: {
          date: pacificTime, 
          customerId: customerId,
          type: type,
          total: total,
          contactFirstname: contactFirstname,
          contactLastname: contactLastname,
          contactEmail: contactEmail,
          schedule: schedule
        },
      });

      return order;
    } catch (error) {
      console.error("Error creating order:", error);
      throw new Error("Failed to create order");
    }
  }

  async deductProductQuantities(userId: number): Promise<void> {
    const cartItems = await this._db.prisma.cart.findMany({
      where: { userId },
      include: { product: true },
    });

    for (const item of cartItems) {
      await this._db.prisma.product.update({
        where: { productId: item.productId },
        data: { quantity: Math.max(0, item.product.quantity - item.quantity) },
      });
    }
  }

  async createProductOrders(userId: number, orderId: number): Promise<void> {
    const cartItems = await this._db.prisma.cart.findMany({
      where: { userId },
      select: { productId: true, quantity: true },
    });

    for (const item of cartItems) {
      await this._db.prisma.productOrder.create({
        data: {
          orderId,
          productId: item.productId,
          quantity: item.quantity
        },
      });
    }
  }

  async getRecentOrder(userId: number): Promise<Order | null> {
    try {
      const recentOrder = await this._db.prisma.order.findFirst({
        where: { customerId: userId },
        orderBy: { date: 'desc' },
        include: {
          productOrders: {
            include: {
              product: true,
            },
          },
        },
      });
  
      return recentOrder;
    } catch (error) {
      console.error("Error fetching recent order:", error);
      throw new Error("Failed to fetch recent order");
    }
  }

  async findCustomerById(customerId: number): Promise<Customer | null> {
    return await this._db.prisma.customer.findUnique({
      where: { customerId },
    });
  }
}


