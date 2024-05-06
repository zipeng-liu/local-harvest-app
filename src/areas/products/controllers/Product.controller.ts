import express, { Request, Response } from "express";
import IController from "../../../interfaces/controller.interface";
import path from "path";
import { Product } from "@prisma/client";
import IProductService from "../services/IProduct.service";
import { getProfileLink } from "../../../helper/profileLink";


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

  private showAllProducts = (req: express.Request, res: express.Response) => {
    const profileLink = getProfileLink(req, res);
    if (profileLink) {
      res.render("products", { profileLink });
    } else {
      res.redirect("landing");
    }
  };

  private showItemById = async (req: express.Request, res: express.Response) => {
    try {
      const productId = req.params.id;
      console.log("productId", productId, typeof productId)
      const product = await this._service.findById(parseInt(productId))
      const profileLink = getProfileLink(req, res);
      if (profileLink) {
        res.render("item", { product: product, profileLink });
      } else {
        res.redirect("landing");
      }
    } catch (error) {
      throw new Error("Failed to get product by id")
    }
  };
};

export default ProductController;
