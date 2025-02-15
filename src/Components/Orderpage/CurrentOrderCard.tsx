import { Icon } from "@iconify/react/dist/iconify.js";
import { useGetCurrentOrder } from "../../Queries/order/useGetCurrentOrder";
import Loading from "../UI/Loading";
import IsError from "../UI/IsError";
import DialogModal from "../DialogModal";
import { useCancelOrder } from "../../Queries/order/useCancelOrder";
import { useState } from "react";
import Button from "../UI/Button";

const CurrentOrderCard = () => {
  const { data , isLoading, isError} = useGetCurrentOrder();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<string | null>(null);
  const[message, setMessage]=useState('')

  if (data?.doc?.length === 0)
    return (
      <div className="py-5 text-xl text-zinc-400">
        There is no Current Order
      </div>
    );

  if(isLoading)
    return   <Loading>Loading...</Loading>

  if(isError)
      return  <IsError>Cannot Get Your Current Order</IsError>

    const {cancelOrder, isPending, }=useCancelOrder()

  const handleCancelUser=()=>{
    if(message==="")
        return
    cancelOrder({_id:deleteDialogOpen, message})
  }
  return (
    <div className="w-full">
       {deleteDialogOpen !==null && (
        <DialogModal
          message={`Do you really want to Cancel Current Order?`}
          btntext="Delete"
          isPending={isPending}
          pendingText="Deleting..."
          onConfirm={handleCancelUser}
          showInput={true}
          inputMessage={message}
          setInputMessage={setMessage}
          onCancel={() => setDeleteDialogOpen(null)}
        />
      )}
      {data?.doc?.map((currentOrder: any) => {
        const allSteps = [
          "Order Placed",
          "Order Confirmed",
          "Preparing",
          "Ready for Pickup",
          "Completed",
        ];

        const isCancelled = currentOrder?.currentStatus?.status === "Cancelled";

        let steps = allSteps.map((status: string) => {
          const foundStatus = currentOrder?.statusHistory?.find(
            (historyStatus: any) => historyStatus.status === status
          );

          const isCurrent = currentOrder?.currentStatus?.status === status;

          return {
            name: status,
            time: foundStatus
              ? new Date(foundStatus.time).toLocaleTimeString()
              : "N/A",
            status: isCurrent
              ? "current"
              : foundStatus
              ? "completed"
              : "not-completed",
          };
        });

        if (isCancelled) {
          steps = [
            {
              name: "Cancelled",
              time: new Date(currentOrder?.currentStatus?.time).toLocaleTimeString(),
              status: "cancelled",
            },
          ];
        }

        return (
          <div
            key={currentOrder._id}
            className="w-full bg-white rounded-xl p-6 shadow-sm mt-2 lg:mt-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl lg:text-2xl font-semibold">
                    Order #{currentOrder._id.slice(-5)}
                  </h2>
                  <div
                    className={`px-3 py-1 rounded-full text-sm md:text-md lg:text-lg ${
                      isCancelled ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {currentOrder?.currentStatus?.status}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm md:text-md lg:text-lg text-gray-500">
                  {new Date(currentOrder?.createdAt).toLocaleDateString()}
                </div>
                <div className="font-bold mt-1">
                  Rs{" "}
                  {currentOrder?.items
                    ?.reduce(
                      (acc: number, item: any) => acc + item.price * item.qty,
                      0
                    )
                    .toFixed(2)}
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-8">
              {/* Order Items */}
              <div className="flex-1">
                <h3 className="font-medium mb-3 text-md lg:text-xl 4xl:text-2xl">
                  Order Items
                </h3>
                <div className="space-y-2 text-sm md:text-md lg:text-lg">
                  {currentOrder?.items?.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <div>
                        <span className="font-medium">{item.qty}x</span>{" "}
                        {item.name}
                        <span className="text-sm md:text-md lg:text-lg text-gray-500 ml-2">
                          ({item.size})
                        </span>
                      </div>
                      <div>Rs {item.price.toFixed(2)}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <Icon
                    icon={
                      currentOrder?.payment === "Cash"
                        ? "ph:money"
                        : "duo-icons:credit-card"
                    }
                    className="text-primary-600 text-xl lg:text-2xl"
                  />
                  <span className="text-sm md:text-md lg:text-lg">
                    {currentOrder?.paymentMethod}
                  </span>
                </div>
                  
                {currentOrder.statusHistory.length<2 &&
                <Button onClick={()=>setDeleteDialogOpen(currentOrder._id)} className="!w-fit mt-4 !bg-zinc-200 !text-black !hover:bg-zinc-300">Cancel Order</Button>
                }
              </div>

              {/* Order Progress */}
              <div className="flex-1">
                <h3 className="font-medium mb-4 text-md lg:text-xl 4xl:text-2xl">
                  Order Progress
                </h3>
                <div className="space-y-2">
                  {steps?.map((step: any, index: number) => (
                    <div key={index} className="flex items-start gap-3">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          step.status === "completed"
                            ? "bg-green-500"
                            : step.status === "current"
                            ? "bg-yellow-500"
                            : step.status === "cancelled"
                            ? "bg-red-500"
                            : "bg-gray-200"
                        }`}
                      >
                        {step.status === "completed" && (
                          <Icon
                            icon="ph:check-bold"
                            className="text-white text-sm md:text-md lg:text-lg"
                          />
                        )}
                        {step.status === "current" && (
                          <Icon
                            icon="ph:clock"
                            className="text-white text-sm md:text-md lg:text-lg"
                          />
                        )}
                        {step.status === "cancelled" && (
                          <Icon
                            icon="ph:x-circle"
                            className="text-white text-sm md:text-md lg:text-lg"
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between text-sm md:text-md lg:text-lg">
                          <span
                            className={`${
                              step.status === "completed"
                                ? "text-green-500"
                                : step.status === "current"
                                ? "text-yellow-500"
                                : step.status === "cancelled"
                                ? "text-red-500"
                                : "text-gray-400"
                            }`}
                          >
                            {step.name}
                          </span>
                          <span className="text-sm md:text-md lg:text-lg text-gray-500">
                            {step.time}
                          </span>
                        </div>
                        {index < steps.length - 1 && step.status !== "cancelled" && (
                          <div
                            className={`w-px h-4 ml-3 ${
                              step.status === "completed"
                                ? "bg-green-500"
                                : "bg-gray-200"
                            }`}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CurrentOrderCard;
