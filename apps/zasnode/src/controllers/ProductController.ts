import { Request, Response } from "express";
import { ProductService } from "../services/ProductService";
import { CreateProductApiModel } from "../models/products/createProductApiModel";
import { ProductFilterBasic } from "../models/products/ProductFilterBasic";


export class ProductController {
  static async createProduct(req: Request, res: Response) {
    try {
      const values = req.body as CreateProductApiModel;
      var product = await ProductService.createProduct(values);
      
      res.status(201).json({ message: "Product created successfully",
        model: product
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error creating product" });
    }
  }

  static async updateProduct(req: Request, res: Response) {
    try {
      const values = req.body as CreateProductApiModel;
      const productId = req.params.id as string;

      if (!productId) {
        return res.status(400).json({ message: "Product ID not found" });
      }

      var product = await ProductService.updateProduct(values, productId);
      
      res.status(201).json({ 
        message: "Product updated successfully",
        model: product
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error updating product" });
    }
  }

  static async getProducts(req: Request, res: Response) {
    try {
      const filter = {
        ...req.query,
        active: req.query.active === 'true' ? true : req.query.active === 'false' ? false : undefined,
      } as ProductFilterBasic;
      const products = await ProductService.getProducts(filter);
      res.status(200).json({ ...products });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error getting products" });
    }
  }
}