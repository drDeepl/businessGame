import axios from 'axios';
import {develop} from '@/_config';
let API_URL = null;
if (develop) {
  API_URL = 'http://127.0.0.1:8000/api/';
} else {
  API_URL = 'https://api.economic.fisting.tech/api/';
}

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
