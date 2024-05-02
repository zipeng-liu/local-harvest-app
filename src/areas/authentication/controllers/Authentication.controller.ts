import express from "express";
import IController from "../../../interfaces/controller.interface";
import { IAuthenticationService } from "../services/IAuthentication.service";


class VenderAuthenticationController implements IController {
  public path = "/auth/vendor";
  public router = express.Router();
  private _service: IAuthenticationService;

  constructor(service: IAuthenticationService) {
    this.initializeRoutes();
    this._service = service;
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/login`, this.showVendorLoginPage);
    //this.router.post(`${this.path}/login`, this.login);
    //this.router.get(`${this.path}/logout`, this.logout);
    //this.router.get(`${this.path}/register`, this.showRegistrationPage);
    //this.router.post(`${this.path}/register`, this.registration);
  }

  private showVendorLoginPage = (req: express.Request, res: express.Response) => {
    //const errorMessage = req.session.messages || null;
    //req.session.messages = null;
    res.render("login");
  };

  
}

export default VenderAuthenticationController;