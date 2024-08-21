import axios, {
  AxiosError,
  AxiosHeaders,
  InternalAxiosRequestConfig,
} from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:4004/api",
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
export const instanceAuth = axios.create({
  baseURL: "http://localhost:4004/api",
});

instanceAuth.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token) {
      if (!config.headers) {
        config.headers = new AxiosHeaders();
      }
      config.headers.set("Authorization", token);
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);
