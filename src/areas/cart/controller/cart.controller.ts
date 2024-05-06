import express from "express";
import IController from "../../../interfaces/controller.interface";
import path from "path";
import ensureAuthenticated from "../../../middleware/authentication.middleware";
import { getProfileLink } from "../../../helper/profileLink";

class cartController implements IController {
  public path = "/cart";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, ensureAuthenticated, this.showCart);
  }

  private showCart = async (req: express.Request, res: express.Response) => {
    try {
      const profileLink = getProfileLink(req, res);
      if (profileLink) {
        res.render("cart", { profileLink });
      } else {
        res.redirect("401");
      }
    } catch (error) {
      throw new Error("Failed to load cart page");
    }
  };
}
export default cartController;
