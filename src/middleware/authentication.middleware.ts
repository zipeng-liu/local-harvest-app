import { Request, Response, NextFunction } from "express";

function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.session && req.session.userId) {
    return next();
  }
  res
    .status(401)
    .send("Access Denied: You must be logged in to view this page.");
}

export default ensureAuthenticated;
