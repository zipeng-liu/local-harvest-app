import IVendor from "../../../interfaces/vendor.interface";
import IProduct from "../../../interfaces/product.interface";
import IMarket from "../../../interfaces/market.interface";
import IVendorProductService from "./IVendorProduct.service";
import type { Vendor, Market, Product, Order } from "@prisma/client";
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

  async addProductToVendor(vendorId: number, product: Product): Promise<void> {
    try {
      const vendor = await this._db.prisma.vendor.findUnique({
        where: {
          vendorId: vendorId,
        }
      })
      if(!vendor) {
        console.log("Vendor is not found")
        throw new Error("Vendor is not found")
      }
      const newProduct = await this._db.prisma.product.create({ data: product })
      console.log("added Product", newProduct)
  
      } catch (error) {
        console.log(error)
      }
    };

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
  };

  async findAllAvailableProductsByVendor(vendorId: number): Promise<Product[]> {
    const vendorWithAvailableProducts = await this._db.prisma.vendor.findUnique({
      where: {
        vendorId: vendorId,
      },
      include: {
        products: {
          where: {
            quantity: {
              gt: 0
            }
          }
        },
      },
    });
    return vendorWithAvailableProducts ? vendorWithAvailableProducts.products : [];
  }

  async getAllVendors(): Promise<Vendor[]> {
    try {
      const allVendors = await this._db.prisma.vendor.findMany({
        include: { market: true }
      });
      return allVendors;
    } catch(error) {
      throw new Error ("Failed to get all vendors")
    }
  };

  async findAllOrdersByVendor(vendorId: number): Promise<Order[]> {
    try {
      const ordersByVendor = await this._db.prisma.order.findMany({
        where: { 
          productOrders: {
            some: {
              product: {
                vendorId: vendorId
              }
            }
          }
        }, 
        include: {
          productOrders: {
            include: {
              product: true
            },
            where: {
              product: {
                vendorId: vendorId
              }
            }
          }
        }
      });

      return ordersByVendor;
    } catch(error) {
      throw new Error ("Failed to get all orders by vendor")
    }
  };
}
