import { useState } from 'react'
import Homepage from './Homepage'
import Menupage from './Menupage'
import OrderHistory from './OrderHistory'
import Sidebar from '../Components/Sidebar'
import Feedbacks from './Feedbacks'
import Navbar from '../Components/Navbar'
import RightSidebar from '../Components/RightSidebar'
import { CartProvider } from '../Utils/CartContext'
import OrdersPage from './Orderspage'
import Notifications from './Notifications'

const Page = () => {
    const [activeComponent, setIsActiveComponent] = useState('Home')

    const renderActiveComponent = () => {
      switch (activeComponent) {
        case 'Home':
          return <Homepage setIsActiveComponent={setIsActiveComponent}/>
        case 'Orders':
          // return <Order />
            return <OrdersPage />
        case 'Menu':
          return <Menupage />
        case 'Order History':
          return <OrderHistory />
        case 'Feedback':
          return <Feedbacks />
        case 'Notifications':
          return <Notifications />
        default:
          return <Homepage />
      }
    }
  return (
    <CartProvider>

    <div>
    <div className=' h-screen w-full flex '>
         <Sidebar activeComponent={activeComponent} setIsActiveComponent={setIsActiveComponent} />
         <div className='flex-1 h-screen flex flex-col'>
        <Navbar activeComponent={activeComponent} />
        <div className='bg-zinc-200 w-full h-[calc(100vh-5rem)] flex   gap-x-3 p-3'>

         {renderActiveComponent()} 

         <RightSidebar />
        </div>
         </div>

    </div>
    </div>
    </CartProvider>

  )
}

export default Page