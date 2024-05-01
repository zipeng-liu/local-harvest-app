import IVendor from "./vendor.interface";
import IProductOrder from "./productOrder.interface";

interface IProduct {
  productId: number;
  name: string;
  description?: string;
  quantity: number;
  price: number;
  photo?: string;
  vendorId: number;
  vendor: IVendor;
  productOrders: Array<IProductOrder>;
}

export default IProduct;