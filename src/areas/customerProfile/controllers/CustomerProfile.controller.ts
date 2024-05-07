import express from "express";
import IController from "../../../interfaces/controller.interface";
import path from "path";
import ICustomerProfileService from "../services/ICustomerProfile.service";
import { getProfileLink } from "../../../helper/profileLink";

class CustomerProfileController implements IController {
  public path = "/customer";
  public router = express.Router();
  private _service: ICustomerProfileService;

  constructor(customerService: ICustomerProfileService) {
    this.initializeRoutes();
    this._service = customerService;
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/profile`, this.showCustomerProfile);
  }

  // private showCustomerProfile = async (req: express.Request, res: express.Response) => {
  //   try {
  //       res.render("customerProfile")
  //   } catch(error) {
  //       throw new Error("Failed to get customer profile")
  //   }
  // }
  private showCustomerProfile = async (req: express.Request, res: express.Response) => {
    const customerId = req.session.userId?.customerId;
    if (!customerId) {
      res.status(400).send("Customer ID is required in the session");
      return;
    }

    try {
      const customer = await this._service.findCustomerById(customerId);
      if (customer) {
        const profileLink = getProfileLink(req, res);
        if (profileLink) {
          res.render('customerProfile', { customerName: customer.username, profileLink });
        } else {
          res.redirect("landing");
        }
      } else {
        res.status(404).send("Customer not found");
      }
    } catch (error) {
      res.status(500).send("An error occurred while retrieving customer data");
    }
  }
}

export default CustomerProfileController;

