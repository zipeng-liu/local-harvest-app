import { Product } from "@prisma/client";

export default interface IProductService {
    findById(productId: number): Promise<Product | undefined>;
}