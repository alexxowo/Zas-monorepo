
import { z } from "zod";
import { registry } from "../../docs/openApi";

// Creamos una función para manejar el tipo genérico T
export const pagedResultSchema = <T extends z.ZodTypeAny>(itemSchema: T) => 
  z.object({
    items: z.array(itemSchema),
    totalItems: z.number().int().nonnegative(), // Validaciones extra recomendadas
    pageNumber: z.number().int().nonnegative(),
    pageSize: z.number().int().positive(),
  }).openapi({
    type: "object",
    example: {
      items: [
        {
          id: "123",
          name: "John Doe",
          surname: "Doe",
          identityValue: "123456789",
          address: "123 Main St",
          phone: "555-123-4567",
          email: "john@example.com",
        },
      ],
      totalItems: 100,
      pageNumber: 1,
      pageSize: 10,
    },
  });

// registry.register('pagedResult', pagedResultSchema);