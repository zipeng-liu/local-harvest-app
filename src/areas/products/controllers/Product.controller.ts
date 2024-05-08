import express, { Request, Response } from "express";
import IController from "../../../interfaces/controller.interface";
import path from "path";
import { ProductService } from "../services/Product.service";
import { Vendor, Product } from "@prisma/client";
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
    this.router.get(`${this.path}/vendor/:id`, this.showAllProductsByVendor);
    this.router.get(`${this.path}/:id`, this.showItemById);
  }

  private showAllProductsByVendor = async (req: express.Request, res: express.Response) => {
    try {
      const vendorId = req.params.id;
      const vendor = await this._service.findVendorById(parseInt(vendorId))
      if(!vendor) {
        return undefined
      }
      const profileLink = getProfileLink(req, res);
      if (profileLink) {
        res.render("productsByVendor", { vendor: vendor, profileLink: profileLink})

      } else {
        res.redirect("landing");
      }
    } catch(error) {
      throw new Error("Failed to get vendor by id")
    }
  };

  private showItemById = async (req: express.Request, res: express.Response) => {
    try {
      const productId = req.params.id;
      const product = await this._service.findItemById(parseInt(productId))
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
