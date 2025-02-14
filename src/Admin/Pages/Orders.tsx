import { useMemo, useState } from "react";
import { useGetAllOrders } from "../../Queries/order/useGetAllOrders"
import OrderCard from "../AdminComponents/OrderCard"
import SearchInput from "../../Components/UI/SearchInput";

const Orders = () => {
  const {data, isLoading, isError}=useGetAllOrders()
    const [searchValue, setSearchValue] = useState("");
  
    const filteredOrders = useMemo(() => {
      if (!data?.doc) return [];
  
      return data.doc.filter(
        (order: any) =>
          !searchValue ||
          order.user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          order.user.email.toLowerCase().includes(searchValue.toLowerCase())
      );
    }, [searchValue, data?.doc]);
  return (
    <div className="w-full relative">


<div className="auto w-full flex justify-between items-start">
        <SearchInput
          className="flex"
          placeholder="Search Orders "
          value={searchValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchValue(e.target.value)
          }
        />
      </div>
<div className="w-full h-auto productlist mt-7 rounded-xl overflow-hidden bg-white p-6">
        <div className="pb-4">
          <h1 className="text-[1.5rem] font-semibold">
            Orders
          </h1>
        </div>
        
        <table className="w-full border-collapse">
          <thead className="bg-zinc-100">
            <tr>
              <th className="p-4 pl-2 text-left w-[5%]"></th>
              <th className="p-4 pl-2 text-left w-[20%]">User</th>
              <th className="p-4 pl-2 text-left w-[20%]">Items</th>
              <th className="p-4 pl-2 text-left w-[10%]">Ordered On</th>
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
            {!isLoading && !isError && filteredOrders?.map((order:any) => (
              <OrderCard order={order}/>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Orders
