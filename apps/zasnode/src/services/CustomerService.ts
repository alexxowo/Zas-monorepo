import { prisma } from "../config/prisma";
import { CustomerWhereInput } from "@zas/database/native";
import { BaseFilter } from "@zas/models/BaseFilter";
import { CustomerCrudApiModel } from "@zas/models/customers/CrustomerCrudApiModel";
import { PagedResult } from "@zas/models/internal/PagedResult";
import { CreateApiModelFromCustomer } from "../helpers/ModelExtensions";

export class CustomerService {

  static async createCustomer(data: CustomerCrudApiModel) {
    return await prisma.customer.create({
      data: {
        name: data.name,
        surname: data.surname,
        identityValue: data.identityValue,
        address: data.address,
        phone: data.phone,
        email: data.email,
      },
    });
  }
  
  static async updateCustomer(data: CustomerCrudApiModel, customerId: string) {
    return await prisma.customer.update({
      where: {
        id: customerId,
      },
      data: {
        name: data.name,
        surname: data.surname,
        identityValue: data.identityValue,
        address: data.address,
        phone: data.phone,
        email: data.email,
      },
    });
  }

  static async deleteCustomer(customerId: string) {
    throw new Error("Method not implemented.");
  }

  static async getCustomers(filter: BaseFilter): Promise<PagedResult<CustomerCrudApiModel>> {
    
    const pageNumber = filter?.pageNumber || 1;
    const pageSize = filter?.pageSize || 10;
    const orderBy = filter?.orderBy || "desc";
    const search = filter?.search;

    const whereClause: CustomerWhereInput = {};

    if(search){
      whereClause.name = {
        contains: search,
        mode: 'insensitive'
      }
    }

    const [customers, totalItems] = await prisma.$transaction([
      prisma.customer.findMany({
        where: whereClause,
        orderBy: { 
          createdAt: orderBy
        },
        skip: (pageNumber - 1) * pageSize,
        take: pageSize
      }),
      prisma.customer.count()
    ]);

    return {
      items: customers.map((customer) =>
        CreateApiModelFromCustomer(customer)
      ),
      totalItems,
      pageNumber,
      pageSize
    };
  } 
  
}