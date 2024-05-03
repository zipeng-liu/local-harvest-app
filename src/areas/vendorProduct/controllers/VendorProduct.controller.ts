import express, { Request, Response } from "express";
import IController from "../../../interfaces/controller.interface";
import IVendorProductService from "../services/IVendorProduct.service";
import path from "path";
import { VendorProductService } from "../services/VendorProduct.service";

class VendorProductController implements IController {
  public path = "/vendor";
  public router = express.Router();
  private _service: IVendorProductService;

  constructor(vendorService: IVendorProductService) {
    this.initializeRoutes();
    this._service = vendorService;
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/addItem`, this.showAddProduct);
    this.router.post(`${this.path}/addItem`, this.addProduct);
    this.router.get(`${this.path}/inventory`, this.showInventoryPage);
  }

  private showAddProduct = (_: express.Request, res: express.Response) => {
    res.render("addProduct");
  };

  private addProduct = async (
    _: express.Request,
    req: express.Request,
    res: express.Response
  ) => {
    try {
      const { productName, price, quantity, description } = req.body;
      const vendorId = 1;

      const product = await this._service.addProduct(
        productName,
        price,
        quantity,
        description,
        vendorId
      );

      if (product) {
        console.log("New Product Added:", product);
        res.redirect(`${this.path}/inventory/${product.vendorId}`);
      } else {
        throw new Error("Product creation failed");
      }
    } catch (error) {
      console.error("Failed to add product", error);
      res.status(500).send("Failed to add product");
    }
  };

  private showInventoryPage = async (
    _: express.Request,
    res: express.Response
  ) => {
    try {
      let vendorId = 1;
      const inventoryList = await this._service.findAllProductsByVendor(
        vendorId
      );
      res.render("inventory", { inventoryList: inventoryList });
    } catch (error) {
      console.error("Failed to get inventory", error);
      res.status(500).send("Failed to get inventory");
    }
  };
}

export default VendorProductController;
