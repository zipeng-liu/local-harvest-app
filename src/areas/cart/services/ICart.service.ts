import { Cart, Product } from "@prisma/client";

export interface ICartService {
  getCartByUserId(userId: number): Promise<Cart[]>;
  removeProductFromCart(customerId: number, productId: number): Promise<boolean>;
  updateCartItem(cartId: number, quantity: number): Promise<Cart>;
  getCartItemCount(userId: number): Promise<number>;
  increaseCartItem(cartId: number, userId: number): Promise<Cart>;
  decreaseCartItem(cartId: number, userId: number): Promise<Cart>;
}
