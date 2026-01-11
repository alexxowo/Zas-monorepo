import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  // index("routes/home.tsx")
  index("components/pages/index.tsx"),
  // Login
  ...prefix("auth", [
    layout("layouts/auth.tsx", [
      index("components/pages/auth/login.tsx"),
    ]),
  ]),

  // Dashboard
  ...prefix("dashboard", [
    layout("layouts/dashboard.tsx", [
      index("components/pages/dashboard/index.tsx"),
      route("orders", "components/pages/dashboard/orders/index.tsx"),
      route("customers", "components/pages/dashboard/customers/index.tsx"),
      route("treasury", "components/pages/dashboard/treasury/index.tsx"),
      route("settings", "components/pages/dashboard/settings/index.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
