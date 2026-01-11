import { prisma } from "../config/prisma";
import { PaymentMethodWhereInput, PaymentWhereInput } from "../generated/prisma/models";
import { BaseFilter } from "../models/BaseFilter";
import { CreateApiModelFromPayment, PaymentApiModel } from "../models/payments/PaymentCrudApiModel";
import { PagedResult } from "../models/internal/PagedResult";
import { PaymentMethodCrudApiModel, CreatePaymentMethodModelFromApi, CreateApiModelFromPaymentMethod } from "../models/payments/PaymentMethodCrudApiModel";

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