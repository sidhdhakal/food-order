import { Icon } from "@iconify/react/dist/iconify.js";

  const OrderCard = ({ order }: any) => (
    <div className="w-full bg-white rounded-xl p-4 shadow-sm">
      <div className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h1 className="text-xl font-bold">{order.id}</h1>
        <div
          className={`px-3 py-1 rounded-full text-sm ${
            order.status === "Completed"
              ? "bg-green-100 text-green-800"
              : order.status === "Pending"
              ? "bg-yellow-100 text-yellow-800"
              : order.status === "Cancelled"
              ? "bg-red-100 text-red-800"
              : "bg-blue-100 text-blue-800"
          }`}
        >
          {order.status}
        </div>
      </div>
      <div>
        <div className="text-sm text-gray-500">{order.date}</div>
        <div className="mt-4 space-y-2">
          {order.items.map((item: any, index: number) => (
            <div key={index} className="flex justify-between items-center">
              <div>
                <span className="font-medium">{item.quantity}x</span>{" "}
                {item.name}
                <span className="text-sm text-gray-500 ml-2">
                  ({item.size})
                </span>
              </div>
              <div>${item.price.toFixed(2)}</div>
            </div>
          ))}
          <div className="border-t pt-2 mt-2 flex justify-between items-center">
            <div className="text-sm">Payment Method</div>
            <div className="flex items-center gap-1">
              <Icon
                icon={
                  order.payment === "Cash" ? "ph:money" : "duo-icons:credit-card"
                }
                className="text-primary-600"
              />
              {order.payment}
            </div>
          </div>
          <div className="flex justify-between items-center font-bold">
            <div>Total</div>
            <div>${order.total.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
  );
  export default OrderCard