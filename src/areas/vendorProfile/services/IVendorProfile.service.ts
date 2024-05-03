import IVendor from "../../../interfaces/vendor.interface";
import IProduct from "../../../interfaces/product.interface";
import IMarket from "../../../interfaces/market.interface";
import type { Vendor, Market, Product } from "@prisma/client";

interface IVendorProfileService {
  findVendorById(vendorId: number): Promise<Vendor | null>
}

export default IVendorProfileService;
