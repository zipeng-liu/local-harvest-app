import express, { Request, Response } from "express";
import IController from "../../../interfaces/controller.interface";
// import IProductService from "../services/IVendorProduct.service";
import path from "path";
// import { ProductService } from "../services/Product.service";
import { Product } from "@prisma/client";
import IProductService from "../services/IProduct.service";


class ProductController implements IController {
  public path = "/products";
  public router = express.Router();
  private _service: IProductService;

  constructor(productService: IProductService) {
    this.initializeRoutes();
    this._service = productService;
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.showAllProducts);
    this.router.get(`${this.path}/:id`, this.showItemById);
  }

  private showAllProducts = (_: express.Request, res: express.Response) => {
    res.render("products");
  };

  private showItemById = async (req: express.Request, res: express.Response) => {
    try {
        const productId = req.params.id;
        console.log("productId", productId, typeof productId)
        const product = await this._service.findById(parseInt(productId))
        res.render("item", { product: product });
    } catch (error) {
        throw new Error("Failed to get product by id")
    }
    
  };

};

export default ProductController;
