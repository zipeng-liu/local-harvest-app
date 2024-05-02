import type { Customer, Vendor } from "@prisma/client";

export interface IVendorAuthenticationService {
  findUserByEmail(email: String): Promise<Vendor | null>;
  getUserByEmailAndPassword(email: string, password: string): Promise<Vendor | null>;
  getUserById(id: string): Promise<Vendor | null>;
}