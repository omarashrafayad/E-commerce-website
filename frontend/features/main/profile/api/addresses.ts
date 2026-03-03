import { addAddressFormData } from "@/features/main/profile/schemas/addresses.schema";
import clientAxios from "@/lib/axios/clientAxios"
import { AddressResponse, IAddress } from "@/features/main/profile/types/address.types";

export const getAddresses = async (): Promise<AddressResponse> => {
    const response = await clientAxios.get<AddressResponse>("addresses")
    return response.data;
}

export const addAddress = async (data: addAddressFormData): Promise<{ status: string, message: string, data: IAddress }> => {
    const response = await clientAxios.post<{ status: string, message: string, data: IAddress }>("addresses", data)
    return response.data;
}
export const deleteAddress = async (id: string): Promise<{ status: string, message: string }> => {
    const response = await clientAxios.delete<{ status: string, message: string }>(`addresses/${id}`)
    return response.data;
}
