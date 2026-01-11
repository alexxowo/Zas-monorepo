import { OpenAPIRegistry, OpenApiGeneratorV3, extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

// 1. IMPORTANTE: Esto habilita el método .openapi() en tus esquemas de Zod
extendZodWithOpenApi(z);

// 2. Creamos el registro donde acumularemos definiciones y rutas
export const registry = new OpenAPIRegistry();

// 3. Configuración de seguridad (Bearer Token)
registry.registerComponent('securitySchemes', 'bearerAuth', {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT',
});