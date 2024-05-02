import DBClient from "../../../PrismaClient";
import { IAuthenticationService } from "./IAuthentication.service";
import ICustomer from "../../../interfaces/customer.interface";
import IVendor from "../../../interfaces/vendor.interface";
import type { Customer, Vendor } from "@prisma/client";
//import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export class VenderAuthenticationService implements IAuthenticationService {
  readonly _db: DBClient = DBClient.getInstance();

  // async findUserByEmail(email: string): Promise<User | IUser | null> {
  //   // 🚀 Talk to your real database here (I did this one for you)
  //   return await this._db.prisma.user.findUnique({
  //     where: {
  //       email: email,
  //     },
  //   });  
  // }
  
  // async getUserByEmailAndPassword(email: string, password: string): Promise<User | IUser | null> {
  //   // 🚀 Talk to your real database here
  //   const user = await this._db.prisma.user.findUnique({
  //     where: {
  //       email: email,
  //     },
  //   });
  //   if (user && (await bcrypt.compare(password, user.password))) {
  //     return user;
  //   }
  //   return null;
  // }

  // async createUser(user: UserDTO): Promise<User | IUser> {
  //   // 🚀 Talk to your real database here
  //   const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
  //   const createdUser = await this._db.prisma.user.create({
  //     data: {
  //       username: user.username,
  //       email: user.email,
  //       password: hashedPassword,
  //       firstName: user.firstName,
  //       lastName: user.lastName,
  //       profilePicture: user.profilePicture, 
  //     },
  //   });
  //   return createdUser;
  // }

  // async getUserById(id: string): Promise<User | IUser | null> {
  //   const user = await this._db.prisma.user.findUnique({
  //     where: {
  //       id: id,
  //     },
  //   });
  //   return user || null;
  // }
}