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
    this.router.post(
      `${this.path}/order/checkout`,
      ensureAuthenticated,
      this.handleCheckout
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

  private handleCheckout = async (
    req: express.Request,
    res: express.Response
  ) => {
    const userId = req.session.userId?.customerId;
    const profileLink = getProfileLink(req, res);
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { contactFirstname, contactLastname, contactEmail, schedule, total, type } = req.body;

    try {
      //Check if cart is empty
      const cartItems = await this._service.getCart(userId);
      if (cartItems.length === 0) {
        throw new Error("Your cart is empty!");
      }

      // Check if there are any empty feild in contact form
      if (!contactFirstname || !contactLastname || !contactEmail || !schedule) {
        throw new Error("Contact information missing!")
      }

      // Check if all items in the cart are available
      await this._service.checkCartItemsAvailability(userId);

      // Deduct the quantities of each item in the cart from the product table
      await this._service.deductProductQuantities(userId);

      // Create the order
      const order = await this._service.createOrder(
        userId,
        contactFirstname,
        contactLastname,
        contactEmail,
        new Date(schedule),
        parseFloat(total),
        type
      );

      // Create product orders entries
      await this._service.createProductOrders(userId, order.orderId);

      // Delete cart items for the user
      await this._service.deleteCartItemsForUser(userId);

      // Redirect to order success page
      res.redirect("success");
    } catch (error) {
      if (error instanceof Error) {
        req.session.messages = error.message;
      } else {
        req.session.messages = "An unexpected error occurred";
      }
      res.redirect("/cart");
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
}

export default CustomerOrderController;
