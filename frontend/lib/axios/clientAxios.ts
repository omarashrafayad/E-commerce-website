
import { useAuthStore } from "@/stores/useAuthStore";
import axios, { AxiosInstance } from "axios";

export const clientAxios: AxiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1/",
  withCredentials: true, 
  headers: { Accept: "application/json" },
});

clientAxios.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = token.startsWith("Bearer ")
      ? token
      : `Bearer ${token}`;
  }
  return config;
});

export default clientAxios;

