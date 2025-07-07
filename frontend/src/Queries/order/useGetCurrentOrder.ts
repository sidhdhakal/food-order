import { useQuery } from "@tanstack/react-query";
import { getCurrentOrderApi } from "../../Api/order";
import CheckLogin from "../../Utils/CheckLogin";
import { useEffect, useState } from "react";

export function useGetCurrentOrder() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const loggedInUser = await CheckLogin();
      setUser(loggedInUser);
    };
    fetchUser();
  }, []);

  const {
    data,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch
  } = useQuery({
    queryKey: ['orders'],
    queryFn: getCurrentOrderApi,
    refetchInterval: user == null ? false : 2000
  });

  return {
    data,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
  };
}
