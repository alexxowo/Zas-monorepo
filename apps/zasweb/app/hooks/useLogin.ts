// hooks/useLogin.ts
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useAuthStore } from "../store/authStore"; // Tu store de Zustand
import {
  loginRequest,
  type LoginResponse,
  type LoginCredentials,
} from "../api/loginService";

export const useLogin = () => {
  const navigate = useNavigate();
  const setLogin = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: loginRequest,
    onSuccess: (data: LoginResponse) => {
      setLogin(data.user.token, {
        id: data.user.id,
        name: data.user.name,
        username: data.user.username,
        token: data.user.token,
        roles: data.user.roles,
      });
      navigate("/dashboard");
    },
    onError: (error) => {
      console.error("Error en login:", error);
    },
  });
};
