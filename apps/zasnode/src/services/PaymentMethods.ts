import { prisma } from "../config/prisma";
import { PaymentMethodWhereInput } from "@zas/database/native";
import { BaseFilter } from "@zas/models/BaseFilter";
import { PagedResult } from "@zas/models/internal/PagedResult";
import { GlobalService } from "./GlobalContext";
import { PaymentMethodCrudApiModel } from "@zas/models/payments/PaymentMethodCrudApiModel";
import { CreateApiModelFromPaymentMethod } from "../helpers/ModelExtensions";

export class PaymentMethodsService {

  static async createPaymentMethod(data: PaymentMethodCrudApiModel) {

    const userId = GlobalService.getUserId;

    return await prisma.paymentMethod.create({
      data: {
        name: data.name,
        active: data.active,
        color: data.color,
        icon: data.icon,
        createdByUser: {
          connect: {
            id: userId
          }
        },
      },
    });
  }
  
  static async updatePaymentMethod(data: PaymentMethodCrudApiModel, paymentMethodId: number) {
    return await prisma.paymentMethod.update({
      where: {
        id: paymentMethodId,
      },
      data: {
        name: data.name,
        active: data.active,
        color: data.color,
        icon: data.icon,
      },
    });
  }

  static async deletePaymentMethod(paymentMethodId: number) {
    throw new Error("Method not implemented.");
  }

  static async getPaymentMethods(filter: BaseFilter): Promise<PagedResult<PaymentMethodCrudApiModel>> {
    
    const pageNumber = filter?.pageNumber || 1;
    const pageSize = filter?.pageSize || 10;
    const orderBy = filter?.orderBy || "desc";
    const search = filter?.search;

    const whereClause: PaymentMethodWhereInput = {};

    if(search){
      whereClause.name = {
        contains: search,
        mode: 'insensitive'
      }
    }

    const [paymentMethods, totalItems] = await prisma.$transaction([
      prisma.paymentMethod.findMany({
        where: whereClause,
        orderBy: { 
          createdAt: orderBy
        },
        skip: (pageNumber - 1) * pageSize,
        take: pageSize
      }),
      prisma.paymentMethod.count()
    ]);

    return {
      items: paymentMethods.map((paymentMethod) =>
        CreateApiModelFromPaymentMethod(paymentMethod)
      ),
      totalItems,
      pageNumber,
      pageSize
    };
  } 
  
}