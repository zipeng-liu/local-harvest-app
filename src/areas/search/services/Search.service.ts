import DBClient from "../../../PrismaClient";
import type { Market, Vendor, Product } from "@prisma/client";
import ISearchService from "./ISearchService";

export class SearchService implements ISearchService {
    readonly _db: DBClient = DBClient.getInstance();

    async searchResults(query: string): Promise<[Market[], Vendor[], Product[]] | undefined> {
        try {
            const markets = await this._db.prisma.market.findMany({
                where: {
                    name: { contains: query }
                }
            });
            const vendors = await this._db.prisma.vendor.findMany({
                where: {
                    name: { contains: query }
                }
            });
            const products = await this._db.prisma.product.findMany({
                where: {
                    name: { contains: query }
                }
            });
            return [ markets, vendors, products ]
        } catch(error) {
            throw new Error("Failed to get search results")
        }
    }
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