import express from "express";
import IController from "../../../interfaces/controller.interface";
import path from "path";
import ensureAuthenticated from "../../../middleware/authentication.middleware";
import { getProfileLink } from "../../../helper/profileLink";
import { shuffle } from "../../../helper/randomFunction";
import IMarketService from "../services/IMarket.services";

class MarketController implements IController {
  public path = "/market";
  public router = express.Router();
  private _service: IMarketService;

  constructor(marketService: IMarketService) {
    this.initializeRoutes();
    this._service = marketService;
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}/:id`,
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
    let marketId = req.params.id;
    const market = await this._service.getMarketById(+marketId);
    const vendor = await this._service.getAllVendors();

    const profileLink = getProfileLink(req, res);
    const allMarkets = await this._service.getAllMarkets();
    const shuffledMarkets = shuffle(allMarkets);
    const randomMarkets = shuffledMarkets.slice(0, 2);
    const featuredMarket = shuffledMarkets[0];

    const allVendors = await this._service.getAllVendors();
    const shuffledVendors = shuffle(allVendors);
    const randomVendors = shuffledVendors.slice(0, 2);

    if (profileLink) {
      res.render("market", {
        profileLink,
        allMarkets,
        shuffledMarkets,
        featuredMarket,
        market,
        marketId,
        randomVendors,
        vendor,
        randomMarkets,
      });
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
