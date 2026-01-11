import { paymentMethodCrudApiModelSchema } from "./PaymentMethodCrudApiModel.schema";
import { z } from "zod";

export type PaymentMethodCrudApiModel = z.infer<typeof paymentMethodCrudApiModelSchema>;

