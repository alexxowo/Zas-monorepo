import { Decimal } from "@prisma/client/runtime/library";
import { Product } from "../../generated/prisma/client";
import { productApiModelSchema } from "./productApiModel.schema";
import { z } from "zod";

export type ProductApiModel = z.infer<typeof productApiModelSchema>;
export class ProductApiModelHelper {
  static fromProduct(product: Product): ProductApiModel {
    return ({
      id: product.id,
      name: product.name,
      salePrice: product.salePrice,
      active: product.active,
      image: product.image,
      description: product.description,
      margin: product.margin,
      marginPercent: product.marginPercent,
      priceBase: product.priceBase,
    }) as ProductApiModel;
  }
}