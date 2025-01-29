import { useMutation } from "@tanstack/react-query";
import { signUpApi } from "../Api/auth";
import toast from "react-hot-toast";

export function useSignUp() {
  const {
    mutate: signup,
    isError,
    isPending,
    data,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: signUpApi,
    onSuccess: () => {
      toast.success("Account Created Successfully! Please Check your email to verify it!");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    },
    onError: (error) => {
      console.error("Error creating account:", error);
      toast.error(`Error: ${error.message}`);
    },
  });

  return { signup, isError, data, error, isSuccess, isPending };
}
