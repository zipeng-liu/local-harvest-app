import type { Vendor, Market, Product } from "@prisma/client";

interface IMarketService {
  getAllMarkets(): Promise<Market[]>;

  getAllVendors(): Promise<Vendor[]>;

  getAllProducts(): Promise<Product[]>;

  getMarketById(marketId: number): Promise<Market | null>;

  getVendorsByMarketId(marketId: number): Promise<Vendor[] | null>;
}

export default IMarketService;
