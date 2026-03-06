import { addAddressFormData } from "@/features/main/profile/schemas/addresses.schema";

export interface IAddress extends addAddressFormData {
    _id: string;
}

export interface AddressResponse {
    status: string;
    results: number;
    data: IAddress[];
}
