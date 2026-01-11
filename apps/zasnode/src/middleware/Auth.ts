import { Request, Response, NextFunction } from "express";
import { GlobalService } from "../services/GlobalContext";
import jwt from "jsonwebtoken";

export const AuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = GlobalService.getToken;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Session invalida. Vuelve a iniciar sesión.",
    });
  }

  try {
    const secret = process.env.JWT_PASS || "secret";
    const decoded = jwt.verify(token, secret);

    next();
  } catch (error) {
    // 4. Manejo específico de errores
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        success: false,
        code: "TOKEN_EXPIRED", // Código útil para que el frontend sepa que debe refrescar
        message: "El token ha expirado. Por favor inicia sesión nuevamente.",
      });
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        message: "Token inválido o corrupto.",
      });
    }

    // Error genérico
    return res
      .status(500)
      .json({ success: false, message: "Error de autenticación." });
  }
};
