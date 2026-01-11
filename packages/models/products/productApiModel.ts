import { productApiModelSchema } from "./productApiModel.schema";
import { z } from "zod";

export type ProductApiModel = z.infer<typeof productApiModelSchema>;
