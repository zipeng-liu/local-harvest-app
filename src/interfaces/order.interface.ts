import ICustomer from "./customer.interface";
import IProductOrder from "./productOrder.interface";

interface IOrder {
  orderId: number;
  date: Date;
  customerId: number;
  customer: ICustomer;
  productOrders: Array<IProductOrder>;
}

export default IOrder;