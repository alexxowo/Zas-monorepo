import { OpenAPIRegistry, RouteConfig } from '@asteasolutions/zod-to-openapi';
import { Request, Response, NextFunction, Router } from 'express';
import { z, ZodType } from 'zod';

// Importamos tu registry global
import { registry } from '../docs/openApi'; 

export const createRoute = (config: RouteConfig) => {
  // 1. AUTOMATIZACIÓN: Registramos en Swagger aquí mismo
  registry.registerPath(config);

  // 2. Devolvemos la config para usarla en el router
  return config;
};