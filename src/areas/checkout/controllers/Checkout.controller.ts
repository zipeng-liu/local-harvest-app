import express from "express";
import IController from "../../../interfaces/controller.interface";
import path from "path";
import ensureAuthenticated from "../../../middleware/authentication.middleware";
import { getProfileLink } from "../../../helper/profileLink";

class CheckoutController implements IController {
  public path = "/checkout";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, ensureAuthenticated, this.showCheckoutPage);
  }

  private showCheckoutPage = (req: express.Request, res: express.Response) => {
    const profileLink = getProfileLink(req, res);
    if (profileLink) {
      res.render("checkout", { profileLink });
    } else {
      res.render("landing");
    }
  };
}

export default CheckoutController;
