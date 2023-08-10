import axios from 'axios';

const api = axios.create({
  baseURL: 'https://sheetdb.io/api/v1/',
});

export default api;