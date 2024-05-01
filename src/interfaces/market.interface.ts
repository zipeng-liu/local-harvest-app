import IVendor from "./vendor.interface";

interface IMarket {
  marketId: number;
  location: string;
  contact: string;
  description?: string;
  photo?: string;
  vendors: Array<IVendor>;
}

export default IMarket;

