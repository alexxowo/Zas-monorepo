import { prisma } from "../config/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Role } from "@zas/database/enums";
import { CreateApiModelFromUser } from "../helpers/ModelExtensions";

export class UserService {
  static async createUser(data: {
    name: string;
    email?: string;
    username: string;
    password: string;
    roles: Role[];
  }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Verifica que ya existe el usuario
    const user = await prisma.user.findUnique({
      where: {
        username: data.username,
      },
    });
    
    if (user) throw new Error("User already exists");

    return await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        username: data.username,
        roles: data.roles,
      },
    });
  }

  static async loginUser(data: { username: string; password: string }) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          username: {
            equals: data.username,
            mode: 'insensitive',
          }
        },
      });
      
      if (!user) throw new Error("User not found");

      const isPasswordCorrect = await bcrypt.compare(
        data.password,
        user.password
      );
      
      if (!isPasswordCorrect) throw new Error("Incorrect password");

      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
          roles: user.roles,
        },
        process.env.JWT_PASS || 'secret',
        { expiresIn: "12h" }
      );

      return CreateApiModelFromUser(user, token);
    } catch (error) {
      console.log(error);
      throw new Error("Error logging in user");
    }
  }

  static async validateToken(token: string) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_PASS || 'secret') as { id: string, name: string, roles: string[] };
      return decoded;
    } catch (error) {
      console.log(error);
      throw new Error("Error validating token");
    }
  }

}
