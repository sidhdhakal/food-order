import { Icon } from "@iconify/react";
import { useQuery } from '@tanstack/react-query';
import CheckLogin from '../Utils/CheckLogin';

const Sidebar = ({ activeComponent, setIsActiveComponent }: any) => {


  return (
    <div className='bg-zinc-50 w-[16rem] h-full   flex flex-col justify-between text-zinc-900 border-r border-zinc-300 text-lg z-[10]'>
      <div className='h-[6rem] flex justify-center items-center'>
        <h1 className='font-bold text-[2.6rem] text-primary-600 leading-[1]'>Food<span className='text-primary-300'>Mate</span></h1>
      </div>

      <div className=' flex flex-1 justify-start items-center flex-col gap-y-2 p-4'>

        {menuItems.map((item) => (
          <div key={item.id} onClick={() => setIsActiveComponent(item.name)} className={`px-4 py-3 cursor-pointer flex  justify- items-center gap-x-2 w-full rounded-2xl ${activeComponent === item.name ? 'text-zinc-900 bg-primary-300' : 'text-black'}`}>
            <Icon icon={item.icon} className={` 
                  
                     text-[1.8rem]`} />
            {item.name}
          </div>
        ))}
        <div className='border-t border-zinc-400 pt-2 w-full'>
          <div onClick={() => setIsActiveComponent('Notifications')} className={`px-4 py-3 cursor-pointer flex  justify- items-center gap-x-2 w-full rounded-2xl ${activeComponent === 'Notifications' ? 'text-zinc-900 bg-primary-300' : 'text-black'}`}>
            <Icon icon='solar:notification-unread-bold-duotone' className={` 
                     text-[1.8rem]`} />
            Notifications
          </div>
        </div>
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
console.log(user?.picture)
  return (
    <>
      {user ? (
        <div className='w-[90%] mb-4 flex flex-col gap-y-2 justify-between items-center p-2 bg-zinc-200 aspect-square self-center rounded-[24px]'>
          <div className='flex flex-col justify-center items-center p-2'>

            <img src={user?.picture} alt="" className='w-[4rem] object-cover rounded-[24px] aspect-square' />
            <h1 className='text-xl font-semibold mt-2'> {user.name}</h1>
            <h3 className='text-zinc-600 text-lg'>{user.email}</h3>
          </div>
          <button onClick={logOut} className='py-3 text-center bg-red-500 hover:bg-red-600 w-full rounded-[20px] gap-x-2 text-white flex justify-center items-center'>
            <Icon icon="solar:logout-2-bold-duotone" className='text-[1.6rem]' />
            Log out</button>

        </div>
      ) : (
        // <div className='w-[90%] mb-4 flex flex-col gap-y-2 justify-between items-center bg-zinc-300  self-center rounded-[32px]'>
        //   <a href='/login' onClick={logOut} className='py-3 text-center bg-red-500 hover:bg-red-600 w-full rounded-2xl gap-x-2 text-white flex justify-center items-center'>
        //     <Icon icon="solar:login-2-bold-duotone" className='text-[1.6rem]' />
        //     Log In</a>
        // </div>
        <div className='w-[90%] mb-4 flex flex-col gap-y-2 justify-between items-center bg-zinc-300  self-center rounded-[32px]'>
          <a href='/login' onClick={logOut} className='py-3 text-center bg-red-500 hover:bg-red-600 w-full rounded-2xl gap-x-2 text-white flex justify-center items-center'>
            <Icon icon="solar:login-2-bold-duotone" className='text-[1.6rem]' />
            Log In</a>
        </div>
      )}
    </>
  )
}

const menuItems = [
  {
    name: "Homepage",
    id: 1,
    icon: "si:home-duotone",
    activeIcon: "solar:home-2-bold", // bold version
    link: "/homepage"
  },

  {
    name: "Menu",
    id: 2,
    icon: "ph:hamburger-duotone",
    activeIcon: "material-symbols-light:menu-book", // bold version
    link: "/menu"
  },
  {
    name: "Orders",
    id: 3,
    icon: "lets-icons:order-duotone",
    activeIcon: "material-symbols-light:order-approve-rounded", // bold version
    link: "/orders"
  },
  // {
  //   name: "Favorites",
  //   id: 7,
  //   icon: "fa:star",
  //   activeIcon: "fa:star-bold", // bold version
  //   link: "/favorites"
  // },
  {
    name: "Feedback",
    id: 4,
    icon: "ic:twotone-feedback",
    activeIcon: "fluent:person-feedback-32-filled", // bold version
    link: "/feedback"
  },
  {
    name: "Order History",
    id: 5,
    icon: "ic:twotone-history-edu",
    activeIcon: "material-symbols:history-2", // bold version
    link: "/order-history"
  }
];
