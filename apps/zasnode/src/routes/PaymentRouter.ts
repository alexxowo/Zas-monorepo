import { Router } from "express";
import { PaymentController } from "../controllers/PaymentController";

export const paymentRoutes = Router();

paymentRoutes.post("/create", PaymentController.createPayment);
paymentRoutes.put("/update/:id", PaymentController.updatePayment);
paymentRoutes.get("/list", PaymentController.getPayments);    

export default paymentRoutes;