import axios from "axios";

export default axios.create({
  baseURL: "https://college-backend.onrender.com",
  withCredentials: true
});

