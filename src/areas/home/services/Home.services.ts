import IHomeService from "./IHome.services";
import DBClient from "../../../PrismaClient";
import type { Vendor, Market, Product } from "@prisma/client";



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

  async getAllProducts(): Promise<Product[]> {
    try {
        const allProducts = await this._db.prisma.product.findMany();
        return allProducts;
    } catch(error) {
        throw new Error ("Failed to get all markets")
    }
  };

  }