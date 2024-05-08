import type { Cart, Vendor } from "@prisma/client";

export interface ICartService {
  getCartByUserId(userId: number): Promise<Cart[]>;
  removeFromCart(cartId: number): Promise<Cart>;
  updateCartItem(cartId: number, quantity: number): Promise<Cart>;
  getCartItemCount(userId: number): Promise<number>;
  increaseCartItem(cartId: number, userId: number): Promise<Cart>;
  decreaseCartItem(cartId: number, userId: number): Promise<Cart>;
}
