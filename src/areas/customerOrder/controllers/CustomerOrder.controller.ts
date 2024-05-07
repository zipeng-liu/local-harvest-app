import express from "express";
import session from "express-session";
import IController from "../../../interfaces/controller.interface";
import ICustomerOrderService from "../services/ICustomerOrder.service";
import { getProfileLink } from "../../../helper/profileLink";

declare module "express-session" {
  interface SessionData {
    userId: {
      vendorId: number | null;
      customerId: number | null;
    };
    messages: string | null;
  }
}


class CustomerOrderController implements IController {
  public path = "/customer";
  public router = express.Router();
  private _service: ICustomerOrderService;

  constructor(vendorService: ICustomerOrderService) {
    this._service = vendorService;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/addItem`, this.addItemToCart);
  }

  private addItemToCart = async (req: express.Request, res: express.Response) => {
    
  }
}

export default CustomerOrderController;
