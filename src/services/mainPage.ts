import api from "@/middleware/api";
import mainAPI from "../../env/mainAPI";

export const getAllBooksMainPage = async () => {
  const res = await api.get(mainAPI.getAllBooks);
  return res.data;
};
export const getBookByIdMainPage = async (id: string) => {
  const res = await api.get(`${mainAPI.getBookProfileById}/${id}`);
  return res.data;
};