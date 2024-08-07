import ICustomerProfileService from "./ICustomerProfile.service";
import type { Customer, Order } from "@prisma/client";
import DBClient from "../../../PrismaClient";

export class CustomerProfileService implements ICustomerProfileService {
  private readonly _db: DBClient = DBClient.getInstance();

  async findCustomerById(customerId: number): Promise<Customer | null> {
    return await this._db.prisma.customer.findUnique({
      where: { customerId },
    });
  }

  async findRecentCustomerOrders(customerId: number): Promise<Order[]> {
    return await this._db.prisma.order.findMany({
      where: { customerId },
      include: {
        productOrders: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
      take: 3,
    });
  }
}
