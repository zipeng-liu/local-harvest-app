import express from "express";
import IController from "../../../interfaces/controller.interface";
import path from "path";
import ensureAuthenticated from "../../../middleware/authentication.middleware";
import { getProfileLink } from "../../../helper/profileLink";
import IHomeService from "../services/IHome.services";
import { shuffle } from "../../../helper/randomFunction";

class HomeController implements IController {
  public path = "/home";
  public router = express.Router();
  private _service: IHomeService;


  constructor(homeService: IHomeService) {
    this.initializeRoutes();
    this._service = homeService;
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, ensureAuthenticated, this.showHomepage);
  }

  private showHomepage = async (req: express.Request, res: express.Response) => {
    try {
      const profileLink = getProfileLink(req, res);
      if (!profileLink) {
        res.redirect("/");
      } else {
        const allMarkets = await this._service.getAllMarkets();
        const shuffledMarkets = shuffle(allMarkets);
        const randomMarkets = shuffledMarkets.slice(0,2);
        const featuredMarket = shuffledMarkets[0];

        const allVendors = await this._service.getAllVendors();
        const shuffledVendors = shuffle(allVendors);
        const randomVendors = shuffledVendors.slice(0,2);

        const allAvailableProducts = await this._service.getAllAvailableProducts();
        const shuffledProducts = shuffle(allAvailableProducts);
        const randomProducts = shuffledProducts.slice(0,5);

        // set accountInfo to show on homepage
        let accountInfo: any;
        const session = req.session.userId;
        if(session?.vendorId !== 0 && session?.vendorId !== undefined) {
          const vendorId = session.vendorId;
          const vendorInfo = await this._service.findVendorById(vendorId);
          accountInfo = vendorInfo;
      
        } else if(session?.customerId !== 0 && session?.customerId !== undefined) {
          const customerId = session?.customerId;
          const customerInfo = await this._service.findCustomerById(customerId);
          accountInfo = customerInfo;
        }

        res.render("home", { profileLink, randomMarkets, randomVendors, randomProducts, featuredMarket, accountInfo, session:req.session });
      }
  } catch(error) {
    res.status(500).json({ message: "Failed to get home page", error})
  }
  };
}

export default HomeController;
