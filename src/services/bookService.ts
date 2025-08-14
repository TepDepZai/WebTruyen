import api from "@/middleware/api";
import bookAPI from "../../env/bookAPI";
import { Book } from "../../env/type/type";
export const createBook = async (data: Book) => {
  const res = await api.post(bookAPI.createBook, data);
  return res.data;
};
export const getAllBooks = async () => {
  const res = await api.get(bookAPI.getAllBooks);
  return res.data;
};
export const deleteBook = async (id: string) => {
  const res = await api.delete(`${bookAPI.deleteBook}/${id}`);
  return res.data;
};
export const getBookById = async (id: string) => {
  const res = await api.get(`${bookAPI.getBookById}/${id}`);
  return res.data;
};
export const updateBook = async (id: string, data: Book) => {
  const res = await api.put(`${bookAPI.updateBook}/${id}`, data);
  return res.data;
};