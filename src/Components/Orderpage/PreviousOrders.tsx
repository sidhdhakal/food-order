import { useState } from "react";
import Title from "../UI/Title";
import { Icon } from "@iconify/react/dist/iconify.js";
import OrderListItem from "./OrderListItem";
import { useGetOlderOrders } from "../../Queries/order/useGetOlderOrders";
import Loading from "../UI/Loading";
import IsError from "../UI/IsError";

const filterOptions = [
  { value: "All Orders", label: "All Orders", icon: "ph:list" },
  //   { value: "Order Placed", label: "Order Placed", icon: "ph:clock" },
  //   { value: "Order Confirmed", label: "Order Confirmed", icon: "ph:check-circle" },
  //   { value: "Preparing", label: "Preparing", icon: "ph:cogs" },
  //   { value: "Ready for Pickup", label: "Ready to Pickup", icon: "ph:shopping-bag" },
  { value: "Completed", label: "Completed", icon: "ph:thumbs-up" },
  { value: "Cancelled", label: "Cancelled", icon: "ph:thumbs-down" },
];

const PreviousOrders = () => {
  const [filterOption, setFilterOption] = useState("All Orders");
  const { data, isLoading, isError } = useGetOlderOrders();

  const filteredOrders =
    filterOption === "All Orders"
      ? data?.doc
      : data?.doc?.filter((order: any) => order?.currentStatus?.status === filterOption);


  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <Title>Previous Orders</Title>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl shadow-sm">
          <Icon icon="icon-park-twotone:filter" className="text-gray-500 text-2xl" />
          <select
            className="bg-transparent border-none outline-none text-gray-600"
            value={filterOption}
            onChange={(e) => setFilterOption(e.target.value)}
          >
            {filterOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isLoading &&
          <Loading>Loading...</Loading>
        }
        {isError &&
          <IsError>Cannot get your Older orders</IsError>
        }
      {!isLoading && !isError &&
        <div className="flex flex-col gap-3 mt-4">
          {!filteredOrders || filteredOrders.length === 0
            ?
            <div className="py-5 text-xl text-zinc-400">There are no Older Orders</div>
            :
            filteredOrders.map((order: any) => (
              <OrderListItem key={order._id} order={order} />
            ))}
        </div>
      }


    </div>
  );
};

export default PreviousOrders;
