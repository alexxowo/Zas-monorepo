import { prisma } from "../config/prisma";
import { CategoryWhereInput } from "@prisma/client/models";
import { BaseFilter } from "@zas/models/BaseFilter";
import { PagedResult } from "@zas/models/internal/PagedResult";
import { CategoryCrudApiModel, CreateApiModelFromCategory } from "@zas/models/products/categories/CategoryCreateApiModel";

export class CategoryService {

  static async createCategory(data: CategoryCrudApiModel) {
    return await prisma.category.create({
      data: {
        name: data.name,
        active: data.active,
        color: data.color,
        icon: data.icon,
      },
    });
  }

  static async updateCategory(data: CategoryCrudApiModel, categoryId: string) {
    return await prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        name: data.name,
        active: data.active,
        color: data.color,
        icon: data.icon,
      },
    });
  }

  static async deleteCategory(categoryId: string) {
    return await prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        active: false,
      },
    });
  }

  static async getCategories(filter: BaseFilter): Promise<PagedResult<CategoryCrudApiModel>> {
    
    const pageNumber = filter?.pageNumber || 1;
    const pageSize = filter?.pageSize || 10;
    const orderBy = filter?.orderBy || "desc";
    const search = filter?.search;

    const whereClause: CategoryWhereInput = {};

    if(search){
      whereClause.name = {
        contains: search,
        mode: 'insensitive'
      }
    }
    

    const [categories, totalItems] = await prisma.$transaction([
      prisma.category.findMany({
        where: whereClause,
        orderBy: { 
          createdAt: orderBy
        },
        skip: (pageNumber - 1) * pageSize,
        take: pageSize
      }),
      prisma.category.count()
    ]);

    return {
      items: categories.map((category) => CreateApiModelFromCategory(category)),
      totalItems,
      pageNumber,
      pageSize
    };
  }

}