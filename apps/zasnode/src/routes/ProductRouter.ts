import { Router } from "express";
import { ProductController } from "../controllers/ProductController";

export const productRoutes = Router();

productRoutes.post("/create", ProductController.createProduct);
productRoutes.put("/update/:id", ProductController.updateProduct);
productRoutes.get("/list", ProductController.getProducts);

export default productRoutes;