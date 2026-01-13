import { UserApiModel } from "@zas/models/auth/UserApiModel";
import { CustomerCrudApiModel } from "@zas/models/customers/CrustomerCrudApiModel";
import { PaymentApiModel } from "@zas/models/payments/PaymentCrudApiModel";
import { PaymentMethodCrudApiModel } from "@zas/models/payments/PaymentMethodCrudApiModel";
import { ProductApiModel } from "@zas/models/products/productApiModel";
import { Customer, Payment, PaymentMethod, Product, User } from "@zas/database";

export function CreateApiModelFromUser(user: User, token?: string): UserApiModel {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    token,
    roles: user.roles,
  } as UserApiModel;
}

export function CreateApiModelFromCustomer(customer: Customer): CustomerCrudApiModel {
  return {
    id: customer.id,
    name: customer.name,
    surname: customer.surname,
    identityValue: customer.identityValue,
    address: customer.address,
    phone: customer.phone,
    email: customer.email,
  } as CustomerCrudApiModel;
}

export function CreateCustomerModelFromApi(customer: CustomerCrudApiModel): Customer {
  return {
    id: customer.id,
    name: customer.name,
    surname: customer.surname,
    identityValue: customer.identityValue,
    address: customer.address,
    phone: customer.phone,
    email: customer.email,
  } as Customer;
}


export function CreateApiModelFromPayment(payment: Payment): PaymentApiModel {
  return {
    id: payment.id,
    amount: payment.amount,
    reference: payment.reference,
    paymentMethodId: payment.paymentMethodId,
    orderId: payment.orderId
  } as PaymentApiModel;
  
} 

export function CreatePaymentModelFromApi(payment: PaymentApiModel): Payment {
  return {
    id: payment.id,
    amount: payment.amount,
    reference: payment.reference,
    paymentMethodId: payment.paymentMethodId,
  } as Payment;
} 

export function CreateApiModelFromPaymentMethod(paymentMethod: PaymentMethod): PaymentMethodCrudApiModel {
  return {
    active: paymentMethod.active,
    color: paymentMethod.color,
    icon: paymentMethod.icon,
    id: paymentMethod.id,
    name: paymentMethod.name
  } as PaymentMethodCrudApiModel;
}

export function CreatePaymentMethodModelFromApi(paymentMethod: PaymentMethodCrudApiModel): PaymentMethod {
  return {
    id: paymentMethod.id,
    name: paymentMethod.name,
    active: paymentMethod.active,
    color: paymentMethod.color,
    icon: paymentMethod.icon,
  } as PaymentMethod;
}

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