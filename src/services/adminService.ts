import api from "@/middleware/api";
import adminAPI from "../../env/adminAPI";

export const getAllBooksAdmin = async (page: number, size: number , search: string = "") => {
  try {
    const res = await api.get(
      `${adminAPI.getAllBooks}?page=${page}&size=${size}&search=${encodeURIComponent(search)}`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const deleteBooksAdmin = async (id: string) => {
  try {
    const res = await api.delete(`${adminAPI.deleteBooks}/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const updateBooksAdmin = async (id: string, data: { roleBar?: boolean; status?: string }) => {
  try {
    const res = await api.put(`${adminAPI.updateBooks}/${id}`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};