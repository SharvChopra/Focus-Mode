import axios from "axios";

const api = axios.create({
  // This assumes your proxy in package.json is set to http://localhost:5000
  baseURL: "/api",

  // CRITICAL: This tells the browser to send the session cookie with requests
  withCredentials: true,
});

export default api;
