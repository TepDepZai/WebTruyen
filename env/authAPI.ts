
const base = process.env.NEXT_PUBLIC_API_AUTH;
const authAPI = {
  login: `${base}/login`,
  logout: `${base}/logout`,
  register: `${base}/register`,
  getCurrentUser: `${base}/getCurrentUser`,
  getAllUsers: `${base}/getAllUsers`,
  assignRole: `${base}/assignRole`,
  activateUser: `${base}/activateUser`,
  loginWithGoogle: `${base}/loginWithGoogle`,
};

export default authAPI;
