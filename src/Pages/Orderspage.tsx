import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import CategoryCard from "../Components/UI/CategoryCard";

const OrdersPage = () => {
  const [selectedStatus, setSelectedStatus] = useState("");

  const orderStatuses = [
    { id: 1, name: "All Orders", icon: "icon-park-twotone:all-application" },
    { id: 2, name: "Pending", icon: "ic:twotone-pending-actions" },
    { id: 3, name: "Processing", icon: "ph:cooking-pot-duotone" },
    { id: 4, name: "Completed", icon: "icon-park-twotone:cooking" },
    { id: 5, name: "Cancelled", icon: "icon-park-twotone:close-one" },
  ];

  // Sample current order with status steps
  const currentOrder = {
    id: "ORD001",
    date: "2025-01-17 14:30",
    status: "Processing",
    estimatedTime: "15 mins",
    total: 45.99,
    payment: "Cash",
    items: [
      { name: "Chicken Burger", quantity: 2, price: 15.99, size: "Large" },
      { name: "French Fries", quantity: 1, price: 14.01, size: "Medium" },
    ],
    steps: [
      { name: "Order Placed", status: "completed", time: "14:30" },
      { name: "Order Confirmed", status: "completed", time: "14:32" },
      { name: "Preparation", status: "current", time: "14:35" },
      { name: "Ready for Pickup", status: "pending", time: "" },
      { name: "Completed", status: "pending", time: "" },
    ],
  };

  // Rest of the orders data
  const orders = [
    {
      id: "ORD002",
      date: "2025-01-17",
      status: "Completed",
      total: 32.5,
      payment: "eSewa",
      items: [
        { name: "Veggie Pizza", quantity: 1, price: 22.5, size: "Medium" },
        { name: "Coke", quantity: 2, price: 5.0, size: "Regular" },
      ],
    },
    {
      id: "ORD003",
      date: "2025-01-16",
      status: "Completed",
      total: 28.99,
      payment: "Cash",
      items: [
        { name: "Chicken Wings", quantity: 2, price: 18.99, size: "Large" },
        { name: "Sprite", quantity: 2, price: 5.0, size: "Regular" },
      ],
    },
  ];

  const todaysOrders = orders.filter(
    (order) => order.date === new Date().toISOString().split("T")[0]
  );

  const previousOrders = orders.filter(
    (order) => order.date !== new Date().toISOString().split("T")[0]
  );

  const filteredTodaysOrders =
    selectedStatus === "" || selectedStatus === "All Orders"
      ? todaysOrders
      : todaysOrders.filter((order) => order.status === selectedStatus);

  const CurrentOrderCard = () => (
    <div className="w-full bg-white rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold">{currentOrder.id}</h2>
            <div
              className={`px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800`}
            >
              {currentOrder.status}
            </div>
          </div>
          {/* <p className="text-sm text-gray-500 mt-1">Estimated Time: {currentOrder.estimatedTime}</p> */}
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">{currentOrder.date}</div>
          <div className="font-bold mt-1">${currentOrder.total.toFixed(2)}</div>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Order Items */}
        <div className="flex-1">
          <h3 className="font-medium mb-3">Order Items</h3>
          <div className="space-y-2">
            {currentOrder.items.map((item, index) => (
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
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Icon
              icon={
                currentOrder.payment === "Cash"
                  ? "ph:money"
                  : "simple-icons:esewa"
              }
              className="text-primary-600"
            />
            <span className="text-sm">{currentOrder.payment}</span>
          </div>
        </div>

        {/* Order Progress */}
        <div className="flex-1">
          <h3 className="font-medium mb-3">Order Progress</h3>
          <div className="space-y-2">
            {currentOrder.steps.map((step, index) => (
              <div key={index} className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    step.status === "completed"
                      ? "bg-green-500"
                      : step.status === "current"
                      ? "bg-yellow-500"
                      : "bg-gray-200"
                  }`}
                >
                  {step.status === "completed" && (
                    <Icon icon="ph:check-bold" className="text-white text-sm" />
                  )}
                  {step.status === "current" && (
                    <Icon icon="ph:clock" className="text-white text-sm" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span
                      className={`${
                        step.status === "completed"
                          ? "text-green-500"
                          : step.status === "current"
                          ? "text-yellow-500"
                          : "text-gray-400"
                      }`}
                    >
                      {step.name}
                    </span>
                    <span className="text-sm text-gray-500">{step.time}</span>
                  </div>
                  {index < currentOrder.steps.length - 1 && (
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
                  order.payment === "Cash" ? "ph:money" : "simple-icons:esewa"
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

  const OrderListItem = ({ order }: any) => (
    <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm hover:bg-gray-50">
      <div className="flex gap-4 items-center">
        <div className="font-medium">{order.id}</div>
        <div className="text-sm text-gray-500">
          {order.items
            .map((item: any) => `${item.quantity}x ${item.name} (${item.size})`)
            .join(", ")}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <Icon
            icon={order.payment === "Cash" ? "ph:money" : "simple-icons:esewa"}
            className="text-primary-600"
          />
          <span className="text-sm">{order.payment}</span>
        </div>
        <div className="font-medium">${order.total.toFixed(2)}</div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col  home gap-y-8 overflow-y-auto text-black rounded-[24px] flex-1 justify-start items-start p-4 bg-zinc-50 overflow-hidden">
      <div className="w-full">
        <h1 className="text-[3rem] leading-[1] mb-4">Current Order Status</h1>
        <CurrentOrderCard />
      </div>

      <div>
        <h1 className="text-[3rem] leading-[1]">Order History</h1>
        <div className="flex flex-wrap gap-4 mt-4">
          <div
            onClick={() => setSelectedStatus("")}
            className={`flex flex-col justify-center items-center p-2 aspect-square h-[7rem] rounded-2xl gap-y-2 border ${
              selectedStatus === ""
                ? "border-primary-500 bg-primary-100/50"
                : "border-transparent bg-zinc-100"
            }`}
          >
            <Icon
              icon="icon-park-twotone:all-application"
              className="text-[3rem] text-primary-600"
            />
            <h1 className="text-md">All Orders</h1>
          </div>
          {orderStatuses.slice(1).map((status) => (
            <CategoryCard
              key={status.id}
              category={status}
              selectedCategory={selectedStatus}
              setSelectedCategory={setSelectedStatus}
            />
          ))}
        </div>
      </div>

      <div className="w-full">
        <h1 className="text-[3rem] leading-[1]">Today's Orders</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 4xl:grid-cols-3 gap-4 mt-4">
          {filteredTodaysOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </div>

      <div className="w-full">
        <h1 className="text-[3rem] leading-[1]">Previous Orders</h1>
        <div className="flex flex-col gap-3 mt-4">
          {previousOrders.map((order) => (
            <OrderListItem key={order.id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
