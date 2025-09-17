const API_URL = process.env.NEXT_PUBLIC_API_MAINPAGE;

const mainAPI = {
    getAllBooks: `${API_URL}/getAllBooks`,
    getBookProfileById: `${API_URL}/getBookProfileById`,
    getItemRollBar: `${API_URL}/ItemRollBar`
}
export default mainAPI;