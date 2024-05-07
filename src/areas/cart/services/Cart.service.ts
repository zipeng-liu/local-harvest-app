import DBClient from "../../../PrismaClient";
import { ICartService } from "./ICart.service";
import type { Cart, Vendor } from "@prisma/client";


export class CartService implements ICartService {
  readonly _db: DBClient = DBClient.getInstance();

  async getCartByUserId(userId: number): Promise<Cart[]> {
    try {
      return await this._db.prisma.cart.findMany({
        where: {
          userId: userId
        },
        include: {
          product: true  
        }
      });
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
      throw new Error("Unable to retrieve cart items.");
    }
  }

  // Remove an item from the cart
  async removeFromCart(cartId: number): Promise<Cart> {
    try {
      return await this._db.prisma.cart.delete({
        where: {
          cartId: cartId
        }
      });
    } catch (error) {
      console.error("Failed to remove cart item:", error);
      throw new Error("Unable to remove item from cart.");
    }
  }

  // Update the quantity of a cart item
  async updateCartItem(cartId: number, quantity: number): Promise<Cart> {
    try {
      return await this._db.prisma.cart.update({
        where: {
          cartId: cartId
        },
        data: {
          quantity: quantity
        }
      });
    } catch (error) {
      console.error("Failed to update cart item:", error);
      throw new Error("Unable to update cart item.");
    }
  }
}
