import axios from "axios";

const api = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_API_AUTH,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
