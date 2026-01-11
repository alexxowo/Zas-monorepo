import { Request, Response } from "express";
import { CategoryService } from "../services/CategoryService";
import { CategoryCrudApiModel } from "@zas/models/products/categories/CategoryCreateApiModel";
import { BaseFilter } from "@zas/models/BaseFilter";

export class CategoryController {
  static async createCategory(req: Request, res: Response) {
    try {
      const values = req.body as CategoryCrudApiModel;
      var category = await CategoryService.createCategory(values);
      
      res.status(201).json({ message: "Category created successfully",
        model: category
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error creating category" });
    }
  }

  static async updateCategory(req: Request, res: Response) {
    try {
      const values = req.body as CategoryCrudApiModel;
      const categoryId = req.params.id as string;

      if (!categoryId) {
        return res.status(400).json({ message: "Category ID not found" });
      }

      var category = await CategoryService.updateCategory(values, categoryId);
      
      res.status(201).json({ 
        message: "Category updated successfully",
        model: category
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error updating category" });
    }
  }

  static async getCategories(req: Request, res: Response) {
    try {
      const filter = {
        ...req.query,
        active: req.query.active === 'true' ? true : req.query.active === 'false' ? false : undefined,
      } as BaseFilter;
      const categories = await CategoryService.getCategories(filter);
      res.status(200).json({ ...categories });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error getting categories" });
    }
  }
}