import { BaseFilter } from "../BaseFilter";
import { productFilterBasicSchema } from "./ProductFilterBasic.schema";
import { z } from "zod";

export type ProductFilterBasic = z.infer<typeof productFilterBasicSchema>;