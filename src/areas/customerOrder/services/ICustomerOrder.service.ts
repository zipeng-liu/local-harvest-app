import type { Cart, Product, Order } from "@prisma/client";

interface ICustomerOrderService {
  addProductToCart(customerId: number, productId: number, quantity: number): Promise<Cart>;
  getCartItemByUserIdAndProductId(userId: number, productId: number): Promise<Cart | null>;
  addQuantityByOne(cartId: number): Promise<Cart>;
  checkCartItemsAvailability(userId: number): Promise<void>;
  deleteCartItemsForUser(userId: number): Promise<void>;
  createOrder(
    customerId: number,
    contactFirstname: string,
    contactLastname: string,
    contactEmail: string,
    schedule: Date,
    total: number,
    type: string
  ): Promise<Order>
  deductProductQuantities(userId: number): Promise<void>;
  createProductOrders(userId: number, orderId: number): Promise<void>;
  getCart(userId: number): Promise<Cart[]>;
}

export default ICustomerOrderService;