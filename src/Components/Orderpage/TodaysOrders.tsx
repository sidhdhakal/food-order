import { useGetTodaysOrders } from '../../Queries/order/useGetTodaysOrders'
import IsError from '../UI/IsError'
import Loading from '../UI/Loading'
import Title from '../UI/Title'
import OrderCard from './OrderCard'

const TodaysOrders = ({ setOrder, setfeedbackOpen }: {setOrder:any, setfeedbackOpen:(value:boolean)=>void}) => {
  const { data, isLoading, isError } = useGetTodaysOrders()

  if (data?.doc?.length === 0)
    return (
      <div className="py-5 text-xl text-zinc-400">
        There are no Orders Today{" "}
      </div>
    );
  return (
    <div className="w-full">
      <Title>Today's Orders</Title>

      <div className="mt-4">
        {isLoading &&
          <Loading>Loading...</Loading>
        }
        {isError &&
          <IsError>Cannot get Todays orders</IsError>
        }
        {!isLoading && !isError &&
          <div key={1} className="grid grid-cols-1 lg:grid-cols-2 4xl:grid-cols-3 gap-4 mt-4">
            {!data?.doc || data?.doc.length === 0
              ?
              <div className="py-5 text-xl text-zinc-400">There are no Todays Orders</div>
              :
              data?.doc?.map((order: any) => (
                <div key={order._id}>
                
                  <OrderCard order={order} setOrder={setOrder} setfeedbackOpen={setfeedbackOpen} />
                </div>
              ))}
          </div>
        }
      </div>
    </div>
  )
}

export default TodaysOrders