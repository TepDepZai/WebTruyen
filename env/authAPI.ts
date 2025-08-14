
const base = process.env.NEXT_PUBLIC_API_AUTH;
const authAPI = {
  login: `${base}/login`,
  logout: `${base}/logout`,
  register: `${base}/register`,
  getCurrentUser: `${base}/getCurrentUser`,

};

export default authAPI;
