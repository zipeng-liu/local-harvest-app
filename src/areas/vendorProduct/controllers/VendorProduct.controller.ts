import express from "express";
import IController from "../../../interfaces/controller.interface";
import path from "path";

class vendorProductController implements IController {
  public path = "/vendor";
  public router = express.Router();

  constructor() {

    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/addItem`, this.vendorAddProduct);
    this.router.get(`${this.path}/inventory`, this.showInventoryPage)
  }

  private vendorAddProduct = (_: express.Request, res: express.Response) => {
    res.render("addProduct");
  };

  private showInventoryPage = (_: express.Request, res: express.Response) => {
    res.render("inventory")
  }
}

export default vendorProductController;
