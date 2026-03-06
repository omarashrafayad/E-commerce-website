"use client";

import {
    updateProfile,
    updatePassword,
} from "@/features/main/profile/api/user"
import { updatePasswordFormData } from "../schemas/user.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useUpdateProfileFormdata = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (formData: FormData) => updateProfile(formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
    });
}

export const useUpdatePasswordFormdata = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: updatePasswordFormData) => updatePassword(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
    });
}

