import { PrismaClient, Cart, Order } from "@prisma/client";
import ICustomerOrderService from "./ICustomerOrder.service";
import DBClient from "../../../PrismaClient";

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
      throw new Error("Failed to check cart items availability");
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
      const order = await this._db.prisma.order.create({
        data: {
          date: new Date(), 
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
}
