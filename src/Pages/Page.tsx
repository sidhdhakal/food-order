import { useState } from 'react'
import Homepage from './Homepage'
import Order from './Order'
import Menupage from './Menupage'
import OrderHistory from './OrderHistory'
import Sidebar from '../Components/Sidebar'
import Feedbacks from './Feedbacks'
import Navbar from '../Components/Navbar'
import RightSidebar from '../Components/RightSidebar'

const Page = () => {
    const [activeComponent, setIsActiveComponent] = useState('Homepage')

    const renderActiveComponent = () => {
      switch (activeComponent) {
        case 'Homepage':
          return <Homepage />
        case 'Orders':
          return <Order />
        case 'Menu':
          return <Menupage />
        case 'Order History':
          return <OrderHistory />
        case 'Feedback':
          return <Feedbacks />
        default:
          return <Homepage />
      }
    }
  return (
    <div>
    <div className=' h-screen flex '>
         <Sidebar activeComponent={activeComponent} setIsActiveComponent={setIsActiveComponent} />
         <div className='w-[calc(100vw-16rem)] h-screen flex flex-col'>
        <Navbar activeComponent={activeComponent} />
        <div className='bg-zinc-200 w-full h-[calc(100vh-5rem)] flex  flex-1 gap-x-4 p-4'>

         {renderActiveComponent()} 

         <RightSidebar />
        </div>
         </div>

    </div>
    </div>

  )
}

export default Page