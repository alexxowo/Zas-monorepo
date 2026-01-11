import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Definimos los tipos (Si usas JS, omite las interfaces)
interface UserProfile {
  id: string;
  name: string;
  username: string;
  token: string;
  roles: string[];
}

interface AuthState {
  token: string | null;
  profile: UserProfile | null;
  isAuth: boolean;
  login: (token: string, profile: UserProfile) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      profile: null,
      isAuth: false,

      // Acción para iniciar sesión
      login: (token: string, profile: UserProfile) => {

        console.log("Login", token, profile);

        set(() => ({
          token,
          profile,
          isAuth: true,
        }));
      },

      // Acción para cerrar sesión
      logout: () => {
        set(() => ({
          token: null,
          profile: null,
          isAuth: false,
        }));
      },
    }),
    {
      name: 'auth-storage', // Nombre único para la key en localStorage
      storage: createJSONStorage(() => localStorage), // (Opcional) por defecto usa localStorage
    }
  )
);