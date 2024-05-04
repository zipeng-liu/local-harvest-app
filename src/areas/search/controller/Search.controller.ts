import express from "express";
import IController from "../../../interfaces/controller.interface";
import ISearchService from "../services/ISearchService";
import path from "path";

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
    this.router.post(`${this.path}`, this.showSearchResult);
  }

  private showSearchPage = async (_: express.Request, res: express.Response) => {
    try {
        // check user log in here
        res.render("search"); 
    } catch(error) {
        throw new Error("Failed to load search page")
    }
   
  };

  private showSearchResult = async (req: express.Request, res: express.Response)=> {
    try {
        // check user log in here
        let keyword = req.body.keyword;
        console.log("keyword", keyword)
        const marketResults = await this._service.searchMarket(keyword) || [];

        console.log("market", marketResults)
        const vendorResults = await this._service.searchVendor(keyword) || [];
        const productResults = await this._service.searchProduct(keyword) || [];

        if(marketResults && vendorResults && productResults) {
            res.render("searchResults", { markets: marketResults, vendors: vendorResults, products: productResults})
        } else {
            res.redirect("/home");
        }
    } catch(error) {
        throw new Error("Failed to search")
    }

  };
}

export default SearchController;
