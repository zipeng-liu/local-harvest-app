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

  private showHomepage = (_: express.Request, res: express.Response) => {
    res.render("home");
  };
}

export default HomeController;
