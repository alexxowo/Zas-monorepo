import { Category } from "../../../generated/prisma/client";
import { categoryCrudApiModelSchema } from "./CategoryCreateApiModel.schema";
import { z } from "zod";

export type CategoryCrudApiModel = z.infer<typeof categoryCrudApiModelSchema>;


export function CreateApiModelFromCategory(category: Category): CategoryCrudApiModel {
  return {
    id: category.id,
    name: category.name,
    active: category.active,
    color: category.color,
    icon: category.icon,
  } as CategoryCrudApiModel;
}