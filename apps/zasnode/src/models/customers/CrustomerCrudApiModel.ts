import { Customer } from "../../generated/prisma/client";
import { customerApiModelSchema, customerCrudApiModelSchema } from "./CrustomerCrudApiModel.schema";
import { z } from "zod";

export type CustomerCrudApiModel = z.infer<typeof customerCrudApiModelSchema>;
export type CustomerApiModel = z.infer<typeof customerApiModelSchema>;

export function CreateApiModelFromCustomer(customer: Customer): CustomerCrudApiModel {
  return {
    id: customer.id,
    name: customer.name,
    surname: customer.surname,
    identityValue: customer.identityValue,
    address: customer.address,
    phone: customer.phone,
    email: customer.email,
  } as CustomerCrudApiModel;
}

export function CreateCustomerModelFromApi(customer: CustomerCrudApiModel): Customer {
  return {
    id: customer.id,
    name: customer.name,
    surname: customer.surname,
    identityValue: customer.identityValue,
    address: customer.address,
    phone: customer.phone,
    email: customer.email,
  } as Customer;
}