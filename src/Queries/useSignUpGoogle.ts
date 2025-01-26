import { useMutation } from "@tanstack/react-query";
import { signUpGoogleApi } from "../Api/auth";

export function useSignUpGoogle() {
  const {
    mutate: signupGoogle,
    isError,
    data,
    error,
  } = useMutation({
    mutationFn: signUpGoogleApi,
    onSuccess: (data) => {
      console.log("Account created successfully:", data);
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    },
    onError: (error) => {
      console.error("Error creating account:", error);
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    },
  });

  return { signupGoogle, isError, data, error };
}
