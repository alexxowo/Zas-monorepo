import { z } from 'zod';
import { Decimal } from '@prisma/client/runtime/library';

// Este esquema acepta number o string, y devuelve un Decimal
export const decimalSchema = z.union([
  z.number(), 
  z.string()
])
.refine((val) => {
  try {
    new Decimal(val); // Verifica si es convertible
    return true;
  } catch {
    return false;
  }
}, { message: "Invalid decimal value" })
.transform((val) => new Decimal(val)) // <--- AQUÍ OCURRE LA MAGIA
.openapi({ type: 'number', example: 10.50 }); // Para que Swagger lo vea como número