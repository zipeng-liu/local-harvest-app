import { Cart, Product } from "@prisma/client";

export default interface ICartService {
  addProductToCart(
    customerId: number,
    productId: number,
    quantity: number
  ): Promise<Cart>;
  getCartByUserId(customerId: number): Promise<Cart[]>;
  removeProductFromCart(
    customerId: number,
    productId: number
  ): Promise<boolean>;
  updateProductQuantity(
    customerId: number,
    productId: number,
    quantity: number
  ): Promise<Cart>;
  clearCart(customerId: number): Promise<boolean>;
  calculateCartTotal(customerId: number): Promise<number>;
}
