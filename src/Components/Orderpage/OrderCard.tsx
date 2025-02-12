import { Icon } from "@iconify/react/dist/iconify.js";
import { useMemo } from 'react';
import { Item } from "../../Utils/types";




const OrderCard = ({ order, setOrder, setfeedbackOpen }: {order:any, setOrder:any, setfeedbackOpen:(value:boolean)=>void}) => {
  const total = useMemo(() => 
    order.items.reduce((acc: number, item: any) => acc + item.price * item.qty, 0), 
    [order.items]
  );

  const statusColors: { [key: string]: string } = {
    Completed: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
    Pending: "bg-yellow-100 text-yellow-800",
  };

  const statusClass = statusColors[order?.currentStatus?.status] || "bg-yellow-100 text-yellow-800";
  
  const paymentIcons: { [key: string]: string } = {
    Cash: "ph:money",
    CreditCard: "duo-icons:credit-card",
  };

  const icon = paymentIcons[order.paymentMethod] || "default-icon";
  
  return (
    <div className="w-full bg-white rounded-xl p-4 flex flex-col justify-between shadow-sm h-full">
      <div className="flex-grow">
        <div className="flex flex-row items-start justify-between space-y-0 pb-2">
          <div className="flex gap-x-2">
            <h1 className="text-xl font-semibold">#{order._id.slice(-5)}</h1>
    {!order.feedback && order.currentStatus.status=='Completed' &&
                <button
                className="text-zinc-500 text-left"
                onClick={() => {
                  setfeedbackOpen(true);
                  setOrder(order);
                }}
              >
                Give a Feedback?
              </button>}
          </div>
          <div className={`px-3 py-1 rounded-full text-nowrap text-sm ${statusClass}`}>
            {order.currentStatus?.status}
          </div>
        </div>

        <div className="text-sm text-gray-500">
          {new Date(order.createdAt).toLocaleDateString()}{" "}
          {new Date(order.createdAt).toLocaleTimeString()}
        </div>

        <div className="mt-4 space-y-2">
          {order.items.map((item: Item, index: number) => (
            <div key={index} className="flex justify-between items-center">
              <div>
                <span className="font-medium">{item.qty}x</span> {item.name}
                <span className="text-sm text-gray-500 ml-2">({item.size})</span>
              </div>
              <div>Rs {item.price.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t pt-2 mt-2 flex justify-between items-center">
        <div className="text-sm">Payment Method</div>
        <div className="flex items-center gap-1">
          <Icon icon={icon} className="text-primary-600" />
          {order.paymentMethod}
        </div>
      </div>

      <div className="flex justify-between items-center font-bold mt-2">
        <div>Total</div>
        <div>Rs {total.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default OrderCard;
