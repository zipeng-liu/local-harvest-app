import express, { Request, Response } from "express";
import IController from "../../../interfaces/controller.interface";
import IVendorProductService from "../services/IVendorProduct.service";
import path from "path";
import { VendorProductService } from "../services/VendorProduct.service";
import { randomUUID } from "crypto";
import { Product, Order } from "@prisma/client";
import { getProfileLink } from "../../../helper/profileLink";
import { multiUpload } from "../../../middleware/multer.middleware";
import { cloudinary } from "../../../config/cloudinaryConfig";
import { MulterRequest } from "../../../middleware/multer.middleware";
import ensureAuthenticated from "../../../middleware/authentication.middleware";
import { profile } from "console";


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
    this.router.post(`${this.path}/addItem`, multiUpload, this.addProduct);
    this.router.get(`${this.path}/list`, this.showVendorList);
    this.router.get(`${this.path}/viewOrders`, this.showViewOrders);
    this.router.get(`${this.path}/show/:id`, this.showVendorPage);
   
  }

  private showAddProduct = (req: express.Request, res: express.Response) => {
    const profileLink = getProfileLink(req, res);
    if (profileLink) {
      res.render("addProduct", { profileLink, session:req.session });
    } else {
      res.redirect("landing");
    }
  };

  private addProduct = async (req: MulterRequest, res: Response) => {
    if (!req.session?.userId?.vendorId) {
        return res.status(401).send("VendorId not found");
    }
    
    const vendorId = req.session.userId.vendorId;
    if (req.files && Object.keys(req.files).length > 0) {
        try {
            const uploadResults = await Promise.all(

              /*
               * {
                  "primary": [{...file1 data...}],
                  "secondary": [{...file2 data...}, {...file3 data...}]
                  }
               * 
               *  
               * Object.values:
               * [
                    [{...file1 data...}],
                    [{...file2 data...}, {...file3 data...}]
                  ]
                  
                  Object.values.flat():
                  [{...file1 data...}, {...file2 data...}, {...file3 data...}]
                */ 
                Object.values(req.files).flat().map(file => {

                  // using multer to upload file => req.files is buffer
                  // we need to change buffer to file64 for cloudinary read
                    const file64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
                    return cloudinary.uploader.upload(file64);
                })
            );

            const product = {
                name: req.body.name,
                price: parseFloat(req.body.price),
                quantity: parseInt(req.body.quantity),
                description: req.body.description,
                vendorId: vendorId,
                primaryPhoto: uploadResults[0].url,
                secondaryPhoto1: uploadResults[1]?.url,
                secondaryPhoto2: uploadResults[2]?.url,
                secondaryPhoto3: uploadResults[3]?.url,
            };
            console.log(product)
            //@ts-ignore
            await this._service.addProductToVendor(vendorId, product);
            res.redirect(`${this.path}/inventory`);
        } catch (error) {
            console.error("Failed to process upload or add product", error);
            res.status(500).send("Failed to add product");
        }
    } else {
        res.status(400).send("No file uploaded");
    }
};

private showViewOrders = async (req: express.Request, res: express.Response) => {
  const vendorId = req.session.userId?.vendorId;
  if (!vendorId) {
    res.status(400).send("Vendor ID is required in the session");
    return;
  }
  try {
    const profileLink = getProfileLink(req, res);
    if(!profileLink) {
      res.redirect("landing");
    } else {
      if (!req.session?.userId?.vendorId) {
        return res.status(401).send("VendorId not found");
    }
      const vendorId = req.session.userId.vendorId;
      const ordersByVendor = await this._service.findAllOrdersByVendor(vendorId);
      if(!ordersByVendor || ordersByVendor.length === 0) {
        res.render("viewOrders", { profileLink, groupedOrders: {}, message: "No order found ", session: req.session })
        return;
      }

      // Group order by date
      const groupedOrders: Record<string, Order[]> = {};
      ordersByVendor.forEach(order => {
        const orderDate = new Date(order.date).toDateString();
        if(!groupedOrders[orderDate]) {
          groupedOrders[orderDate] = [order];
        } else {
          groupedOrders[orderDate].push(order);
        }
      })

      res.render("viewOrders", { profileLink, groupedOrders, session: req.session })
    }
  } catch(error) {
    res.status(500).json({ message: "Failed to show all orders by vendor", error })
  }
}

  private showInventoryPage = async (req: express.Request, res: express.Response) => {
    const vendorId = req.session.userId?.vendorId;
    if(vendorId) {
      try {
        const inventoryList = await this._service.findAllProductsByVendor(
          vendorId
        );
        const profileLink = getProfileLink(req, res);
        if (profileLink) {
          res.render("inventory", { inventoryList: inventoryList, profileLink, session:req.session });
        } else {
          res.redirect("landing");
        }
        
      } catch (error) {
        console.error("Failed to get inventory", error);
        res.status(500).json( { message: "Failed to get inventory", error });
      }
    } else {
      res.status(500).json( { message: "VendorId not found" })
    }
  };

  private showVendorList = async (req: express.Request, res: express.Response) => {
    try {
      const profileLink = getProfileLink(req, res);
      if (!profileLink) {
        res.redirect("landing");
      } else {
        const allVendors = await this._service.getAllVendors();
        res.render("vendorList", { profileLink, allVendors, session:req.session });
      }
    } catch(error) {
      res.status(500).json({ message: "Failed to get all vendors", error})
    }
  };

  private showVendorPage = async (req: express.Request, res: express.Response) => {
    try {
      const profileLink = getProfileLink(req, res);
      if(!profileLink) {
        res.redirect("landing");
      } else {
        const vendorId = parseInt(req.params.id);
        const vendorById = await this._service.findVendorById(vendorId);
        const productByVendor = await this._service.findAllProductsByVendor(vendorId);
        const productOnVendorPage = productByVendor.slice(0,4);
        res.render("vendor", { profileLink, vendorById, productOnVendorPage, session:req.session });
      }
    } catch(error) {
      res.status(500).json({ message: "Failed to get vendor by Id for vendor page", error })
    }
  };

  
    
};

export default VendorProductController;
