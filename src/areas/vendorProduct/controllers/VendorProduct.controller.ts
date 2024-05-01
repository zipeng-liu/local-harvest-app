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
  }

  private vendorAddProduct = (_: express.Request, res: express.Response) => {
    const viewsPath = path.join(__dirname, "..", "views");
    res.app.set("views", viewsPath);
    res.app.use("/styles", express.static(path.join(__dirname, "..", "styles")));
    res.render("addProduct");
  };
}

export default vendorProductController;
