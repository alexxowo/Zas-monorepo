import { Request, Response } from "express";
import { PaymentMethodsService } from "../services/PaymentMethods";
import { PaymentMethodCrudApiModel } from "../models/payments/PaymentMethodCrudApiModel";
import { BaseFilter } from "../models/BaseFilter";

export class PaymentMethodController {
  static async createPaymentMethod(req: Request, res: Response) {
    try {
      const values = req.body as PaymentMethodCrudApiModel;
      var paymentMethod = await PaymentMethodsService.createPaymentMethod(values);
      
      res.status(201).json({ message: "Payment method created successfully",
        model: paymentMethod
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error creating payment method" });
    }
  }
  
  static async updatePaymentMethod(req: Request, res: Response) {
    try {
      const values = req.body as PaymentMethodCrudApiModel;
      const paymentMethodId = req.params.id as unknown as number;

      if (!paymentMethodId) {
        return res.status(400).json({ message: "Payment method ID not found" });
      }

      var paymentMethod = await PaymentMethodsService.updatePaymentMethod(values, paymentMethodId);
      
      res.status(201).json({ 
        message: "Payment method updated successfully",
        model: paymentMethod
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error updating payment method" });
    }
  }

  static async getPaymentMethods(req: Request, res: Response) {
    try {
      const filter = {
        ...req.query,
        active: req.query.active === 'true' ? true : req.query.active === 'false' ? false : undefined,
      } as BaseFilter;
      const paymentMethods = await PaymentMethodsService.getPaymentMethods(filter);
      res.status(200).json({ ...paymentMethods });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error getting payment methods" });
    }
  }
} 