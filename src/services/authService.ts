import authAPI from "../../env/authAPI";
import api from "@/middleware/api";
import { LoginCredentials, RegisterData} from "../../env/type/type";

export const login = async (credentials: LoginCredentials) => {
  const res = await api.post(authAPI.login, credentials);
  return res.data;
};

export const register = async (data: RegisterData) => {
  const res = await api.post(authAPI.register, data);
  return res.data;
};
export const logout = async () => {
  const res = await api.post(authAPI.logout);
  return res.data;
};
export const getCurrentUser = async () => {
  const res = await api.get(authAPI.getCurrentUser);
  return res.data;
};