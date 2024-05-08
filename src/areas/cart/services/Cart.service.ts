import DBClient from "../../../PrismaClient";
import { ICartService } from "./ICart.service";
import type { Cart, Vendor } from "@prisma/client";

export class CartService implements ICartService {
  readonly _db: DBClient = DBClient.getInstance();

  async getCartByUserId(userId: number): Promise<Cart[]> {
    try {
      return await this._db.prisma.cart.findMany({
        where: {
          userId: userId,
        },
        include: {
          product: true,
        },
      });
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
      throw new Error("Unable to retrieve cart items.");
    }
  }
  async getCartItemCount(userId: number): Promise<number> {
    try {
      const result = await this._db.prisma.cart.aggregate({
        where: {
          userId: userId,
        },
        _sum: {
          quantity: true,
        },
      });
      return result._sum.quantity || 0;
    } catch (error) {
      console.error("Failed to count cart items:", error);
      throw new Error("Unable to count cart items.");
    }
  }

  // Remove an item from the cart
  async removeFromCart(cartId: number): Promise<Cart> {
    try {
      return await this._db.prisma.cart.delete({
        where: {
          cartId: cartId,
        },
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
          cartId: cartId,
        },
        data: {
          quantity: quantity,
        },
      });
    } catch (error) {
      console.error("Failed to update cart item:", error);
      throw new Error("Unable to update cart item.");
    }
  }

  async increaseCartItem(cartId: number, userId: number): Promise<Cart> {
    return this.updateCartItemQuantity(cartId, userId, 1);
  }

  async decreaseCartItem(cartId: number, userId: number): Promise<Cart> {
    return this.updateCartItemQuantity(cartId, userId, -1);
  }

  private async updateCartItemQuantity(
    cartId: number,
    userId: number,
    change: number
  ): Promise<Cart> {
    const existingCartItem = await this._db.prisma.cart.findUnique({
      where: { cartId: cartId, userId: userId },
    });
    if (!existingCartItem) {
      throw new Error("Cart item not found or does not belong to the user");
    }
    const newQuantity = existingCartItem.quantity + change;
    if (newQuantity <= 0) {
      return this.removeFromCart(cartId);
    }
    return await this._db.prisma.cart.update({
      where: { cartId: cartId },
      data: { quantity: newQuantity },
    });
  }
}
