import App from "./app";
import LandingController from "./areas/landing/controllers/Landing.controller";
import vendorProductController from "./areas/vendorProduct/controllers/VendorProduct.controller";
import { VendorProductService } from "./areas/vendorProduct/services/VendorProduct.service";

const server = new App([
  new LandingController(),
  new vendorProductController(new VendorProductService()),
]);

server.start();
