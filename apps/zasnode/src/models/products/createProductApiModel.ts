import { createProductApiModelSchema } from "./createProductApiModel.schema";
import { z } from "zod";

export type CreateProductApiModel = z.infer<typeof createProductApiModelSchema>;
