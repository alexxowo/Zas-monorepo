import { prisma } from "../config/prisma";
import { CreateProductApiModel } from "@zas/models/products/createProductApiModel";
import { ProductApiModel } from "@zas/models/products/productApiModel";
import { GlobalService } from "./GlobalContext";
import { calculateFinancials } from "../helpers/CalculateFinancials";
import { ProductFilterBasic } from "@zas/models/products/ProductFilterBasic";
import { ProductWhereInput } from "@prisma/client/models";
import { PagedResult } from "@zas/models/internal/PagedResult";
import { ProductApiModelHelper } from "../helpers/ModelExtensions";

export class ProductService {
  static async createProduct(data: CreateProductApiModel) {

    const { salePrice, priceBase, margin, marginPercent } = calculateFinancials(data.salePrice, data.priceBase);
    const userId = GlobalService.getUserId;

    var productCreated = await prisma.product.create({
      data: {
        name: data.name,
        // Pasamos los Decimals directamente (Prisma lo maneja mejor que pasar numbers)
        salePrice: salePrice,
        priceBase: priceBase,
        margin: margin,
        marginPercent: marginPercent,

        active: data.active,
        image: data.image,
        description: data.description,

        // Relación explícita
        categories: {
          create: data.categoryIds?.map((id) => ({
            // Opción A: Si tu tabla intermedia permite asignar el scalar directamente
            categoryId: id,
            // Opción B: Si Prisma te pide conectar la relación (más común)
            // category: { connect: { id: id } },

            assignedAt: new Date(),
            assignedBy: userId,
          })),
        },
      },
    });
    
    return productCreated;
  }

  static async updateProduct(data: CreateProductApiModel, productId: string) {
    const { salePrice, priceBase, margin, marginPercent } = calculateFinancials(data.salePrice, data.priceBase);
    const userId = GlobalService.getUserId;

    console.log(productId);

    return await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        name: data.name,
        salePrice: salePrice,
        priceBase: priceBase,
        margin: margin,
        marginPercent: marginPercent,
        active: data.active,
        image: data.image,
        description: data.description,
        categories: {
          create: data.categoryIds?.map((id) => ({
            categoryId: id,
            assignedAt: new Date(),
            assignedBy: userId,
          })),
        },
      },
    });
  }

  static async deleteProduct(productId: string) {
    return await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        active: false,
      },
    });
  }

  static async getProducts(filter: ProductFilterBasic | null): Promise<PagedResult<ProductApiModel>> {

    const pageNumber = filter?.pageNumber || 1;
    const pageSize = filter?.pageSize || 10;
    const orderBy = filter?.orderBy || "desc";

    const whereClause: ProductWhereInput = {};

    if(filter){
      if(filter.name){
        whereClause.name = {
          contains: filter.name,
          mode: 'insensitive'
        }
      }
      if(filter.active !== undefined){
        console.log(filter.active);
        whereClause.active = {
          equals: filter.active
        };
      }
      if(filter.categoryIds){
        whereClause.categories = {
          some: {
            categoryId: {
              in: filter.categoryIds
            }
          }
        };
      }
    }

    const [products, totalItems] = await prisma.$transaction([
      prisma.product.findMany({
        orderBy: { 
          createdAt: orderBy
        },
        where: whereClause,
        skip: (pageNumber - 1) * pageSize,
        take: pageSize
      }),
      prisma.product.count({
        where: whereClause
      })
    ]);

    return {
      items: products.map((product) =>
        ProductApiModelHelper.fromProduct(product)
      ),
      totalItems,
      pageNumber,
      pageSize
    };
  }
}
