import { Cart, Product } from "@prisma/client";

export default interface ICartService {
  addProductToCart(customerId: number, productId: number, quantity: number): Promise<Cart>;
  getCartByUserId(customerId: number): Promise<Cart[]>;
  removeProductFromCart(customerId: number, productId: number): Promise<boolean>;
  increaseProductQuantity(customerId: number, productId: number): Promise<Cart | null>;
  decreaseProductQuantity(customerId: number, productId: number): Promise<Cart | null>;
  clearCart(customerId: number): Promise<void>;
}
