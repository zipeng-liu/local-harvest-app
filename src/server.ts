import App from "./app";
import LandingController from "./areas/landing/controllers/Landing.controller";

const server = new App([
  new LandingController()
]);

server.start();