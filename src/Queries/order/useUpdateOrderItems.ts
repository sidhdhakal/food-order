import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateOrderItemsApi } from "../../Api/order";

export interface OrderItem {
  itemId?: string;
  name: string;
  category?: string;
  price: number;
  qty: number;
  size?: string;
}

export interface UpdateOrderItemsParams {
  _id: string;
  items: OrderItem[];
}

export function useUpdateOrderItems() {
  const queryClient = useQueryClient();

  const {
    mutate: updateOrderItems,
    isError,
    isPending,
    data,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: updateOrderItemsApi,
    onSuccess: () => {
      toast.success("Order items updated successfully");
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: (error: any) => {
      console.error("Error updating order items:", error);
      toast.error(`${error.message}`);
    },
  });

  return { updateOrderItems, isError, data, error, isSuccess, isPending };
}