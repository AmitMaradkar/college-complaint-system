import axios from "axios";

export default axios.create({
  baseURL: "https://college-complaint-system-nfdl.onrender.com",
  withCredentials: true
});

