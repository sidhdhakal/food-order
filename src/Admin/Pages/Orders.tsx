import { useGetAllOrders } from "../../Queries/order/useGetAllOrders"
import OrderCard from "../AdminComponents/OrderCard"

const Orders = () => {
  const {data, isLoading, isError}=useGetAllOrders()
  return (
    <div className="w-full relative">



<div className="w-full h-auto productlist  rounded-xl overflow-hidden bg-white p-6">
        <div className="pb-4">
          <h1 className="text-[1.5rem] font-semibold">
            Orders
          </h1>
        </div>
        
        <table className="w-full border-collapse">
          <thead className="bg-zinc-100">
            <tr>
              <th className="p-4 pl-2 text-left w-[10%]"></th>
              <th className="p-4 pl-2 text-left w-[25%]">User</th>
              <th className="p-4 pl-2 text-left w-[25%]">Items</th>
              <th className="p-4 pl-2 text-left w-[10%]">Message</th>
              <th className="p-4 pl-2 text-left w-[10%]">Status</th>
              <th className="p-4 pl-2 text-left w-[20%]">Payment Method</th>
            </tr>
          </thead>
          <tbody>
          {isLoading && 
            <div className="w-full flex justify-center items-center">Loading...</div>
            }
            {isError && 
            <div className="w-full flex justify-center items-center">Failed to Fetch Foods</div>
            }
            {!isLoading && !isError && data?.doc.map((order:any) => (
              <OrderCard order={order}/>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Orders
