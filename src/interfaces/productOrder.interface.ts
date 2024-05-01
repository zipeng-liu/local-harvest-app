import IOrder from "./order.interface";
import IProduct from "./product.interface";

interface IProductOrder {
  productOrderId: number;
  orderId: number;
  productId: number;
  order: IOrder;
  product: IProduct;
}

export default IProductOrder;