const base = process.env.NEXT_PUBLIC_API_PROFILE;
const profileAPI = {
  updateUser: `${base}/updateUser`,
  changePassword: `${base}/changePassword`,
};

export default profileAPI;
