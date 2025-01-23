import { useState } from 'react'
import Homepage from './Homepage'
import Menupage from './Menupage'
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
            return <OrdersPage />
        case 'Menu':
          return <Menupage />
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
    <div className=' h-full w-full flex '>
      <div className=' w-[8rem] 4xl:w-[16rem]'>

         <Sidebar activeComponent={activeComponent} setIsActiveComponent={setIsActiveComponent} />
      </div>
         <div className='flex-1 h-screen flex flex-col'>
        <Navbar activeComponent={activeComponent} />
        <div className='bg-zinc-100 w-full pt-[5rem] flex'>

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