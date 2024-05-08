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
    this.router.get(`${this.path}/api/getCount`, this.getCartCount);
    this.router.post(
      `${this.path}/increase/:cartId`,
      ensureAuthenticated,
      this.handleIncreaseQuantity
    );
    this.router.post(
      `${this.path}/decrease/:cartId`,
      ensureAuthenticated,
      this.handleDecreaseQuantity
    );
    this.router.post(`${this.path}/delete`, ensureAuthenticated, this.removeFromCart);
    this.router.get(`${this.path}/success`, ensureAuthenticated, this.showSuccessPage);

  }

  private showCart = async (req: express.Request, res: express.Response) => {
    try {
      const customerId = req.session.userId?.customerId;
      if (!customerId) {
        return res.redirect("401");
      }
      const cartItems = await this._service.getCartByUserId(customerId);
      console.log("cartItems");
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

  private getCartCount = async (
    req: express.Request,
    res: express.Response
  ) => {
    try {
      const customerId = req.session.userId?.customerId || 1;
      if (!customerId) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      const count = await this._service.getCartItemCount(customerId);
      res.json({ count });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  private handleIncreaseQuantity = async (
    req: express.Request,
    res: express.Response
  ) => {
    try {
      const cartId = parseInt(req.params.cartId);
      const customerId = req.session.userId?.customerId || 0;
      const updatedCart = await this._service.increaseCartItem(
        cartId,
        customerId
      );
      res.json(updatedCart);
    } catch (error) {
      res.status(500).json({ message: "Unable to update cart item!" });
    }
  };

  private handleDecreaseQuantity = async (
    req: express.Request,
    res: express.Response
  ) => {
    try {
      const cartId = parseInt(req.params.cartId);
      const customerId = req.session.userId?.customerId || 0;
      const updatedCart = await this._service.decreaseCartItem(
        cartId,
        customerId
      );
      res.json(updatedCart);
    } catch (error) {
      res.status(500).json({ message: "Unable to update cart item!" });
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
    res.render("success")
  }
}

export default CartController;
