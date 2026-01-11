import { z } from "zod";
import { userApiModelSchema } from "./UserApiModel.schema";

export type UserApiModel = z.infer<typeof userApiModelSchema>;
