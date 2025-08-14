
import profileAPI from "../../env/profileAPI";
import api from "@/middleware/api";


export const updateUser = async (data: { fullName: string }) => {
  const res = await api.put(profileAPI.updateUser, data);
  return res.data;
};
export const changePassword = async (data: { oldPassword: string; newPassword: string }) => {
  const res = await api.put(profileAPI.changePassword, data);
  return res.data;
};
