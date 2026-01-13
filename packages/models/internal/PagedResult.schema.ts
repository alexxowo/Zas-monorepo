
import { z } from "zod";

// Creamos una función para manejar el tipo genérico T
export const pagedResultSchema = <T extends z.ZodTypeAny>(itemSchema: T) => 
  z.object({
    items: z.array(itemSchema),
    totalItems: z.number().int().nonnegative(), // Validaciones extra recomendadas
    pageNumber: z.number().int().nonnegative(),
    pageSize: z.number().int().positive(),
  });
// registry.register('pagedResult', pagedResultSchema);