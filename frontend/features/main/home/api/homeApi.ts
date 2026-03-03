import { HomeResponse } from "@/features/main/home/types/home.types";
import clientAxios from "@/lib/axios/clientAxios";

export const getHomeData = async (): Promise<HomeResponse> => {
    const res = await clientAxios.get("home");
    return res.data;
}
