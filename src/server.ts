import App from "./app";
import LandingController from "./areas/landing/controllers/Landing.controller";
import VendorAuthenticationController from "./areas/authentication/controllers/Authentication.controller";
import { VendorAuthenticationService } from "./areas/authentication/services/Authentication.service";
import VendorProductController from "./areas/vendorProduct/controllers/VendorProduct.controller";
import { VendorProductService } from "./areas/vendorProduct/services/VendorProduct.service";
import HomeController from "./areas/home/controllers/Home.controller";
import VendorProfileController from "./areas/vendorProfile/controllers/VendorProfile.controller";


const server = new App([
  new LandingController(),
  new VendorAuthenticationController(new VendorAuthenticationService()),
  new VendorProductController(new VendorProductService()),
  new HomeController(),
  new VendorProfileController(),
  
]);

server.start();
