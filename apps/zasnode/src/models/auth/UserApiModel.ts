import { z } from "zod";
import { User } from "../../generated/prisma/client";
import { userApiModelSchema } from "./UserApiModel.schema";

export type UserApiModel = z.infer<typeof userApiModelSchema>;

export function CreateApiModelFromUser(user: User, token?: string): UserApiModel {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    token,
    roles: user.roles,
  } as UserApiModel;
}

// static fromUser(user: User, token: string | null = null) {
//     return new UserApiModel({
//       id: user.id,
//       name: user.name,
//       email: user.email,
//       token,
//       roles: user.roles,
//     });
//   }