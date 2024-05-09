import { Cart, Product } from "@prisma/client";

export interface ICartService {
  getCartByUserId(customerId: number): Promise<any>;
  removeProductFromCart(cartId: number): Promise<boolean>;
  increaseCartItem(cartId: number): Promise<Cart>;
  decreaseCartItem(cartId: number): Promise<Cart>;
  updateCartItemQuantity(cartId: number, change: number): Promise<Cart>;
  getCartCount(customerId: number): Promise<number>; 
}
