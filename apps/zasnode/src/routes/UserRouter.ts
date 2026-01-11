import { Router } from "express";
import { UserController } from "../controllers/UserController";

export const userRoutes = Router();

userRoutes.post("/create", UserController.createUser);
userRoutes.post("/login", UserController.loginUser);
userRoutes.post("/validateToken", UserController.validateToken);


export default userRoutes;