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
    this.router.post(
      `${this.path}/addToCart/:productId`,
      ensureAuthenticated,
      this.handleAddProductToCart
    );
    this.router.get(
      `${this.path}/order/success`,
      ensureAuthenticated,
      this.showOrderSuccessPage
    );
    this.router.get(
      `${this.path}/order/details`,
      ensureAuthenticated,
      this.showOrderDetailPage
    );
    this.router.get(
      `${this.path}/checkout/inperson`,
      ensureAuthenticated,
      this.showInpersonCheckoutPage
    );
    this.router.get(
      `${this.path}/checkout/online`,
      ensureAuthenticated,
      this.showOnlineCheckoutPage
    );
  }

  private handleAddProductToCart = async (
    req: express.Request,
    res: express.Response
  ) => {
    try {
      const userId = req.session.userId?.customerId;
      if (!userId) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized" });
      }

      const productId = parseInt(req.params.productId);
      if (isNaN(productId)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid product ID" });
      }

      const existingCartItem =
        await this._service.getCartItemByUserIdAndProductId(userId, productId);
      console.log(existingCartItem);

      if (existingCartItem) {
        const updatedCartItem = await this._service.addQuantityByOne(
          existingCartItem.cartId
        );
        return res.json({ success: true, cartItem: updatedCartItem });
      } else {
        const newCartItem = await this._service.addProductToCart(
          userId,
          productId,
          1
        );
        return res.json({ success: true, cartItem: newCartItem });
      }
    } catch (error) {
      console.error("Error handling add to cart:", error);
      return res
        .status(500)
        .json({ success: false, message: "Failed to add product to cart" });
    }
  };

  private showOrderSuccessPage = async (
    req: express.Request,
    res: express.Response
  ) => {
    const profileLink = getProfileLink(req, res);
    if (profileLink) {
      res.render("success", { profileLink });
    } else {
      res.redirect("404");
    }
  };

  private showOrderDetailPage = async (
    req: express.Request,
    res: express.Response
  ) => {
    const profileLink = getProfileLink(req, res);
    if (profileLink) {
      res.render("orderDetails", { profileLink });
    } else {
      res.redirect("404");
    }
  };

  private showInpersonCheckoutPage = (req: express.Request, res: express.Response) => {
    const profileLink = getProfileLink(req, res);
    if (profileLink) {
      res.render("inpersonCheckout", { profileLink });
    } else {
      res.render("landing");
    }
  };

  private showOnlineCheckoutPage = (req: express.Request, res: express.Response) => {
    const profileLink = getProfileLink(req, res);
    if (profileLink) {
      res.render("onlineCheckout", { profileLink });
    } else {
      res.render("landing");
    }
  };
}

export default CustomerOrderController;
