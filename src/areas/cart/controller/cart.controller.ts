import express, { Request, Response } from "express";
import IController from "../../../interfaces/controller.interface";
import ensureAuthenticated from "../../../middleware/authentication.middleware";
import ICartService from "../services/ICart.service";

declare module "express-session" {
  interface SessionData {
    user?: {
      customerId: number;
    };
  }
}
class CartController implements IController {
  public path = "/cart";
  public router = express.Router();
  private cartService: ICartService;

  constructor(cartService: ICartService) {
    this.cartService = cartService;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, ensureAuthenticated, this.showCart);
    this.router.post(
      `${this.path}/add/:productId`,
      ensureAuthenticated,
      this.addToCart
    );
    this.router.delete(
      `${this.path}/remove/:productId`,
      ensureAuthenticated,
      this.removeFromCart
    );
    this.router.put(
      `${this.path}/update/:productId`,
      ensureAuthenticated,
      this.updateCart
    );
    this.router.delete(
      `${this.path}/clear`,
      ensureAuthenticated,
      this.clearCart
    );
  }

  private showCart = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.session.user!.customerId;
      const cart = await this.cartService.getCartByUserId(userId);
      res.render("cart", { items: cart });
    } catch (error) {
      res.status(500).send("Failed to display the cart");
    }
  };

  private addToCart = async (req: Request, res: Response): Promise<void> => {
    const productId = parseInt(req.params.productId);
    const userId = req.session.user!.customerId;
    const quantity = parseInt(req.body.quantity || 1);

    try {
      await this.cartService.addProductToCart(userId, productId, quantity);
      res.redirect(`${this.path}`);
    } catch (error) {
      res.status(500).send("Failed to add product to the cart");
    }
  };

  private removeFromCart = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const productId = parseInt(req.params.productId);
    const userId = req.session.user!.customerId;

    try {
      await this.cartService.removeProductFromCart(userId, productId);
      res.redirect(`${this.path}`);
    } catch (error) {
      res.status(500).send("Failed to remove product from the cart");
    }
  };

  private updateCart = async (req: Request, res: Response): Promise<void> => {
    const productId = parseInt(req.params.productId);
    const userId = req.session.user!.customerId;
    const quantity = parseInt(req.body.quantity);

    try {
      await this.cartService.updateProductQuantity(userId, productId, quantity);
      res.redirect(`${this.path}`);
    } catch (error) {
      res.status(500).send("Failed to update the cart");
    }
  };

  private clearCart = async (req: Request, res: Response): Promise<void> => {
    const userId = req.session.user!.customerId;

    try {
      await this.cartService.clearCart(userId);
      res.redirect(`${this.path}`);
    } catch (error) {
      res.status(500).send("Failed to clear the cart");
    }
  };
}

export default CartController;
