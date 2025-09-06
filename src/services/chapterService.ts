import api from "@/middleware/api";
import chapterAPI from "../../env/chapterAPI";
import { Chapter, ChapterUpdate } from "../../env/type/typeChapter";
export const createChapter = async (data: Chapter) => {
  const res = await api.post(chapterAPI.createChapter, data);
  return res.data;
};
// export const getAllChapters = async (bookId: string) => {
//   const res = await api.get(`${chapterAPI.getAllChapter}/${bookId}`);
//   return res.data;
// };
export const deleteChapter = async (id: string, chapterId: string) => {
  const res = await api.delete(`${chapterAPI.deleteChapter}/${id}`, { data: { chapterId} });
  return res.data;
};

export const updateChapter = async (id: string, data: ChapterUpdate) => {
  const res = await api.put(`${chapterAPI.updateChapter}/${id}`, data);
  return res.data;
};
export const getChapterByIdAndNumber = async (id: string, number: number) => {
  const res = await api.get(`${chapterAPI.getChapterById}/${id}/${number}`);
  return res.data;
};