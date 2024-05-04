import { Market, Vendor, Product } from "@prisma/client"

export default interface ISearchService {
    searchMarket(keyword: string): Promise<Market[]> | [];

    searchVendor(keyword: string): Promise<Vendor[]> | [];

    searchProduct(keyword: string): Promise<Product[]> | [];
}