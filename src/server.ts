import App from "./app";
import LandingController from "./areas/landing/controllers/Landing.controller";
import VendorAuthenticationController from "./areas/authentication/controllers/Authentication.controller";
import { VenderAuthenticationService } from "./areas/authentication/services/Authentication.service";
import VendorProductController from "./areas/vendorProduct/controllers/VendorProduct.controller";


const server = new App([
  new LandingController(),
  new VendorAuthenticationController(new VenderAuthenticationService()),
  new VendorProductController(),
]);

server.start();
