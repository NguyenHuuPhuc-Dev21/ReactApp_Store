import axios from "axios";

// Public REST API: https://fakestoreapi.com (LO7)
const api = axios.create({
  baseURL: "https://fakestoreapi.com",
});

export default api;
