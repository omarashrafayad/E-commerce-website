// serverAxios.ts
"use server";
import axios, { AxiosInstance } from "axios";
import { cookies } from "next/headers";

export const serverAxios: AxiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1/",
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

serverAxios.interceptors.request.use(async (config) => {
  const token = (await cookies()).get("token")?.value;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default serverAxios;
