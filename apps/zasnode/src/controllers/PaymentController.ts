import { Request, Response } from "express";
import { PaymentService } from "../services/PaymentService";
import { PaymentCrudApiModel } from "@zas/models/payments/PaymentCrudApiModel";
import { BaseFilter } from "@zas/models/BaseFilter";

export class PaymentController {
  static async createPayment(req: Request, res: Response) {
    try {
      const values = req.body as PaymentCrudApiModel;
      var payment = await PaymentService.createPayment(values);
      
      res.status(201).json({ message: "Payment created successfully",
        model: payment
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error creating payment" });
    }
  }
  
  static async updatePayment(req: Request, res: Response) {
    try {
      const values = req.body as PaymentCrudApiModel;
      const paymentId = req.params.id as string;

      if (!paymentId) {
        return res.status(400).json({ message: "Payment ID not found" });
      }

      var payment = await PaymentService.updatePayment(values, paymentId);
      
      res.status(201).json({ 
        message: "Payment updated successfully",
        model: payment
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error updating payment" });
    }
  }

  static async getPayments(req: Request, res: Response) {
    try {
      const filter = {
        ...req.query,
        active: req.query.active === 'true' ? true : req.query.active === 'false' ? false : undefined,
      } as BaseFilter;
      const payments = await PaymentService.getPayments(filter);
      res.status(200).json({ ...payments });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error getting payments" });
    }
  }
}