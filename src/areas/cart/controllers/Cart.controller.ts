import express, { Request, Response } from "express";
import IController from "../../../interfaces/controller.interface";
import ensureAuthenticated from "../../../middleware/authentication.middleware";
import { getProfileLink } from "../../../helper/profileLink";
import ICartService from "../services/ICart.service";

declare module "express-session" {
  interface SessionData {
    userId: {
      vendorId: number | null;
      customerId: number | null;
    };
    messages: string | null;
  }
}


class CartController implements IController {
  public path = "/cart";
  public router = express.Router();
  private _service: ICartService;

  constructor(cartService: ICartService) {
    this._service = cartService;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, ensureAuthenticated, this.showCart);
    this.router.post(`${this.path}/increase`, ensureAuthenticated, this.increaseQuantity);
    this.router.post(`${this.path}/decrease`, ensureAuthenticated, this.decreaseQuantity);
    this.router.post(`${this.path}/delete`, ensureAuthenticated, this.removeFromCart);
    this.router.get(`${this.path}/success`, ensureAuthenticated, this.showSuccessPage);
    this.router.get(`${this.path}/viewOrder`, ensureAuthenticated, this.viewOrder);
  }

  private showCart = async (req: express.Request, res: express.Response) => {
    try {
      const customerId = req.session.userId?.customerId;
      if (!customerId) {
        return res.redirect("401"); 
      }
      const cartItems = await this._service.getCartByUserId(customerId);
      console.log(cartItems)
      const profileLink = getProfileLink(req, res);
      if (profileLink) {
        res.render("cart", { profileLink, cartItems });
      } else {
        res.redirect("401");
      }
    } catch (error) {
      throw new Error("Failed to load cart page");
    }
  };

  private increaseQuantity = async (req: Request, res: Response) => {
    const customerId = req.session.userId?.customerId;
    const { productId } = req.body;
    if (!customerId || !productId) {
      return res.status(400).json({ message: "Invalid request" });
    }
    const result = await this._service.increaseProductQuantity(customerId, Number(productId));
    if (result) {
      res.redirect("/cart");
    } else {
      res.status(500).json({ message: "Unable to increase product quantity" });
    }
  };

  private decreaseQuantity = async (req: Request, res: Response) => {
    const customerId = req.session.userId?.customerId;
    const { productId } = req.body;
    if (!customerId || !productId) {
      return res.status(400).json({ message: "Invalid request" });
    }
    const result = await this._service.decreaseProductQuantity(customerId, Number(productId));
    if (result) {
      res.redirect("/cart");
    } else {
      res.status(500).json({ message: "Unable to decrease product quantity" });
    }
  };

  private removeFromCart = async (req: Request, res: Response) => {
    const customerId = req.session.userId?.customerId;
    const { productId } = req.body; 
    if (!customerId || !productId) {
      return res.status(400).json({ message: "Invalid request" });
    }
    const success = await this._service.removeProductFromCart(customerId, Number(productId));
    if (success) {
      res.redirect("/cart");
    } else {
      res.status(500).json({ message: "Unable to remove product from cart" });
    }
  };


  private showSuccessPage = async (req: Request, res: Response) => {
    try {
      const profileLink = getProfileLink(req, res);
      if (profileLink) {
        res.render("success", { profileLink });
      } else {
        res.redirect("401");
      }
    } catch(error) {
      throw new Error("Failed to load successful page for order")
    }
  };

  // add logic to check customer ID here to show order details
  private viewOrder = async(req: Request, res: Response) => {
    try {
      const profileLink = getProfileLink(req, res);
      if (profileLink) {
        res.render("orderDetails", { profileLink });
      } else {
        res.redirect("401");
      }
    } catch(error) {
      throw new Error("Failed to load order details")
    } 
  }
}

export default CartController;
