import express, { Request, Response } from "express";
import IController from "../../../interfaces/controller.interface";
import IVendorProductService from "../services/IVendorProduct.service";
import path from "path";
import { VendorProductService } from "../services/VendorProduct.service";
import { randomUUID } from "crypto";
import { Product } from "@prisma/client";


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
    this.router.get(`${this.path}/inventory`, this.showInventoryPage);
    this.router.post(`${this.path}/addItem`, this.addProduct)
  }

  private showAddProduct = (_: express.Request, res: express.Response) => {
    res.render("addProduct");
  };

  private addProduct = async (req: express.Request, res: express.Response) => {
    // check if(vendor) here
    try {
      const vendorId = 1;

      const product = {
        name: req.body.name,
        price: parseFloat(req.body.price),
        quantity: parseInt(req.body.quantity),
        description: req.body.description,
        vendorId: vendorId
      } 
      console.log("controller", product)
      //@ts-ignore
      const addProduct = await this._service.addProductToVendor(vendorId, product);
      res.redirect(`${this.path}/inventory`);
    } catch (error) {
      console.error("Failed to add product", error);
      res.status(500).send("Failed to add product");
    }
  };

  private showInventoryPage = async (_: express.Request, res: express.Response) => {
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
