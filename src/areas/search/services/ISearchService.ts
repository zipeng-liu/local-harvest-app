import { Market, Vendor, Product } from "@prisma/client"

export default interface ISearchService {
    searchResults(query: string): Promise<[Market[], Vendor[], Product[]] | undefined>;

    getAllMarkets(): Promise<Market[]>;

    getAllVendors(): Promise<Vendor[]> 

    getAllProducts(): Promise<Product[]>;
}