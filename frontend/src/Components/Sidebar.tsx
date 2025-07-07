import { Icon } from "@iconify/react";
import { useQuery } from '@tanstack/react-query';
import CheckLogin from '../Utils/CheckLogin';
import menuItems from '../Data/Navs.json'
import UserDetailDiv from "./UI/UserDetailDiv";
import LogoSidebar from "./UI/LogoSidebar";
import { logOut } from "../Utils/logout";
const Sidebar = ({ activeComponent, setIsActiveComponent }: any) => {


  return (
    <div className='bg-zinc-50 flex  w-[8rem] 4xl:w-[16rem] h-full fixed top-0  flex-col justify-between text-zinc-900 border-r overflow-y-auto home border-zinc-300 text-lg z-[10]'>
      <LogoSidebar />

      <div className=' flex flex-1  justify-start items-center flex-col gap-y-2  p-4'>

        {menuItems.map((item) => (
          <div key={item.id} onClick={() => setIsActiveComponent(item.name)} className={`4xl:px-4 py-3  cursor-pointer flex flex-col 4xl:flex-row 4xl:justify-start justify-center gap-y-1 items-center gap-x-2 w-full rounded-2xl text-[1rem] font-semibold aspect-auto
           ${activeComponent === item.name ? 'text-white bg-gradient-to-r from-primary-500 to-primary-300 shadow-lg' : 'text-black'}`}>
            <Icon icon={item.icon} className={`text-2xl lg:text-3xl 4xl:text-[1.8rem]`} />
            {item.name}
          </div>
        ))}
        {/* <div className='border-t border-zinc-400 pt-2 w-full'>
          <div onClick={() => setIsActiveComponent('Notifications')} className={`px-4 py-3 cursor-pointer flex  justify- items-center gap-x-2 w-full rounded-2xl ${activeComponent === 'Notifications' ? 'text-zinc-900 bg-primary-300' : 'text-black'}`}>
            <Icon icon='solar:notification-unread-bold-duotone' className={` 
                     text-[1.8rem]`} />
            Notifications
          </div>
        </div> */}
      </div>
      <UserDetail />
    </div>
  )
}

export default Sidebar

const UserDetail = () => {
  const { data: user } = useQuery({
    queryKey: ['User'],
    queryFn: CheckLogin
  })

  return (
    <>
      {user ? (
        <div className=' w-[90%] mb-4 flex flex-col gap-y-2 justify-between items-center p-2 bg-zinc-200/70 aspect-square self-center rounded-[24px]'>
         <UserDetailDiv user={user}/>

        </div>
      ) : (
        <div className='w-[90%] mb-4 flex flex-col gap-y-2 justify-between items-center bg-zinc-300  self-center rounded-[24px]'>
          <a href='/login' onClick={logOut} className='py-3 text-center bg-red-500 hover:bg-red-600 w-full rounded-2xl gap-x-2 text-white flex justify-center items-center'>
            <Icon icon="solar:login-2-bold-duotone" className='text-[1.6rem]' />
            Log In</a>
        </div>
      )}
    </>
  )
}

