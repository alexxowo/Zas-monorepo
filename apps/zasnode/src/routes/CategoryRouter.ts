import { Router } from "express";
import { CategoryController } from "../controllers/CategoryController";

export const categoryRoutes = Router();

categoryRoutes.post("/create", CategoryController.createCategory);
categoryRoutes.put("/update/:id", CategoryController.updateCategory);
categoryRoutes.get("/list", CategoryController.getCategories);

export default categoryRoutes;