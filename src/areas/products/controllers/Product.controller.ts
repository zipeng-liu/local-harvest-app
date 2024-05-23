import express, { Request, Response } from "express";
import IController from "../../../interfaces/controller.interface";
import path from "path";
import { ProductService } from "../services/Product.service";
import { Vendor, Product } from "@prisma/client";
import IProductService from "../services/IProduct.service";
import { getProfileLink } from "../../../helper/profileLink";
import { shuffle } from "../../../helper/randomFunction";


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
        res.render("productsByVendor", { vendor: vendor, profileLink: profileLink, session:req.session})

      } else {
        res.redirect("landing");
      }
    } catch(error) {
      throw new Error("Failed to get vendor by id")
    }
  };

  private showItemById = async (req: express.Request, res: express.Response) => {
    const productId = req.params.id;
    if (!productId) {
      return res.status(400).send("Product ID is required");
    }
  
    try {
      const product = await this._service.findItemById(parseInt(productId));
      if (!product) {
        return res.status(404).send("Product not found");
      }
  
      const products = await this._service.getAllProductsByVendorId(product.vendorId);

      // get shuffed product list 
      const shuffledProducts = shuffle(products);

      // get 4 products in the shuffled list
      const randomProducts = shuffledProducts.slice(0, 4);

      // console.log(randomProducts);
  
      const profileLink = getProfileLink(req, res);
      if (profileLink) {
        res.render("item", { product, profileLink, randomProducts });
      } else {
        res.redirect("/landing");
      }
    } catch (error) {
      console.error("Failed to retrieve product details", error);
      res.status(500).send("Failed to retrieve product details due to a server error");
    }
  };
  
};

export default ProductController;
