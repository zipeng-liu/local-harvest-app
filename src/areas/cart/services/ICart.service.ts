import type { Cart, Vendor } from "@prisma/client";

export interface ICartService {
  getCartByUserId(userId: number): Promise<Cart[]>,
  removeFromCart(cartId: number): Promise<Cart>,
  updateCartItem(cartId: number, quantity: number): Promise<Cart>
}
