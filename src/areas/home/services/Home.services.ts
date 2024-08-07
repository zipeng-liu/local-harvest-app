import IHomeService from "./IHome.services";
import DBClient from "../../../PrismaClient";
import type { Vendor, Market, Product, Customer } from "@prisma/client";



export class HomeService implements IHomeService {
  private readonly _db: DBClient = DBClient.getInstance();

  async getAllMarkets(): Promise<Market[]> {
    try {
        const allMarkets = await this._db.prisma.market.findMany();
        return allMarkets;
    } catch(error) {
        throw new Error ("Failed to get all markets")
    }
  };

  async getAllVendors(): Promise<Vendor[]> {
    try {
        const allVendors = await this._db.prisma.vendor.findMany();
        return allVendors;
    } catch(error) {
        throw new Error ("Failed to get all markets")
    }
  };

  async getAllAvailableProducts(): Promise<Product[]> {
    try {
        const allAvailableProducts = await this._db.prisma.product.findMany({
          where: {
            quantity: {
              gt: 0
            }
          }
        });
        return allAvailableProducts;
    } catch(error) {
        throw new Error ("Failed to get all markets")
    }
  };


  async findCustomerById(customerId: number): Promise<Customer | null> {
    try {
      const customer = await this._db.prisma.customer.findUnique({
        where: { 
          customerId: customerId 
        }
      });
      if(!customer) {
        throw new Error ("Failed to get customer for homepage")
      }
      return customer;
    } catch(error) {
      throw new Error ("Failed to get customer for homepage")
    }
  }

  async findVendorById(vendorId: number): Promise<Vendor | null> {
    try {
      const vendor = await this._db.prisma.vendor.findUnique({
        where: {
          vendorId: vendorId
        }
      });
      if(!vendor) {
        throw new Error("Failed to get vendor for homepage")
      }
      return vendor;
    } catch(error) {
      throw new Error("Failed to get vendor for homepage")
    }
  }
  }