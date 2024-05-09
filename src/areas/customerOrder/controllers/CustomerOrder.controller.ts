import express from "express";
import session from "express-session";
import IController from "../../../interfaces/controller.interface";
import ICustomerOrderService from "../services/ICustomerOrder.service";
import ensureAuthenticated from "../../../middleware/authentication.middleware";
import { getProfileLink } from "../../../helper/profileLink";
import { Product, Cart } from "@prisma/client";

declare module "express-session" {
  interface SessionData {
    userId?: {
      vendorId?: number;
      customerId: number;
    };
    messages?: string;
  }
}

class CustomerOrderController implements IController {
  public path = "/customer";
  public router = express.Router();
  private _service: ICustomerOrderService;

  constructor(customerService: ICustomerOrderService) {
    this._service = customerService;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/addToCart`, this.handleAddProductToCart);
  }

  private handleAddProductToCart = async (req: express.Request, res: express.Response) => {
    try {
      const userId = req.session.userId?.customerId;
      if (!userId) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
      }

      const { productId } = req.body;
      if (!productId ) {
        return res.status(400).json({ success: false, message: "Invalid input" });
      }

      const cartItem = await this._service.addProductToCart(userId, productId);
      
      return res.json({ success: true, cartItem });
    } catch (error) {
      console.error("Error handling add to cart:", error);
      return res.status(500).json({ success: false, message: "Failed to add product to cart" });
    }
  };
}

export default CustomerOrderController;