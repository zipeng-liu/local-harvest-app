import express from "express";
import IController from "../../../interfaces/controller.interface";
import path from "path";
import ensureAuthenticated from "../../../middleware/authentication.middleware";
import { getProfileLink } from "../../../helper/profileLink";
import { ICartService } from "../services/ICart.service";

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
  }

  private showCart = async (req: express.Request, res: express.Response) => {
    try {
      const customerId = req.session.userId?.customerId;
      if (!customerId) {
        return res.redirect("401");
      }
      const cartItems = await this._service.getCartByUserId(customerId);
      console.log("cartItems");
      // console.log(cartItems);
      const profileLink = getProfileLink(req, res);
      if (profileLink) {
        res.render("cart", { profileLink, cartItems });
        // res.json("test");
      } else {
        res.redirect("401");
      }
    } catch (error) {
      throw new Error("Failed to load cart page");
    }
  };
}
export default CartController;
