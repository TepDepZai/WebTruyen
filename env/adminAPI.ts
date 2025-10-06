const base = process.env.NEXT_PUBLIC_API_ADMIN;
const adminAPI = {
    getAllBooks: `${base}/getBookAdmin`,
    deleteBooks: `${base}/deleteBookAdmin`,
    updateBooks: `${base}/updateBookAdmin`,
};

export default adminAPI;
