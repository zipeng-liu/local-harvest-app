import express from "express";
//import { forwardAuthenticated } from "../../../middleware/authentication.middleware";
import IController from "../../../interfaces/controller.interface";
import path from "path";

class vendorProductController implements IController {
  public path = "/vendor";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
    // 將靜態文件夾設置為 vendorProduct 目錄下的 styles 文件夾
    // this.router.use(
    //   `${path}/styles`,
    //   express.static(path.join(__dirname, "..", "styles"))
    // );
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/addItem`, this.vendorAddProduct);
  }

  private vendorAddProduct = (_: express.Request, res: express.Response) => {
    res.render("addProduct");
  };
}

export default vendorProductController;
