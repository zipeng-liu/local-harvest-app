import DBClient from "../../../PrismaClient";
import type { Product } from "@prisma/client";
import IProductService from "./IProduct.service";


export class ProductService implements IProductService {
    readonly _db: DBClient = DBClient.getInstance();

    async findById(productId: number): Promise<Product | undefined > {
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
}