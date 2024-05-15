import { Vendor, Product } from "@prisma/client";

export default interface IProductService {
    findItemById(productId: number): Promise<Product | undefined>;

    findVendorById(vendorId: number): Promise<Vendor | undefined>;

    getAllProductsByVendorId(vendorId: number): Promise<Product[]>

}