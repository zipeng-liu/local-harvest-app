import { PrismaClient, Cart } from "@prisma/client";
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
  
}