import ICustomerProfileService from "./ICustomerProfile.service";
import type { Customer } from "@prisma/client";
import DBClient from "../../../PrismaClient";

export class CustomerProfileService implements ICustomerProfileService {
  private readonly _db: DBClient = DBClient.getInstance();

  async findCustomerById(customerId: number): Promise<Customer | null> {
    return await this._db.prisma.customer.findUnique({
      where: { customerId },
    //   include: {
    //     products: true,
    //   },
    });
  }
}
