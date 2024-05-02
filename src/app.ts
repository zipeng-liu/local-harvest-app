import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import path from "node:path";
import fs from "fs";
import Controller from "./interfaces/controller.interface";

class App {
  private _app: express.Application;
  private readonly _port: number = Number(process.env.PORT) || 8000;
  private readonly _staticPath: string = process.env.STATIC_PATH || "public";

  constructor(controllers: Controller[]) {
    dotenv.config();
    this._app = express();
    this.configureApp();
    this.initializeControllers(controllers);
  }

  private configureApp() {
    this._app.set("view engine", "ejs");
    this.setViewsFromAreas();
    this.initializeStaticFiles();
    this.initializeSession();
    this.initializeUrlendcoded();
  }

  private setViewsFromAreas() {
    const areasPath = path.join(__dirname, "areas");
    const viewPaths = fs
      .readdirSync(areasPath)
      .map((area) => path.join(areasPath, area, "views"))
      .filter(
        (viewsPath) =>
          fs.existsSync(viewsPath) && fs.statSync(viewsPath).isDirectory()
      );

    this._app.set("views", viewPaths);
  }

  private initializeStaticFiles() {
    this._app.use(express.static(this._staticPath));
  }

  private initializeUrlendcoded() {
    this._app.use(express.urlencoded({ extended: true }))
  }

  private initializeSession() {
    this._app.use(session({
      secret: process.env.SESSION_SECRET || 'default_secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === 'production', 
        maxAge: 1000 * 60 * 60 * 24 
      }
    }));
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => this._app.use(controller.router));
  }

  public start() {
    this._app.listen(this._port, () => {
      console.log(`App running at: http://localhost:${this._port}/ 🚀`);
    });
  }
}

export default App;
