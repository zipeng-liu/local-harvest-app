import express, { Request, Response } from "express";
import IController from "../../../interfaces/controller.interface";
import ensureAuthenticated from "../../../middleware/authentication.middleware";
import { ICartService } from "../services/ICart.service";
import { getProfileLink } from "../../../helper/profileLink";

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
    this.router.post(`${this.path}/increase/:cartId`, ensureAuthenticated, this.handleIncreaseQuantity);
    this.router.post(`${this.path}/decrease/:cartId`, ensureAuthenticated, this.handleDecreaseQuantity);
    this.router.post(`${this.path}/delete/:cartId`, ensureAuthenticated, this.handleRemoveProductFromCart);
  }

  private showCart = async (req: Request, res: Response) => {
    try {
      const customerId = req.session.userId?.customerId;
      if (!customerId) return res.redirect("401");

      const cartItems = await this._service.getCartByUserId(customerId);
      if (!cartItems) throw new Error("Cart not found");

      const profileLink = getProfileLink(req, res);
      if (profileLink) {
        res.render("cart", { cartItems, profileLink });
      } else {
        res.redirect("401");
      }
    } catch (error) {
      console.error("Failed to load cart:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  private getCartCount = async (req: Request, res: Response) => {
    try {
      const customerId = req.session.userId?.customerId;
      if (!customerId) return res.status(401).json({ error: "Unauthorized" });

      const count = await this._service.getCartCount(customerId);
      res.json({ count });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  private handleIncreaseQuantity = async (req: Request, res: Response) => {
    try {
      const cartId = parseInt(req.params.cartId);
      const updatedCart = await this._service.increaseCartItem(cartId);
      res.json({ success: true, newQuantity: updatedCart.quantity });
    } catch (error) {
      res.status(500).json({ success: false, message: "Unable to update cart item!" });
    }
  };
  
  private handleDecreaseQuantity = async (req: Request, res: Response) => {
    try {
      const cartId = parseInt(req.params.cartId);
      const updatedCart = await this._service.decreaseCartItem(cartId);
      res.json({ success: true, newQuantity: updatedCart.quantity });
    } catch (error) {
      res.status(500).json({ success: false, message: "Unable to update cart item!" });
    }
  };

  private handleRemoveProductFromCart = async (req: Request, res: Response) => {
    try {
      const cartId = parseInt(req.params.cartId);
      const removed = await this._service.removeProductFromCart(cartId);
      if (removed) {
        res.json({ success: true, message: "Product removed successfully from the cart" });
      } else {
        res.status(404).json({ success: false, message: "Product not found in the cart" });
      }
    } catch (error) {
      console.error("Error removing product from cart:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
}

export default CartController;
