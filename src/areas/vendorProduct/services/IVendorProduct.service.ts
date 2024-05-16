import type { Vendor, Product } from "@prisma/client";

interface IVendorProductService {
  findVendorById(vendorId: number): Promise<Vendor | null>;

  addProductToVendor(vendorId: number, product: Product): void 

  findAllProductsByVendor(vendorId: number): Promise<Product[]>;

  getAllVendors(): Promise<Vendor[]>;
}

export default IVendorProductService;
