import express from "express";
import IController from "../../../interfaces/controller.interface";
import path from "path";

class VendorProfileController implements IController {
  public path = "/vendor";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/profile`, this.showVendorProfile);
  }

  private showVendorProfile = (req: express.Request, res: express.Response) => {
    res.render("vendorProfile", { profileLink: '/vendor/profile' }); 
  }
}

export default VendorProfileController;

