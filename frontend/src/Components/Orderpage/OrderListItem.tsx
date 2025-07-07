import { Icon } from "@iconify/react/dist/iconify.js";
import formatDateTime from "../../Utils/formatDateTime";
import PayViaEsewa from "../../CustomerFacing/Features/PayViaEsewa";

const OrderListItem = ({ order }: any) => {
  const total = order.items.reduce((acc: number, item: any) => {
    return acc + item.price * item.qty;
  }, 0);
  return (
    <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm hover:bg-gray-50">
      <div className="flex flex-col md:flex-row gap-x-4 md:items-center">
        <div className="font-medium">
          #{order._id.slice(-5)}
          <span
            className="text-zinc-600 font-light ml-3
        "
          >
            {formatDateTime(order.createdAt)}
          </span>
        </div>
        <div className=""></div>
        <div className="text-sm text-gray-500">
          {order.items
            .map((item: any) => `${item.qty}x ${item.name} (${item.size})`)
            .join(", ")}
        </div>
        <div
          className={`px-3 py-1 text-nowrap w-fit rounded-full text-sm md:text-md lg:text-md ${
            order.currentStatus.status === "Cancelled"
              ? "bg-red-100 text-red-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {order?.currentStatus?.status}
        </div>
      </div>
      <div className="flex items-center gap-4 ml-2">
        {order.paymentMethod == "Not Paid" &&
          order?.currentStatus?.status != "Cancelled" && <PayViaEsewa id={order._id} totalPayment={Number(
            order?.items
              ?.reduce(
                (acc: number, item: any) =>
                  acc + item.price * item.qty,
                0
              )
              .toFixed(2)
          )} />}
        <div className="flex xl:flex-row flex-col ">
          <div className="flex items-center gap-2">
            <Icon
              icon={
                order.payment === "Cash" ? "ph:money" : "duo-icons:credit-card"
              }
              className="text-primary-600"
            />
            <span className="text-sm text-nowrap">{order.paymentMethod}</span>
          </div>
          <div
            className="font-medium text-nowrap ml-2
        "
          >
            Rs {total.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderListItem;
