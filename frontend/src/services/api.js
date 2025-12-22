import axios from "axios";

export default axios.create({
  baseURL: "https://college-complaint-system-2.onrender.com",
  withCredentials: true
});

