import { customerApiModelSchema, customerCrudApiModelSchema } from "./CrustomerCrudApiModel.schema";
import { z } from "zod";

export type CustomerCrudApiModel = z.infer<typeof customerCrudApiModelSchema>;
export type CustomerApiModel = z.infer<typeof customerApiModelSchema>;
