import axios from "axios";

axios.interceptors.request.use(
  (config) => {
    config.baseURL = process.env.NEXT_PUBLIC_APP_URL;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axios;
