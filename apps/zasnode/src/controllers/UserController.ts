import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { GlobalService } from "../services/GlobalContext";

export class UserController {
  static async createUser(req: Request, res: Response) {
    try {
      const { name, email, username, password, roles} = req.body;
      await UserService.createUser({ name, email, password, username, roles });
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error creating user" });
    }
  }

  static async loginUser(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const user = await UserService.loginUser({ username, password });
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ message: "Error logging in user" });
    }
  }

  static async validateToken(req: Request, res: Response) {
    try {
      const token = GlobalService.getToken;

      if (!token) throw new Error("No token found");

      const user = await UserService.validateToken(token);
      res.status(200).json({ valid: !!user, user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error validating token" });
    }
  }
  
}
