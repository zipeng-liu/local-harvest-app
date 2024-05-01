import express from "express";
//import { forwardAuthenticated } from "../../../middleware/authentication.middleware";
import IController from "../../../interfaces/controller.interface";
import path from "path";

class vendorProductController implements IController {
  public path = "/vendor/addItem";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, this.vendorAddProduct);
  }

  private vendorAddProduct = (_: express.Request, res: express.Response) => {
    const viewsPath = path.join(__dirname, "..", "views");
    console.log(viewsPath);
    res.app.set("views", viewsPath);
    res.render("addProduct");
  };
}

export default vendorProductController;
