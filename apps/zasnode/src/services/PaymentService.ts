import { prisma } from "../config/prisma";
import { BaseFilter } from "@zas/models/BaseFilter";
import { PagedResult } from "@zas/models/internal/PagedResult";
import { CreateApiModelFromPayment, CreateApiModelFromPaymentMethod } from "../helpers/ModelExtensions";
import { PaymentApiModel } from "@zas/models/payments/PaymentCrudApiModel";

export class PaymentService {

  static async createPayment(data: PaymentApiModel) {
    return await prisma.payment.create({
      data: {
        amount: data.amount,
        reference: data.reference,
        paymentMethodId: data.paymentMethodId,
      },
    });
  }
  
  static async updatePayment(data: PaymentApiModel, paymentId: string) {
    return await prisma.payment.update({
      where: {
        id: paymentId,
      },
      data: {
        amount: data.amount,
        reference: data.reference,
        paymentMethodId: data.paymentMethodId,
      },
    });
  }

  static async deletePayment(paymentId: string) {
    throw new Error("Method not implemented.");
  }

  static async getPayments(filter: BaseFilter): Promise<PagedResult<PaymentApiModel>> {
    
    const pageNumber = filter?.pageNumber || 1;
    const pageSize = filter?.pageSize || 10;
    const orderBy = filter?.orderBy || "desc";

    const [payments, totalItems] = await prisma.$transaction([
      prisma.payment.findMany({
        orderBy: { 
          createdAt: orderBy
        },
        skip: (pageNumber - 1) * pageSize,
        take: pageSize
      }),
      prisma.payment.count()
    ]);

    return {
      items: payments.map((payment) =>
        CreateApiModelFromPayment(payment)
      ),
      totalItems,
      pageNumber,
      pageSize
    };
  } 

}