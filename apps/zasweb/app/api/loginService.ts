import axios from "axios";
import { loginUrl } from "~/api/urls";

// Tipos para TS
export interface LoginResponse {
  user: {
    token: string;
    id: string;
    name: string;
    username: string;
    roles: string[];
  };
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export const loginRequest = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  const { data } = await axios.post(loginUrl, credentials);
  return data;
};
