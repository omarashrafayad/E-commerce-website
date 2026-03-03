"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
    updateProfile,
    updatePassword,
    getUsers,
    deleteUser,
    createUser,
    updateUser
} from "@/features/main/profile/api/user"
import { updatePasswordFormData } from "@/features/main/profile/schemas/user.schema";

export const updateProfileFormdata = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (formData: FormData) => updateProfile(formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
    });
}

export const updatePasswordFormdata = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: updatePasswordFormData) => updatePassword(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
    });
}

// Admin Hooks
export const useAllUsers = (params: { page?: number; limit?: number } = {}) => {
    return useQuery({
        queryKey: ["users", params],
        queryFn: () => getUsers(params),
    });
};

export const useCreateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => createUser(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ userId, data }: { userId: string, data: any }) => updateUser(userId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (userId: string) => deleteUser(userId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });
};
