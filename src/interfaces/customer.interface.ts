import IOrder from "./order.interface";

interface ICustomer {
  customerId: number;
  email: string;
  password: string;
  username: string;
  firstName?: string;
  lastName?: string;
  photo?: string;
  orders: Array<IOrder>;
}

export default ICustomer;