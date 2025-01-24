import { Icon } from "@iconify/react";
import { useQuery } from '@tanstack/react-query';
import CheckLogin from '../CustomerFacing/Utils/CheckLogin';
import menuItems from '../Data/Navs.json'
import UserDetailDiv from "./UI/UserDetailDiv";
const Sidebar = ({ activeComponent, setIsActiveComponent }: any) => {


  return (
    <div className='bg-zinc-50 flex  w-[8rem] 4xl:w-[16rem] h-full fixed top-0  flex-col justify-between text-zinc-900 border-r overflow-y-auto home border-zinc-300 text-lg z-[10]'>
      <div className='h-[6rem] flex justify-center items-center'>
        <h1 className='font-bold text-[1.8rem] pt-4 4xl:text-[2.6rem] text-primary-600 leading-[1] flex flex-col 4xl:flex-row'>Food
          <span className='text-primary-300'>Mate</span></h1>
      </div>

      <div className=' flex flex-1  justify-start items-center flex-col gap-y-2  p-4'>

        {menuItems.map((item) => (
          <div key={item.id} onClick={() => setIsActiveComponent(item.name)} className={`4xl:px-4 py-3  cursor-pointer flex flex-col 4xl:flex-row 4xl:justify-start justify-center gap-y-1 items-center gap-x-2 w-full rounded-2xl text-[1rem] font-semibold aspect-auto
           ${activeComponent === item.name ? 'text-zinc-900 bg-primary-300/90' : 'text-black'}`}>
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

  const logOut = () => {
    document.cookie = `user=''; path=/; expires=${new Date(Date.now() - 1000).toUTCString()}`;
    window.location.reload();
  };
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

