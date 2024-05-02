import IVendor from "../../../interfaces/vendor.interface";
import IProduct from "../../../interfaces/product.interface";
import IMarket from "../../../interfaces/market.interface";
import type { Vendor, Market, Product } from "@prisma/client";

export default interface IVendorProductService {
  findVendorById(vendorId: number): Promise<Vendor | null> 

  addProductToVendor(vendorId: number, productData: Omit<Product, 'productId'>): Promise<Product> 

  findAllProductsByVendor(vendorId: number): Promise<Product[]> 

}