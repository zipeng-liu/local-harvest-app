import express from "express";
import IController from "../../../interfaces/controller.interface";
import IVendorProductService from "../services/IVendorProduct.service";
import path from "path";
import { VendorProductService } from "../services/VendorProduct.service";

class vendorProductController implements IController {
  public path = "/vendor";
  public router = express.Router();
  private _service: IVendorProductService;

  constructor(vendorService: IVendorProductService) {
    this.initializeRoutes();
    this._service = vendorService;
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/addItem`, this.vendorAddProduct);
    this.router.get(`${this.path}/inventory`, this.showInventoryPage)
  }

  private vendorAddProduct = (_: express.Request, res: express.Response) => {
    res.render("addProduct");
  };

  private showInventoryPage = async (_: express.Request, res: express.Response) => {
    try {
      let vendorId = 1;
      const inventoryList = await this._service.findAllProductsByVendor(vendorId);
      res.render("inventory", { inventoryList: inventoryList })
    } catch(error) {
      console.error ("Failed to get inventory", error)
      res.status(500).send("Failed to get inventory")
    }
  }
}

export default vendorProductController;
