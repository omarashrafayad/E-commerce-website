"use client"
import { useQuery } from "@tanstack/react-query"
import { getHomeData } from "@/api/homeApi"

export const useHome = ()=>{
    return useQuery({
        queryKey: ["home"],
        queryFn: () => getHomeData(),
        retry:false
    })
}