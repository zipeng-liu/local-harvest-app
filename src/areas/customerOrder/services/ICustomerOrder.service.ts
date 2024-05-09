import type { Cart, Product } from "@prisma/client";

interface ICustomerOrderService {
  addProductToCart(customerId: number, productId: number): Promise<Cart>;
}

export default ICustomerOrderService;