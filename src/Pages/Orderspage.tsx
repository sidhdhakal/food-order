import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import currentOrder from '../Data/CurrentOrder.json'
import orders from '../Data/PreviousOrders.json'
import OrderCard from "../Components/UI/OrderCard";
import CurrentOrderCard from "../Components/UI/CurrentOrderCard";
import Title from "../Components/UI/Title";
import OrderListItem from "../Components/UI/OrderListItem";
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



  return (

    <div className="flex flex-col   home gap-y-8 min-h-[calc(100vh-5rem)] text-black rounded-[24px] flex-1 justify-start items-start p-4 bg-transparent overflow-y-auto">
      <div className="w-full">
        <Title>Current Order Status</Title>
        <CurrentOrderCard currentOrder={currentOrder}/>
      </div>

      <div className="w-full">
          <Title >Today's Orders</Title>
     
        <div className="grid grid-cols-1 lg:grid-cols-2 4xl:grid-cols-3 gap-4 mt-4">
          {todaysOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </div>

      <div className="w-full">
      <div className="flex justify-between items-center">
          <Title >Previous Orders</Title>
          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl shadow-sm">
            <Icon icon="icon-park-twotone:filter" className="text-gray-500 text-2xl" />
            <select 
              className="bg-transparent border-none outline-none text-gray-600 "
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
      <div className="bg-transparent h-[2rem] md:hidden"/>
    </div>
  );
};

export default OrdersPage;
