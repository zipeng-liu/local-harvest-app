import express from "express";
import IController from "../../../interfaces/controller.interface";
import path from "path";
import ensureAuthenticated from "../../../middleware/authentication.middleware";
import { getProfileLink } from "../../../helper/profileLink";

class MarketController implements IController {
  public path = "/market";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, ensureAuthenticated, this.showHomepage);
    this.router.get(
      `${this.path}/list`,
      ensureAuthenticated,
      this.showMarketList
    );
  }

  private showHomepage = (req: express.Request, res: express.Response) => {
    const profileLink = getProfileLink(req, res);
    if (profileLink) {
      res.render("market", { profileLink });
    } else {
      res.redirect("landing");
    }
  };

  private showMarketList = (req: express.Request, res: express.Response) => {
    const profileLink = getProfileLink(req, res);
    if (profileLink) {
      res.render("marketList", { profileLink });
    } else {
      res.redirect("landing");
    }
  };
}

export default MarketController;
