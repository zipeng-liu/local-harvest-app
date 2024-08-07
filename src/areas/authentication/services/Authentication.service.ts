import DBClient from "../../../PrismaClient";
import { IVendorAuthenticationService, ICustomerAuthenticationService } 
from "./IAuthentication.service";
import type { Customer, Vendor } from "@prisma/client";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export class VendorAuthenticationService implements IVendorAuthenticationService {
  readonly _db: DBClient = DBClient.getInstance();

  async findUserByEmail(email: string): Promise<Vendor | null> {
    const vendor = await this._db.prisma.vendor.findUnique({
      where: {
        email: email,
      },
    });
    return vendor;
  }
  
  public async getUserByEmailAndPassword(email: string, password: string): Promise<Vendor | null> {
    const vendor = await this._db.prisma.vendor.findUnique({
      where: {
        email: email,
      },
    });

    if (vendor && vendor.password === password) {
      return vendor;
    }

    return null; 
  }

  public async getUserById(id: string): Promise<Vendor | null> {
    const user = await this._db.prisma.vendor.findUnique({
      where: {
        vendorId: parseInt(id, 10), 
      },
    });

    return user || null;
  }
}


export class CustomerAuthenticationService implements ICustomerAuthenticationService {
  readonly _db: DBClient = DBClient.getInstance();

  async findUserByEmail(email: string): Promise<Customer | null> {
    const customer = await this._db.prisma.customer.findUnique({
      where: {
        email: email,
      },
    });
    return customer;
  }
  
  public async getUserByEmailAndPassword(email: string, password: string): Promise<Customer | null> {
    const customer = await this._db.prisma.customer.findUnique({
      where: {
        email: email,
      },
    });

    if (customer && customer.password === password) {
      return customer;
    }

    return null; 
  }

  public async getUserById(id: string): Promise<Customer | null> {
    const user = await this._db.prisma.customer.findUnique({
      where: {
        customerId: parseInt(id, 10), 
      },
    });

    return user || null;
  }
}