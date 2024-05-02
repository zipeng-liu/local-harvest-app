import IVendor from "../../../interfaces/vendor.interface";
import IProduct from "../../../interfaces/product.interface";
import IMarket from "../../../interfaces/market.interface";
import IVendorProductService from "./IVendorProduct.service";
import type { Vendor, Market, Product } from "@prisma/client";
import DBClient from "../../../PrismaClient";

export class VendorProductService implements IVendorProductService {
  private readonly _db: DBClient = DBClient.getInstance();

  async findVendorById(vendorId: number): Promise<Vendor | null> {
    return await this._db.prisma.vendor.findUnique({
      where: { vendorId },
      include: {
        products: true,
      },
    });
  }

  async addProductToVendor(
    vendorId: number,
    productData: Omit<Product, "productId">
  ): Promise<Product> {
    return await this._db.prisma.product.create({
      data: {
        ...productData,
        vendorId: vendorId,
      },
    });
  }

  async findAllProductsByVendor(vendorId: number): Promise<Product[]> {
    const vendorWithProducts = await this._db.prisma.vendor.findUnique({
      where: {
        vendorId: vendorId,
      },
      include: {
        products: true,
      },
    });
    return vendorWithProducts ? vendorWithProducts.products : [];
  }

  async addProduct(
    productName: string,
    price: number,
    quantity: number,
    description: string,
    vendorId: number
  ): Promise<Product> {
    return await this._db.prisma.product.create({
      data: {
        name: productName,
        price: price,
        quantity: quantity,
        description: description,
        photo: "",
        vendorId: vendorId,
      },
    });
  }
}
