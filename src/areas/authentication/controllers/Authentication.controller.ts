import express from "express";
import IController from "../../../interfaces/controller.interface";
import { IVendorAuthenticationService } from "../services/IAuthentication.service";
import type { Customer, Vendor } from "@prisma/client";


declare module "express-session" {
  interface SessionData {
    userId: number;
    messages: string[] | null;
  }
}

class VendorAuthenticationController implements IController {
  public path = "/auth/vendor";
  public router = express.Router();
  private _service: IVendorAuthenticationService;

  constructor(service: IVendorAuthenticationService) {
    this.initializeRoutes();
    this._service = service;
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/login`, this.showVendorLoginPage);
    this.router.post(`${this.path}/login`, this.vendorLogin);
    //this.router.get(`${this.path}/logout`, this.logout);
    //this.router.get(`${this.path}/register`, this.showRegistrationPage);
    //this.router.post(`${this.path}/register`, this.registration);
  }

  private showVendorLoginPage = (req: express.Request, res: express.Response) => {
    const errorMessage = req.session.messages || null;
    req.session.messages = null;
    let now = new Date();
    let currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    res.render("login", { errorMessage, currentTime: currentTime });
  };

  private vendorLogin = async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body;
    const vendor = await this._service.findUserByEmail(email);
    if (vendor) {
      const passwordMatch = await bcrypt.compare(password, vendor.password);
      if (passwordMatch) {
        req.session.userId = vendor.vendorId;
        return res.redirect('/home');
      }
    }
    req.session.messages = ['Invalid credentials'];
    res.redirect('/auth/login');
  };
}

export default VendorAuthenticationController;