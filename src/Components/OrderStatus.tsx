import { useGetCurrentOrder } from "../Queries/order/useGetCurrentOrder";
import { Order } from "../Utils/types";

const OrderStatus = ({ setIsActiveComponent }: {setIsActiveComponent:(name:string)=>void}) => {
  const { data, isLoading } = useGetCurrentOrder();
  return (
    <div onClick={() => setIsActiveComponent("Orders")} className="flex flex-col justify-start items-start gap-y-2">
      {data?.doc?.slice(0, 2).map((data: Order) => {
        const isCancelled = data?.currentStatus?.status === "Cancelled";

        return (
          <h1
            key={data._id}
            className="
              text-base sm:text-lg 
              cursor-pointer flex justify-center items-center gap-x-1 text-zinc-500
            "
          >
            Order #{data?._id.slice(-5)}
            <span
              className={`
                px-2 sm:px-3 py-0.5 sm:py-1 
                w-fit rounded-full text-xs sm:text-sm 
                ${isCancelled ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}
              `}
            >
              {isLoading ? "loading..." : data?.currentStatus?.status}
            </span>
          </h1>
        );
      })}
    </div>
  );
};

export default OrderStatus;
