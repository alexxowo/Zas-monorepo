import { PaymentMethod } from "../../generated/prisma/client";
import { paymentMethodCrudApiModelSchema } from "./PaymentMethodCrudApiModel.schema";
import { z } from "zod";

export type PaymentMethodCrudApiModel = z.infer<typeof paymentMethodCrudApiModelSchema>;

export function CreateApiModelFromPaymentMethod(paymentMethod: PaymentMethod): PaymentMethodCrudApiModel {
  return {
    active: paymentMethod.active,
    color: paymentMethod.color,
    icon: paymentMethod.icon,
    id: paymentMethod.id,
    name: paymentMethod.name
  } as PaymentMethodCrudApiModel;
}

export function CreatePaymentMethodModelFromApi(paymentMethod: PaymentMethodCrudApiModel): PaymentMethod {
  return {
    id: paymentMethod.id,
    name: paymentMethod.name,
    active: paymentMethod.active,
    color: paymentMethod.color,
    icon: paymentMethod.icon,
  } as PaymentMethod;
}