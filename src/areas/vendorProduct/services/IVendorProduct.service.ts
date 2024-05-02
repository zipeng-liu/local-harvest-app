import IVendor from "../../../interfaces/vendor.interface";
import IProduct from "../../../interfaces/product.interface";
import IMarket from "../../../interfaces/market.interface";
import type { Vendor, Market, Product } from "@prisma/client";

interface IVendorProductService {
  findVendorById(vendorId: number): Promise<Vendor | null>;

  addProductToVendor(vendorId: number, product: Product): void 

  findAllProductsByVendor(vendorId: number): Promise<Product[]>;

  addProduct(
    productName: string,
    price: number,
    quantity: number,
    description: string,
    vendorId: number
  ): Promise<Product>;
}

export default IVendorProductService;
