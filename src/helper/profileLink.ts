import { Request, Response } from "express";

export const getProfileLink = (req: Request, res: Response): string | undefined => {
    if (req.session && req.session.userId) {
      if (req.session.userId.vendorId) {
        return "/vendor/profile";
      } else if (req.session.userId.customerId) {
        return "/customer/profile";
      }
    }
    return undefined; 
};
