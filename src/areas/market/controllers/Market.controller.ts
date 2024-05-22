import express from "express";
import IController from "../../../interfaces/controller.interface";
import ensureAuthenticated from "../../../middleware/authentication.middleware";
import { getProfileLink } from "../../../helper/profileLink";
import IMarketService from "../services/IMarket.services";
import e from "express";

class MarketController implements IController {
  public path = "/market";
  public router = express.Router();
  private _service: IMarketService;

  constructor(marketService: IMarketService) {
    this._service = marketService;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}/show/:id`,
      ensureAuthenticated,
      this.showMarketPage
    );
    this.router.get(
      `${this.path}/list`,
      ensureAuthenticated,
      this.showMarketList
    );
  }

  private showMarketPage = async (
    req: express.Request,
    res: express.Response
  ) => {
    try {
      const marketId = req.params.id;
      const market = await this._service.getMarketById(+marketId);
      const profileLink = getProfileLink(req, res);

      if (profileLink) {
        res.render("market", {
          profileLink,
          market,
          marketId,
        });
      } else {
        res.redirect("landing");
      }
    } catch (error) {
      console.error("Error fetching market page:", error);
      res.status(500).send("Error fetching market data");
    }
  };

  private showMarketList = async (
    req: express.Request,
    res: express.Response
  ) => {
    try {
      const profileLink = getProfileLink(req, res);
      const allMarkets = await this._service.getAllMarkets();
      console.log(allMarkets);

      console.log(allMarkets)

      if (!profileLink) {
        res.redirect("landing");
      } else {
        res.render("marketList", { profileLink, allMarkets });
      }
    } catch (error) {
      console.error("Error fetching market list:", error);
      res.status(500).send("Error fetching market data");
    }
  };
}

export default MarketController;
