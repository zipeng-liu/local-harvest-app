import express from "express";
import IController from "../../../interfaces/controller.interface";
import path from "path";
import IVendorProfileService from "../services/IVendorProfile.service";
import { VendorProfileService } from "../services/VendorProfile.service";
import { getProfileLink } from "../../../helper/profileLink";

class VendorProfileController implements IController {
  public path = "/vendor";
  public router = express.Router();
  private _service: IVendorProfileService;

  constructor(vendorService: IVendorProfileService) {
    this.initializeRoutes();
    this._service = vendorService;
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/profile`, this.showVendorProfile);
  }

  private showVendorProfile = async (req: express.Request, res: express.Response) => {
    const vendorId = req.session.userId?.vendorId;
    if (!vendorId) {
      res.status(400).send("Vendor ID is required in the session");
      return;
    }

    try {
      const vendor = await this._service.findVendorById(vendorId);
      if (vendor) {
        const profileLink = getProfileLink(req, res);
        if (profileLink) {
          res.render('vendorProfile', { vendorName: vendor.name, profileLink });
        } else {
          res.redirect("landing");
        }
      } else {
        res.status(404).send("Vendor not found");
      }
    } catch (error) {
      res.status(500).send("An error occurred while retrieving vendor data");
    }
  }
}

export default VendorProfileController;

