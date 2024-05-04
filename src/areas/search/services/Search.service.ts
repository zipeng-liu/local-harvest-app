import DBClient from "../../../PrismaClient";
import type { Market, Vendor, Product } from "@prisma/client";
import ISearchService from "./ISearchService";

export class SearchService implements ISearchService {
    readonly _db: DBClient = DBClient.getInstance();

    async searchMarket(keyword: string): Promise<Market[]> {
        try {
            const markets = await this._db.prisma.market.findMany({
                where: {
                    OR: [
                        { 
                            // can change to marketName if databases is added name column
                            location: {
                                contains: keyword,
                            },
                        },
                    ],
                },
            });
            console.log("markets in service", markets)

            return markets;
        } catch (error) {
            console.log("Error searching for markets", error);
            throw new Error ("Search Markets failed")
        }
    };

    async searchVendor(keyword: string): Promise<Vendor[]> {
        try {
            const vendors = await this._db.prisma.vendor.findMany({
                where: {
                    OR: [
                        { 
                            name: {
                                contains: keyword,
                            },
                        },
                    ],
                },
            });
            console.log("vendors in service", vendors)

            return vendors;
        } catch (error) {
            console.log("Error searching for vendors", error);
            throw new Error ("Search Vendors failed")
        }
    };

    async searchProduct(keyword: string): Promise<Product[]> {
        try {
            const products = await this._db.prisma.product.findMany({
                where: {
                    OR: [
                        { 
                            name: {
                                contains: keyword,
                            },
                        },
                    ],
                },
            });
            console.log("products in service", products)
            return products;
        } catch (error) {
            console.log("Error searching for products", error);
            throw new Error ("Search Products failed")
        }
    };
        
}