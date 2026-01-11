import { Router } from "express";
import { CustomerController } from "../controllers/CustomerController";

export const customerRoutes = Router();

customerRoutes.post("/create", CustomerController.createCustomer);
customerRoutes.put("/update/:id", CustomerController.updateCustomer);
customerRoutes.get("/list", CustomerController.getCustomers);

export default customerRoutes;