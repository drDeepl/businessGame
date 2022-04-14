import axios from "axios";

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

const instance = axios.create({
  baseURL: "https://api.economic.fisting.tech/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
