import App from "./app";
import LandingController from "./areas/landing/controllers/Landing.controller";
import {
  VendorAuthenticationController,
  CustomerAuthenticationController,
} from "./areas/authentication/controllers/Authentication.controller";
import {
  VendorAuthenticationService,
  CustomerAuthenticationService,
} from "./areas/authentication/services/Authentication.service";
import VendorProductController from "./areas/vendorProduct/controllers/VendorProduct.controller";
import { VendorProductService } from "./areas/vendorProduct/services/VendorProduct.service";
import HomeController from "./areas/home/controllers/Home.controller";
import VendorProfileController from "./areas/vendorProfile/controllers/VendorProfile.controller";
import { VendorProfileService } from "./areas/vendorProfile/services/VendorProfile.service";
import SearchController from "./areas/search/controller/Search.controller";
import { SearchService } from "./areas/search/services/Search.service";
import cartController from "./areas/cart/controller/cart.controller";
import ProductController from "./areas/products/controllers/Product.controller";
import { ProductService } from "./areas/products/services/Product.service";

const server = new App([
  new LandingController(),
  new VendorAuthenticationController(new VendorAuthenticationService()),
  new CustomerAuthenticationController(new CustomerAuthenticationService()),
  new VendorProductController(new VendorProductService()),
  new HomeController(),
  new VendorProfileController(new VendorProfileService()),
  new SearchController(new SearchService()),
  new cartController(),
  new ProductController(new ProductService()),
]);

server.start();
