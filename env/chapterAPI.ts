
const base = process.env.NEXT_PUBLIC_API_CHAPTER;
const chapterAPI = {
  createChapter: `${base}/createChapter`,
  updateChapter: `${base}/updateChapter`,
  deleteChapter: `${base}/deleteChapter`,
  getAllChapter: `${base}/getAllChapter`,
  getChapterById: `${base}/getChapter`,
};

export default chapterAPI;
