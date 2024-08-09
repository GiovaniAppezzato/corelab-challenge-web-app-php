import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;
const apiPrefix = process.env.REACT_APP_API_PREFIX;

const api = axios.create({
  baseURL: `${apiUrl}${apiPrefix}`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  }
});

export default api;