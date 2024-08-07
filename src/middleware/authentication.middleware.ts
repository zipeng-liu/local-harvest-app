import { Request, Response, NextFunction } from "express";

function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.session && req.session.userId) {
    // Type assertion for session data
    const sessionData = req.session as {
      userId: { vendorId?: number; customerId?: number };
      userType?: string;
    };

    // Set userType based on session data
    if (sessionData.userId.vendorId) {
      sessionData.userType = 'vendor';
    } else if (sessionData.userId.customerId) {
      sessionData.userType = 'customer';
    } 
    return next();
  }

  res.redirect("/");
}

export default ensureAuthenticated;
