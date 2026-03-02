import { forgotPassword, resetPassword, verifyResetCode } from "@/api/authh"
import { useMutation } from "@tanstack/react-query"

const handleMutationError = (error: any) => {
  if (error.response?.data?.message) return error.response.data.message;
  if (error.message) return error.message;
  return "Something went wrong";
};
export const useForgotPassword = () => {
    return useMutation({
        mutationFn: forgotPassword,
        onError: handleMutationError,
    })
}
export const useVerifyCode = () => {
  return useMutation({
    mutationFn: verifyResetCode,
      onError: handleMutationError,
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,
      onError: handleMutationError,
  });
};

