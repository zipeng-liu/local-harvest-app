import express from "express";
//import { forwardAuthenticated } from "../../../middleware/authentication.middleware";
import IController from "../../../interfaces/controller.interface";
import path from "path";

class vendorProductController implements IController {
  public path = "/vendor";
  public router = express.Router();

  constructor() {
    // const viewsPath = path.join(__dirname, "..", "views");
    // const staticPath = path.join(__dirname, "../../..", "public")

    // this.router.use((req, res, next) => {
    //   res.app.set("views", viewsPath);
    //   next();
    // });

    // this.router.use(express.static(path.join(__dirname, "../../..", "public")));
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/addItem`, this.vendorAddProduct);
    // Just temporally do GET method for everyone see how it looks
    // it should be redirected after completing addProduct
    // this.router.get(`${this.path}/success`, this.getSuccessPage) 
  }

  private vendorAddProduct = (_: express.Request, res: express.Response) => {
    res.render("addProduct");
  };

  // private getSuccessPage = (_: express.Request, res: express.Response) => {
  //   res.render("success")
  // }
}

export default vendorProductController;
