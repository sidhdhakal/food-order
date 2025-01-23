import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import currentOrder from '../Data/CurrentOrder.json'
import orders from '../Data/PreviousOrders.json'
import OrderCard from "../Components/UI/OrderCard";
import CurrentOrderCard from "../Components/UI/CurrentOrderCard";
const filterOptions = [
  { value: 'orderPlaced', label: 'Order Placed', icon: 'ph:clock' },
  { value: 'orderConfirmed', label: 'Order Confirmed', icon: 'ph:check-circle' },
  { value: 'Preparing', label: 'Preparing', icon: 'ph:cogs' },
  { value: 'readyToPickup', label: 'Ready to Pickup', icon: 'ph:shopping-bag' },
  { value: 'completed', label: 'Completed', icon: 'ph:thumbs-up' },
];


const OrdersPage = () => {
  // const [selectedStatus, setSelectedStatus] = useState("");
  const [filterOption, setfilterOption] = useState('All Orders');


  const todaysOrders = orders.filter(
    (order) => order.date <= new Date().toISOString().split("T")[0]
  );

  const previousOrders = orders.filter(
    (order) => order.date !== new Date().toISOString().split("T")[0]
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

    <div className="flex flex-col   home gap-y-8  text-black rounded-[24px] flex-1 justify-start items-start p-4 bg-transparent overflow-y-auto">
      <div className="w-full">
        <h1 className="text-[3rem] leading-[1] mb-4">Current Order Status</h1>
        <CurrentOrderCard currentOrder={currentOrder}/>
      </div>

      <div className="w-full">
          <h1 className="text-[3rem] leading-[1]">Today's Orders</h1>
     
        <div className="grid grid-cols-1 lg:grid-cols-2 4xl:grid-cols-3 gap-4 mt-4">
          {todaysOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </div>

      <div className="w-full">
      <div className="flex justify-between items-center">
          <h1 className="text-[3rem] leading-[1]">Previous Orders</h1>
          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl shadow-sm">
            <Icon icon="icon-park-twotone:filter" className="text-gray-500 text-2xl" />
            <select 
              className="bg-transparent border-none outline-none text-gray-600 pr-8"
              value={filterOption}
              onChange={(e) => setfilterOption(e.target.value)}
            >
              {filterOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
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
