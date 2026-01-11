import { paymentApiModelSchema, paymentCrudApiModelSchema } from "./PaymentCrudApiModel.schema";
import { z } from "zod";

export  type PaymentCrudApiModel = z.infer<typeof paymentCrudApiModelSchema>;
export type PaymentApiModel = z.infer<typeof paymentApiModelSchema>;
