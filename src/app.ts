import express from "express";
//import errorMiddleware from "./middleware/error.middleware";
import Controller from "./interfaces/controller.interface";
import dotenv from "dotenv";
//import livereload from "livereload";
import path from "node:path";
import fs from "fs";

class App {
  private _app: express.Application;
  private readonly _port: number = Number(process.env.PORT) || 8000;
  private readonly _staticPath: string = process.env.STATIC_PATH || "public";

  constructor(controllers: Controller[]) {
    dotenv.config();

    //this.initializeLiveReloadServer();
    this._app = express();
    this._app.set("view engine", "ejs");

    this.setViewsFromAreas();

    this.initializeStaticFiles();
    //this.initializeMiddlewares();
    this.initializeControllers(controllers);
    //this.initializeErrorHandling();
  }

  private setViewsFromAreas() {
    const areasPath = path.join(__dirname, "areas");
    let viewPaths: string[] = [];

    fs.readdirSync(areasPath).forEach((area) => {
      const viewsPath = path.join(areasPath, area, "views");
      if (fs.existsSync(viewsPath) && fs.statSync(viewsPath).isDirectory()) {
        viewPaths.push(viewsPath);
      }
    });

    console.log(viewPaths)
    this._app.set("views", viewPaths);
  }

  public start() {
    this._app.listen(this._port, () => {
      console.log(`App running at: http://localhost:${this._port}/ 🚀`);
    });
  }

  private initializeStaticFiles() {
    this._app.use("/", express.static(this._staticPath));
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this._app.use("/", controller.router);
    });
  }
  // private initializeMiddlewares() {
  //   require("./middleware/express.middlewares")(this._app);
  //   require("./middleware/passport.middlewares")(this._app);
  // }

  // private initializeErrorHandling() {
  //   this._app.use(errorMiddleware);
  // }

  // private initializeLiveReloadServer() {
  //   const liveReloadServer = livereload.createServer();
  //   liveReloadServer.watch(path.join(__dirname));
  //   liveReloadServer.server.once("connection", () => {
  //     setTimeout(() => {
  //       liveReloadServer.refresh("/");
  //     }, 100);
  //   });
  // }
}

export default App;
