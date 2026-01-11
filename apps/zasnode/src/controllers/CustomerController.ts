import { Request, Response } from "express";
import { CustomerService } from "../services/CustomerService";
import { CustomerCrudApiModel } from "../models/customers/CrustomerCrudApiModel";
import { BaseFilter } from "../models/BaseFilter";

export class CustomerController {
  static async createCustomer(req: Request, res: Response) {
    try {
      const values = req.body as CustomerCrudApiModel;
      var customer = await CustomerService.createCustomer(values);
      
      res.status(201).json({ message: "Customer created successfully",
        model: customer
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error creating customer" });
    }
  }
  
  static async updateCustomer(req: Request, res: Response) {
    try {
      const values = req.body as CustomerCrudApiModel;
      const customerId = req.params.id as string;

      if (!customerId) {
        return res.status(400).json({ message: "Customer ID not found" });
      }

      var customer = await CustomerService.updateCustomer(values, customerId);
      
      res.status(201).json({ 
        message: "Customer updated successfully",
        model: customer
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error updating customer" });
    }
  }

  static async getCustomers(req: Request, res: Response) {
    try {
      const filter = {
        ...req.query,
        active: req.query.active === 'true' ? true : req.query.active === 'false' ? false : undefined,
      } as BaseFilter;
      const customers = await CustomerService.getCustomers(filter);
      res.status(200).json({ ...customers });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error getting customers" });
    }
  }
} 
