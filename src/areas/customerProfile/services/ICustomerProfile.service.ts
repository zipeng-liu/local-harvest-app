import type { Customer, Order } from "@prisma/client";

interface ICustomerProfileService {
  findCustomerById(customerId: number): Promise<Customer | null>;
  findRecentCustomerOrders(customerId: number): Promise<Order[]>;
}

export default ICustomerProfileService;
