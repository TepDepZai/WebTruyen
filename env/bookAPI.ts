const base = process.env.NEXT_PUBLIC_API_PAPERPOINT;
const bookAPI = {
  getAllBooks: `${base}/getAllBooks`,
  getBookById: `${base}/getBookById`,
  createBook: `${base}/createBook`,
  updateBook: `${base}/updateBook`,
  deleteBook: `${base}/deleteBook`,
};

export default bookAPI;
