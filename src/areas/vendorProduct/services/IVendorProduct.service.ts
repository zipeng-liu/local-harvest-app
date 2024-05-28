import type { Vendor, Product, Order } from "@prisma/client";

interface IVendorProductService {
  findVendorById(vendorId: number): Promise<Vendor | null>;

  addProductToVendor(vendorId: number, product: Product): void 

  findAllProductsByVendor(vendorId: number): Promise<Product[]>;

  findAllAvailableProductsByVendor(vendorId: number): Promise<Product[]>;

  getAllVendors(): Promise<Vendor[]>;

  findAllOrdersByVendor(vendorId: number): Promise<Order[]>;
}

export default IVendorProductService;
