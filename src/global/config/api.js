import axios from 'axios';

export const baseUrl = 'http://localhost:5000/api/v1';

const API = axios.create({
  baseURL: baseUrl,
});

export default API;
