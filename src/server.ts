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
import CartController from "./areas/cart/controllers/Cart.controller";
import { CartService } from "./areas/cart/services/Cart.service";
import ProductController from "./areas/products/controllers/Product.controller";
import { ProductService } from "./areas/products/services/Product.service";
import CustomerProfileController from "./areas/customerProfile/controllers/CustomerProfile.controller";
import { CustomerProfileService } from "./areas/customerProfile/services/CustomerProfile.service";
import CustomerOrderController from "./areas/customerOrder/controllers/CustomerOrder.controller";
import { CustomerOrderService } from "./areas/customerOrder/services/CustomerOrder.service";
import MarketController from "./areas/market/controllers/Market.controller";
import { HomeService } from "./areas/home/services/Home.services";


const server = new App([
  new LandingController(),
  new VendorAuthenticationController(new VendorAuthenticationService()),
  new CustomerAuthenticationController(new CustomerAuthenticationService()),
  new VendorProductController(new VendorProductService()),
  new HomeController(new HomeService()),
  new VendorProfileController(new VendorProfileService()),
  new SearchController(new SearchService()),
  new CartController(new CartService()),
  new ProductController(new ProductService()),
  new CustomerProfileController(new CustomerProfileService()),
  new CustomerOrderController(new CustomerOrderService()),
  new MarketController(),
]);

server.start();
