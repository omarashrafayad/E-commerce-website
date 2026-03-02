import { HomeResponse } from "@/types/home.types";
import clientAxios from "./clientAxios";

export const getHomeData = async (): Promise<HomeResponse> => {
    const res = await clientAxios.get("home");
    return res.data;
}