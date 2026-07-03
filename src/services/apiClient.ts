import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_API_JWT_TOKEN;

  if (token) {
    config.headers.Authorization = token;
  }

  return config;
});
