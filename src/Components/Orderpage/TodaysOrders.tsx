import { useGetTodaysOrders } from '../../Queries/order/useGetTodaysOrders'
import Title from '../UI/Title'
import OrderCard from './OrderCard'

const TodaysOrders = ({setOrder, setfeedbackOpen}:any) => {
    // const {data}=useGetTodaysOrder()
    const {data}=useGetTodaysOrders()
    console.log(data)
    

    if (data?.doc.length === 0)
        return (
          <div className="py-5 text-xl text-zinc-400">
            There are no Orders Today{" "}
          </div>
        );
  return (
    <div className="w-full">
    <Title >Today's Orders</Title>

  <div className="grid grid-cols-1 lg:grid-cols-2 4xl:grid-cols-3 gap-4 mt-4">
    {data?.doc.map((order:any) => (
      <OrderCard key={order.id} order={order} setOrder={setOrder} setfeedbackOpen={setfeedbackOpen}/>
    ))}
  </div>
</div>
  )
}

export default TodaysOrders