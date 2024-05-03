import IVendor from "../../../interfaces/vendor.interface";
import IProduct from "../../../interfaces/product.interface";
import IMarket from "../../../interfaces/market.interface";
import IVendorProfileService from "./IVendorProfile.service";
import type { Vendor, Market, Product } from "@prisma/client";
import DBClient from "../../../PrismaClient";

export class VendorProfileService implements IVendorProfileService {
  private readonly _db: DBClient = DBClient.getInstance();

  async findVendorById(vendorId: number): Promise<Vendor | null> {
    return await this._db.prisma.vendor.findUnique({
      where: { vendorId },
      include: {
        products: true,
      },
    });
  }
}
