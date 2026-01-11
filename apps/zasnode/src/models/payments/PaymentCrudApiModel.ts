import { Decimal } from "@prisma/client/runtime/library";
import { Payment } from "../../generated/prisma/client";
import { paymentApiModelSchema, paymentCrudApiModelSchema } from "./PaymentCrudApiModel.schema";
import { z } from "zod";

export  type PaymentCrudApiModel = z.infer<typeof paymentCrudApiModelSchema>;
export type PaymentApiModel = z.infer<typeof paymentApiModelSchema>;

export function CreateApiModelFromPayment(payment: Payment): PaymentApiModel {
  return {
    id: payment.id,
    amount: payment.amount,
    reference: payment.reference,
    paymentMethodId: payment.paymentMethodId,
    orderId: payment.orderId
  } as PaymentApiModel;
  
} 

export function CreatePaymentModelFromApi(payment: PaymentApiModel): Payment {
  return {
    id: payment.id,
    amount: payment.amount,
    reference: payment.reference,
    paymentMethodId: payment.paymentMethodId,
  } as Payment;
} 