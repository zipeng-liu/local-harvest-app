import IMarketService from "./IMarket.services";
import DBClient from "../../../PrismaClient";
import type { Vendor, Market, Product } from "@prisma/client";

export class MarketService implements IMarketService {
  private readonly _db: DBClient = DBClient.getInstance();

  async getAllMarkets(): Promise<Market[]> {
    try {
      const allMarkets = await this._db.prisma.market.findMany();
      return allMarkets;
    } catch (error) {
      throw new Error("Failed to get all markets");
    }
  }

  async getAllVendors(): Promise<Vendor[]> {
    try {
      const allVendors = await this._db.prisma.vendor.findMany();
      return allVendors;
    } catch (error) {
      throw new Error("Failed to get all markets");
    }
  }

  async getAllProducts(): Promise<Product[]> {
    try {
      const allProducts = await this._db.prisma.product.findMany();
      return allProducts;
    } catch (error) {
      throw new Error("Failed to get all markets");
    }
  }

  async getMarketById(marketId: number): Promise<Market | null> {
    try {
      // Check if marketId is a valid number
      if (!Number.isInteger(marketId)) {
        console.error("Invalid market ID provided:", marketId);
        return null; // or throw an Error depending on how you want to handle this case
      }

      return await this._db.prisma.market.findUnique({
        where: { marketId },
        include: { vendors: true },
      });
    } catch (error) {
      console.error("Error fetching market by ID:", error);
      throw error;
    }
  }

  async getVendorsByMarketId(marketId: number): Promise<Vendor[] | null> {
    const market = await this._db.prisma.market.findUnique({
      where: { marketId },
      include: { vendors: true },
    });

    return market?.vendors || null;
  }
}
