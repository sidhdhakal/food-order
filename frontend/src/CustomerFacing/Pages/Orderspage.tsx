import { useState } from "react";
import CurrentOrderCard from "../../Components/Orderpage/CurrentOrderCard";
import Title from "../../Components/UI/Title";
import FeedbackForm from "../../Components/Feedbackpage/FeedbackForm";
import TodaysOrders from "../../Components/Orderpage/TodaysOrders";
import PreviousOrders from "../../Components/Orderpage/PreviousOrders";
import CheckLogin from "../../Utils/CheckLogin";
import IsError from "../../Components/UI/IsError";
import { useQuery } from "@tanstack/react-query";


const OrdersPage =  () => {
  // const [selectedStatus, setSelectedStatus] = useState("");

  const { data: user } = useQuery({
    queryKey: ['User'],
    queryFn: CheckLogin
  })

const [feedbackOpen, setfeedbackOpen]=useState(false)
const [order, setOrder]=useState(null)


  return (

    <div className="flex flex-col   home gap-y-8 min-h-[calc(100vh-5rem)] text-black rounded-[24px] flex-1 justify-start items-start p-4 bg-transparent overflow-y-auto">

    {feedbackOpen && 
      <FeedbackForm order={order} setfeedbackOpen={setfeedbackOpen}/>
    }
  {!user?
  <IsError>Please Login to see your orders</IsError>:
    <>
      <div className="w-full">
        <Title>Current Order Status</Title>
        <CurrentOrderCard/>
      </div>

    <TodaysOrders setOrder={setOrder} setfeedbackOpen={setfeedbackOpen}/>

    <PreviousOrders />
      
      <div className="bg-transparent h-[2rem] md:hidden"/>
    </>
}
    </div>
  );
};

export default OrdersPage;
