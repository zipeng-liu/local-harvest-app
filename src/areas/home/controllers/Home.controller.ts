import express from "express";
import IController from "../../../interfaces/controller.interface";
import path from "path";

class HomeController implements IController {
  public path = "/home";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.showHomepage);
  }

  private showHomepage = (req: express.Request, res: express.Response) => {
    const vendorId = req.session?.userId?.vendorId;
    const customerId = req.session?.userId?.customerId;
    let profileLink;

    if (vendorId) {
      profileLink = "/vendor/profile";
    } else if (customerId) {
      profileLink = "/customer/profile";
    } else {
      res
        .status(403)
        .send("Access Denied: You must be logged in to view this page.");
    }
    res.render("home", { profileLink });
  };
}

export default HomeController;
