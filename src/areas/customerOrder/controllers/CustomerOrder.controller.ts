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
    this.router.post(`${this.path}/addToCart/:productId`, this.handleAddProductToCart);
  }

  private handleAddProductToCart = async (req: express.Request, res: express.Response) => {
    try {
      const userId = req.session.userId?.customerId;
      if (!userId) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
      }

      const productId = parseInt(req.params.productId);
      if (isNaN(productId)) {
        return res.status(400).json({ success: false, message: "Invalid product ID" });
      }
  
      const existingCartItem = await this._service.getCartItemByUserIdAndProductId(userId, productId);
      console.log(existingCartItem);
  
      if (existingCartItem) {
        const updatedCartItem = await this._service.addQuantityByOne(existingCartItem.cartId);
        return res.json({ success: true, cartItem: updatedCartItem });
      } else {
        const newCartItem = await this._service.addProductToCart(userId, productId, 1);
        return res.json({ success: true, cartItem: newCartItem });
      }
    } catch (error) {
      console.error("Error handling add to cart:", error);
      return res.status(500).json({ success: false, message: "Failed to add product to cart" });
    }
  };
  
}

export default CustomerOrderController;