import App from "./app";
import LandingController from "./areas/landing/controllers/Landing.controller";
import vendorProductController from "./areas/vendorProduct/controllers/VendorProduct.controller";

const server = new App([
  new LandingController(),
  new vendorProductController(),
]);

server.start();
