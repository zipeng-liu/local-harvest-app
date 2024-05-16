import type { Vendor, Market, Product } from "@prisma/client";

interface IHomeService {
  getAllMarkets(): Promise<Market[]>;

  getAllVendors(): Promise<Vendor[]> 

  getAllProducts(): Promise<Product[]>;
}

export default IHomeService;