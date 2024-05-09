import type { Cart, Product } from "@prisma/client";

interface ICustomerOrderService {
  addProductToCart(customerId: number, productId: number, quantity: number): Promise<Cart>;
  getCartItemByUserIdAndProductId(userId: number, productId: number): Promise<Cart | null>;
  addQuantityByOne(cartId: number): Promise<Cart>;
}

export default ICustomerOrderService;