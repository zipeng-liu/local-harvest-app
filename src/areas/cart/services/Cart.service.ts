import { PrismaClient, Cart } from "@prisma/client";
import { ICartService } from "./ICart.service";
import DBClient from "../../../PrismaClient";

export class CartService implements ICartService {
  readonly _db: DBClient = DBClient.getInstance();

  async getCartByUserId(customerId: number): Promise<any> {
    try {
      return await this._db.prisma.cart.findMany({
        where: { userId: customerId },
        include: { product: true },
      });
    } catch (error) {
      console.error("Error fetching cart by user ID:", error);
      throw new Error("Failed to fetch cart items");
    }
  }

  async removeProductFromCart(cartId: number): Promise<boolean> {
    try {
      const cartItem = await this._db.prisma.cart.findUnique({
        where: { cartId }
      });
  
      if (cartItem) {
        await this._db.prisma.cart.delete({
          where: { cartId }
        });
        return true; 
      }
      return false; 
    } catch (error) {
      console.error("Error removing product from cart:", error);
      throw new Error("Failed to remove product from cart");
    }
  }
  

  async increaseCartItem(cartId: number): Promise<Cart> {
    return this.updateCartItemQuantity(cartId, 1);
  }

  async decreaseCartItem(cartId: number): Promise<Cart> {
    return this.updateCartItemQuantity(cartId, -1);
  }

  async updateCartItemQuantity(cartId: number, change: number): Promise<Cart> {
    try {
      const existingCartItem = await this._db.prisma.cart.findUnique({ where: { cartId } });
      if (!existingCartItem) throw new Error("Cart item not found");

      const newQuantity = existingCartItem.quantity + change;
      if (newQuantity <= 0) {
        await this._db.prisma.cart.delete({ where: { cartId: existingCartItem.cartId } });
        return existingCartItem;
      }

      return await this._db.prisma.cart.update({
        where: { cartId: existingCartItem.cartId },
        data: { quantity: newQuantity },
      });
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
      throw new Error("Failed to update cart item quantity");
    }
  }
  async getCartCount(customerId: number): Promise<number> {
    try {
      const uniqueItemCount = await this._db.prisma.cart.count({
        where: { userId: customerId }
      });
  
      return uniqueItemCount;
    } catch (error) {
      console.error("Error counting unique items in the cart:", error);
      throw new Error("Failed to count unique items in the cart");
    }
  }
  
}

