# Monorepo: [Nombre de tu Proyecto]

Este repositorio utiliza una arquitectura de **Monorepo** para gestionar tanto el Frontend como el Backend en un solo lugar. Utilizamos **NPM Workspaces** para la gestión de dependencias y **Turborepo** para la orquestación de tareas.

## 📂 Estructura del Proyecto

El código fuente se encuentra dentro de la carpeta `apps/`:

```text
/
├── apps/
│   ├── zasnode/    # API REST (Node.js + Express)
│   └── zasweb/   # Cliente Web (React + Vite)
├── package.json    # Configuración raíz y workspaces
└── turbo.json      # Pipeline de ejecución
