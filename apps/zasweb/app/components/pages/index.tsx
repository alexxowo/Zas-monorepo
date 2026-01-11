// app/routes/check-auth.tsx
import { redirect } from "react-router";
import type { Route } from "../../+types/root";
import { Spinner } from "../ui/spinner";

// Esta función se ejecuta antes de que el usuario vea nada
export async function loader({ request }: Route.LoaderArgs) {
  // Aquí verificas tu sesión (ej: cookies, localStorage, Supabase, Firebase, etc.)
  const isAuthenticated = await checkUserSession(request); 

  if (!isAuthenticated) {
    // Si no está logeado, al login
    return redirect("/auth");
  }

  // Si está logeado, al dashboard
  return redirect("/dashboard");
}

export default function CheckAuth() {
  // Opcional: un spinner por si la redirección tarda unos ms
  return <Spinner className="size-12" />;
}

// Ejemplo ficticio de función de verificación
async function checkUserSession(request: Request) {
  // Lógica para leer cookies o tokens
  return false; // Cambiar a true para probar el dashboard
}