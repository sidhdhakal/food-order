import { useQuery } from "@tanstack/react-query";
import { getTodaysOrdersApi } from "../../Api/order";
import CheckLogin from "../../Utils/CheckLogin";
import { useEffect, useState } from "react";

export function useGetTodaysOrders() {
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
    queryKey: ['todaysorders'],
    queryFn: getTodaysOrdersApi,
    refetchInterval: user == null ? false : 5000
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
