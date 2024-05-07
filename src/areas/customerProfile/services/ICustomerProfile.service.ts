import type { Customer } from "@prisma/client";

interface ICustomerProfileService {
  findCustomerById(customerId: number): Promise<Customer | null>
}

export default ICustomerProfileService;
