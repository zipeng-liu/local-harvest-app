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
      }
    });
  }

  // async addProductToVendor(vendorId: number, productData: Omit<Product, 'productId'>): Promise<Product> {
  //   return await this._db.prisma.product.create({
  //     data: {
  //       ...productData,
  //       vendorId: vendorId,
  //     }
  //   });
  // }
  async addProductToVendor(vendorId: number, product: Product): Promise<void> {
    try {
      const vendor = await this._db.prisma.vendor.findUnique({
        where: {
          vendorId: vendorId,
        }
      })
      if(!vendor) {
        console.log("Vendor is not valid")
      }
      const newProduct = await this._db.prisma.product.create({ data: product })
      console.log("added Product", newProduct)
  
      } catch (error) {
        console.log(error)
      }
    }

  async findAllProductsByVendor(vendorId: number): Promise<Product[]> {
    const vendorWithProducts = await this._db.prisma.vendor.findUnique({
      where: { 
        vendorId: vendorId 
      },
      include: {
        products: true
      }
    });
    return vendorWithProducts ? vendorWithProducts.products : [];
}

}