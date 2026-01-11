import { Router } from "express";
import { PaymentMethodController } from "../controllers/PaymentMethodController";

export const paymentMethodRoutes = Router();

paymentMethodRoutes.post("/create", PaymentMethodController.createPaymentMethod);
paymentMethodRoutes.put("/update/:id", PaymentMethodController.updatePaymentMethod);
paymentMethodRoutes.get("/list", PaymentMethodController.getPaymentMethods);    

export default paymentMethodRoutes;