import { Icon } from "@iconify/react/dist/iconify.js";

const OrderCard = ({ order, setOrder, setFeedbackOpen }: any) => {

  const total=order.items.reduce((acc:number, item:any)=>{
    return acc+(item.price*item.qty)
  },0)
  return (
    <div className="w-full bg-white rounded-xl p-4 shadow-sm">
      <div className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex gap-x-2">
          <h1 className="text-xl font-semibold">#{order._id.slice(-5)}</h1>

          <button
            className="text-zinc-500 text-left"
            onClick={() => {
              setOrder(order);
              setFeedbackOpen(true);
            }}
          >
            Give a Feedback?
          </button>
        </div>
        <div
          className={`px-3 py-1 rounded-full text-nowrap text-sm ${
            order.currentStatus?.status === "Completed"
              ? "bg-green-100 text-green-800"
              : order.currentStatus?.status === "Cancelled"
              ? "bg-red-100 text-red-800"
              //  : order.currentStatus?.status === "Pending"
              // ? "bg-yellow-100 text-yellow-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {order.currentStatus?.status}
        </div>
      </div>

      <div>
        <div className="text-sm text-gray-500">
          {new Date(order.createdAt).toLocaleDateString()}{" "}
          {new Date(order.createdAt).toLocaleTimeString()}
        </div>
        <div className="mt-4 space-y-2">
          {order.items.map((item: any, index: number) => (
            <div key={index} className="flex justify-between items-center">
              <div>
                <span className="font-medium">{item.qty}x</span>{" "}
                {item.name}
                <span className="text-sm text-gray-500 ml-2">({item.size})</span>
              </div>
              <div>Rs {item.price.toFixed(2)}</div>
            </div>
          ))}
          <div className="border-t pt-2 mt-2 flex justify-between items-center">
            <div className="text-sm">Payment Method</div>
            <div className="flex items-center gap-1">
              <Icon
                icon={
                  order.paymentMethod === "Cash"
                    ? "ph:money"
                    : "duo-icons:credit-card"
                }
                className="text-primary-600"
              />
              {order.paymentMethod}
            </div>
          </div>

          <div className="flex justify-between items-center font-bold">
            <div>Total</div>
            <div>Rs {total.toFixed(2)}</div> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
