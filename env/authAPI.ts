const base = process.env.NEXT_PUBLIC_API_AUTH;
const me = process.env.NEXT_PUBLIC_API_AUTH_ME;
const authAPI = {
  login: `${base}/login`,
  logout: `${base}/logout`,
  register: `${base}/register`,
  getCurrentUser: `${base}/getCurrentUser`,
};

export default authAPI;
