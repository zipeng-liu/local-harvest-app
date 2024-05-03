import express from "express";
import IController from "../../../interfaces/controller.interface";
import path from "path";
import ensureAuthenticated from "../../../middleware/authentication.middleware";

class HomeController implements IController {
  public path = "/home";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, ensureAuthenticated, this.showHomepage);
  }

  private showHomepage = (req: express.Request, res: express.Response) => {
    // const vendorId = req.session?.userId?.vendorId;
    // const customerId = req.session?.userId?.customerId;
    // let profileLink;

    // if (vendorId) {
    //   profileLink = "/vendor/profile";
    //   res.render("home", { profileLink });
    // } else if (customerId) {
    //   profileLink = "/customer/profile";
    //   res.render("home", { profileLink });
    // }

    const profileLink = req.session?.userId?.vendorId
      ? "/vendor/profile"
      : req.session?.userId?.customerId
      ? "/customer/profile"
      : undefined;

    if (profileLink) {
      res.render("home", { profileLink });
    }
  };
}

export default HomeController;
