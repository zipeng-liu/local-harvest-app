import IVendor from "../../../interfaces/vendor.interface";
import IProduct from "../../../interfaces/product.interface";
import IMarket from "../../../interfaces/market.interface";
import IVendorProductService from "./IVendorProductService";
import type { Vendor, Market, Product } from "@prisma/client";
import DBClient from "../../../PrismaClient";


export class VendorProductService implements IVendorProductService {
  private readonly _db: DBClient = DBClient.getInstance();

  async findVendorById(vendorId: number): Promise<Vendor | null> {
    return await this._db.prisma.vendor.findUnique({
      where: { vendorId },
      include: {
        products: true,
      }
    });
  }

  async addProductToVendor(vendorId: number, productData: Omit<Product, 'productId'>): Promise<Product> {
    return await this._db.prisma.product.create({
      data: {
        ...productData,
        vendorId: vendorId,
      }
    });
  }
}