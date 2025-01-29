import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { verifyEmailApi } from "../Api/verifyEmail";

export function useVerifyEmail() {
  const {
    mutate: verifyEmail,
    isError,
    isPending,
    data,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: verifyEmailApi,
    onSuccess: (data) => {
      console.log("Email Verified successfully:", data);
      toast.success("Email Verified Successfully!");
    },
    onError: (error) => {
      console.error("Error Verifying email:", error);
      toast.error(`Error: ${error.message}`);
    },
  });

  return { verifyEmail, isError, data, error, isSuccess, isPending };
}
