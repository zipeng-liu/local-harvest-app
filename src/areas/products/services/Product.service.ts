import DBClient from "../../../PrismaClient";
import type { Vendor, Product } from "@prisma/client";
import IProductService from "./IProduct.service";


export class ProductService implements IProductService {
    readonly _db: DBClient = DBClient.getInstance();

    async findItemById(productId: number): Promise<Product | undefined > {
        try {
            const product = await this._db.prisma.product.findUnique({
                where: {
                    productId: productId
                }, 
                include: {
                    vendor: true
                }
            });
            if(!product) {
                return undefined
            } 
            return product;
        } catch (error) {
            throw new Error("Failed to get product by id")
        }
    }

   async findVendorById(vendorId: number): Promise<Vendor | undefined> {
        try {
            const vendor = await this._db.prisma.vendor.findUnique({
                where: {
                    vendorId: vendorId
                },
                include: {
                    products: true
                }
            });
            if(!vendor) {
                return undefined
            }
            return vendor as Vendor;
        } catch(error) {
            throw new Error("Failed to get vendor by id")
        }
    }
}