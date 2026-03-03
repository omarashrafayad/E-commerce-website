import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getAddresses, addAddress, deleteAddress } from "@/features/main/profile/api/addresses"

export const useAddresses = () => {
    return useQuery({
        queryKey: ["addresses"],
        queryFn: getAddresses,
    })
}

export const useAddAddress = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addAddress,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["addresses"] });
        },
    })
}
export const useDeleteAddress = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteAddress,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["addresses"] });
        },
    })
}
