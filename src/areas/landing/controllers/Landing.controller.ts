import express from "express";
//import { forwardAuthenticated } from "../../../middleware/authentication.middleware";
import IController from "../../../interfaces/controller.interface";
import path from "path";

class LandingController implements IController {
  public path = "/";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, this.showLandingPage);
  }

  private showLandingPage = (_: express.Request, res: express.Response) => {
    const viewsPath = path.join(__dirname, '..', 'views');  
    res.app.set('views', viewsPath);  
    res.render("index");  
  };
}

export default LandingController;