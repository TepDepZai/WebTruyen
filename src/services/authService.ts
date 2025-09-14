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
export const getAllUsers = async (page: number, size: number) => {
  const res = await api.get(`${authAPI.getAllUsers}/?page=${page}&size=${size}`);
  return res.data;
};
export const assignRole = async (user_id: string, role: string) => {
  const res = await api.put(authAPI.assignRole, { user_id, role });
  return res.data;
}
export const activateUser = async (user_id: string) => {
   try {
    const res = await api.put(authAPI.activateUser, { user_id });
    return res.data;
  } catch (err: any) {
    return err.response?.data || { success: false, message: "Unknown error" };
  }
}