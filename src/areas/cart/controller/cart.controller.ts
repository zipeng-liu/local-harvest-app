import express from "express";
import IController from "../../../interfaces/controller.interface";
import path from "path";
import ensureAuthenticated from "../../../middleware/authentication.middleware";

class cartController implements IController {
  public path = "/cart";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, ensureAuthenticated, this.showCart);
  }

  private showCart = async (_: express.Request, res: express.Response) => {
    try {
      res.render("cart");
    } catch (error) {
      throw new Error("Failed to load cart page");
    }
  };
}
export default cartController;
