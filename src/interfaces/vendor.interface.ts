import IMarket from "./market.interface";
import IProduct from "./product.interface";

interface IVendor {
  vendorId: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  description?: string;
  photo?: string;
  marketId: number;
  market: IMarket;
  products: Array<IProduct>;
}

export default IVendor;