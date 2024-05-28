import type { Vendor, Market, Product, Customer } from "@prisma/client";

interface IHomeService {
  getAllMarkets(): Promise<Market[]>;

  getAllVendors(): Promise<Vendor[]> 

  getAllAvailableProducts(): Promise<Product[]>;

  findVendorById(vendorId: number): Promise<Vendor | null>;

  findCustomerById(customerId: number): Promise<Customer | null>;
}

export default IHomeService;