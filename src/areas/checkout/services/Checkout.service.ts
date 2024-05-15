import { PrismaClient, Cart, Order } from "@prisma/client";
import ICheckoutService from "./ICheckout.service";
import DBClient from "../../../PrismaClient";

export class CheckoutService implements ICheckoutService {
  readonly _db: DBClient = DBClient.getInstance();

  
}