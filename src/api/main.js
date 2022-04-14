import axios from 'axios'

const API_URL = 'https://api.economic.fisting.tech/api/'

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;

