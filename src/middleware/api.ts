import axios from "axios";

const api = axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },

});

export default api;
