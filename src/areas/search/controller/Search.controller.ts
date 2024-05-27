import express from "express";
import IController from "../../../interfaces/controller.interface";
import ISearchService from "../services/ISearchService";
import path from "path";
import { getProfileLink } from "../../../helper/profileLink";
import { shuffle } from "../../../helper/randomFunction";


class SearchController implements IController {
  public path = "/search";
  public router = express.Router();
  private _service: ISearchService;

  constructor(searchService: ISearchService) {
    this.initializeRoutes();
    this._service = searchService;
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.showSearchPage);
    this.router.post(`${this.path}`, this.showSearchResults);
  }


  private showSearchPage = async (req: express.Request, res: express.Response) => {
    try {
      // check user log in here
      const profileLink = getProfileLink(req, res);
      if (profileLink) {

        const allMarkets = await this._service.getAllMarkets();
        const shuffledMarkets = shuffle(allMarkets);
        const randomMarkets = shuffledMarkets.slice(0,2);
     

        const allVendors = await this._service.getAllVendors();
        const shuffledVendors = shuffle(allVendors);
        const randomVendors = shuffledVendors.slice(0,2);

        const allProducts = await this._service.getAllProducts();
        const shuffledProducts = shuffle(allProducts);
        const randomProducts = shuffledProducts.slice(0,2);

        res.render("search", { 
          profileLink, 
          session:req.session, 
          randomMarkets, 
          randomVendors, 
          randomProducts });
      } else {
        res.redirect("landing");
      }     
    } catch(error) {
        throw new Error("Failed to load search page")
    }
   
  };

  private showSearchResults = async (req: express.Request, res: express.Response) => {
    try {
      // check user log in here
      const profileLink = getProfileLink(req, res);
      if (!profileLink) {
        res.status(401).json({ message: "Unauthorized access"})
      }
        const query = req.body.query as string;
        if(typeof query !== 'string') {
          res.status(400).json({ message: "Invalid query parameter" });
          return;
        }
        const results = await this._service.searchResults(query) || [];

      
        res.json({
          profileLink: profileLink,
          results: results,
      
        });
    
    } catch(error) {
        res.status(500).json({ message: "Failed to load search page" })
    }
   
  };
}

export default SearchController;
