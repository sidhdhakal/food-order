import { Icon } from "@iconify/react/dist/iconify.js";
import Avatar from "../../Components/Avatar";
import { useUpdateOrder } from "../../Queries/order/useUpdateOrder";
import { useEffect, useState } from "react";
import DialogModal from "../../Components/DialogModal";
import { Item } from "../../Utils/types";
import formatDateTime from "../../Utils/formatDateTime";

const filterOptions = [
  { value: "Order Placed", label: "Order Placed", icon: "ph:clock" },
  {
    value: "Order Confirmed",
    label: "Order Confirmed",
    icon: "ph:check-circle",
  },
  { value: "Preparing", label: "Preparing", icon: "ph:cogs" },
  {
    value: "Ready for Pickup",
    label: "Ready for Pickup",
    icon: "ph:shopping-bag",
  },
  { value: "Completed", label: "Completed", icon: "ph:thumbs-up" },
  { value: "Cancelled", label: "Cancelled", icon: "ph:thumbs-down" },
];

const OrderCard = ({ order }: {order:any}) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<{
    id: string | null;
    st: string | null;
  }>({ id: null, st: null });

  const currentStatusIndex = filterOptions.findIndex(
    (option) => option.value === order?.currentStatus?.status
  );

  const { updateOrder, isPending , isSuccess} = useUpdateOrder();

  const handleChange = ({ _id, status }: { _id: string; status: string }) => {
    if (status === "Cancelled")
      return setDeleteDialogOpen({ id: _id, st: status });
    updateOrder({ _id, status });
  };

  useEffect(()=>{
    if(isSuccess)
        setDeleteDialogOpen((prev) => ({ ...prev, id: null, st: null }))
  },[isSuccess])

  const price=order.items.reduce((total:number, currentItem:any) => total + currentItem.price * currentItem.qty, 0)
  return (
    <>
      {deleteDialogOpen.id !== null && (
        <DialogModal
          message={`Do you really want to Cancel ${order?.user?.name}'s Order`}
          btntext="Cancel"
          isPending={isPending}
          pendingText="Cancelling..."
          onConfirm={() =>
            updateOrder({
              _id: deleteDialogOpen.id,
              status: deleteDialogOpen.st,
            })
          }
          onCancel={() =>
            setDeleteDialogOpen((prev) => ({ ...prev, id: null, st: null }))
          }
        />
      )}

      <tr
        key={order._id}
        className={`border-b w-full  h-auto ${
          order?.currentStatus?.status == "Completed"
            ? "!bg-green-50"
            : order?.currentStatus?.status == "Cancelled"
            ? "bg-red-100"
            : " hover:bg-gray-50"
        }`}
      >
        <td className="p-2 w-[10%]">
          <Avatar name={order?.user?.name} picture={order?.user?.picture || ''} />
        </td>
        <td className="p-2 w-[20%]">
          {order?.user?.name}
          <br />
          <span className="text-zinc-500">{order?.user?.email}</span>
        </td>

        
        <td className="p-2 w-[25%]">
          {order.items.map((item: Item) => (
            <div key={item._id} className="w-full h-full">
              <h1>
                {item.name}{" "}
                <span className="text-zinc-600">
                  {item.qty}x ({item.size})
                </span>
              </h1>
            </div>
            
          ))}
          <div className="text-nowrap">Total Payment: <span className="font-semibold">Rs {price}</span></div>
        </td>
        <td className="p-2 w-[5%]">
          {formatDateTime(order.createdAt).split(',')[0]}
        </td>
        <td className="p-4 w-[15%]">
          {order.message==""?'-':order.message}
        </td>
        <td className="p-4 w-[10%]">
          <div className="border rounded-lg">
            <select
              onChange={(e) =>
                handleChange({ _id: order._id, status: e.target.value })
              }
              className="bg-transparent  px-2 rounded-lg py-2 border-none outline-none text-gray-900"
            >
              {filterOptions.map((option, index) => (
                <option
                  key={option.value}
                  value={option.value}
                  disabled={
                    (option.value !== "Cancelled" &&
                      index !== currentStatusIndex + 1) ||
                    (["Ready for Pickup", "Completed"].includes(
                      order?.currentStatus?.status 
                    ) &&
                      option.value === "Cancelled")
                  }
                  selected={order?.currentStatus?.status === option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </td>
        <td className="p-2 w-[10%]">
          <div className="flex gap-x-2 justify-start items-center">
            <Icon
              icon={
                order?.paymentMethod === "cash"
                  ? "ph:money"
                  : "duo-icons:credit-card"
              }
              className="text-primary-600 text-xl lg:text-2xl"
            />
            <span className="text-sm md:text-md lg:text-lg capitalize">
              {order?.paymentMethod}
            </span>
          </div>
        </td>
      </tr>
    </>
  );
};

export default OrderCard;
