// ProductQueryBuilder.ts
import { ProductWhereInput } from '../generated/prisma/models';

export class ProductQueryBuilder {
  // Iniciamos con un objeto vacío
  private where: ProductWhereInput = {};

  withName(name?: string) {
    if (name) {
      this.where.name = { contains: name, mode: 'insensitive' };
    }
    return this; // Retornamos 'this' para encadenar
  }

  withActive(active?: boolean) {
    if (active !== undefined) {
      this.where.active = active;
    }
    return this;
  }

  withCategories(ids?: string[]) {
    if (ids && ids.length > 0) {
      this.where.categories = {
        some: { categoryId: { in: ids } }
      };
    }
    return this;
  }

  // Método final para obtener el objeto puro de Prisma
  build() {
    return this.where;
  }
}