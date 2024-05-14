import { Market, Vendor, Product } from "@prisma/client"

export default interface ISearchService {
    searchResults(query: string): Promise<[Market[], Vendor[], Product[]] | undefined>;

    // searchVendor(keyword: string): Promise<Vendor[]> | [];

    // searchProduct(keyword: string): Promise<Product[]> | [];
}