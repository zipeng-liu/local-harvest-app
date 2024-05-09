import { PrismaClient, Cart } from "@prisma/client";
import ICustomerOrderService from "./ICustomerOrder.service";
import DBClient from "../../../PrismaClient";

export class CustomerOrderService implements ICustomerOrderService {
  readonly _db: DBClient = DBClient.getInstance();

  async addProductToCart(customerId: number, productId: number): Promise<Cart> {
    try {
      return await this._db.prisma.cart.create({
        data: {
          userId: customerId,
          productId,
          quantity: 1,
        },
      });
    } catch (error) {
      console.error("Error adding product to cart:", error);
      throw new Error("Failed to add product to cart");
    }
  }
}