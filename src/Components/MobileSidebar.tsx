import { Icon } from '@iconify/react/dist/iconify.js'
import Navs from '../Data/Navs.json'
const MobileSidebar = ({ setIsSidebarOpen,activeComponent, setIsActiveComponent }: any) => {
  return (
    <div className='fixed bottom-0 px-6 left-0 w-full md:hidden h-[3.5rem] mobilenav bg-white/50 backdrop-blur-lg   z-[100] flex justify-between items-center '>
        {Navs.map((nav:any)=>(
            <div key={nav.id} onClick={() => {setIsActiveComponent(nav.name); setIsSidebarOpen(false)}} className={`h-full cursor-pointer flex flex-col justify-center items-center group  hover:text-orange-400 aspect-square text-[0.9rem] sm:text-xs leading-[1.1] md:text-sm lg:text-[0.8vw]   ${activeComponent==nav.name?'text-orange-400 ':'text-zinc-800'}`}>
                <Icon icon={nav.icon} className={` group-hover:text-orange-400 text-xl ${activeComponent==nav.name?'text-orange-400':'text-zinc-800'}`}/>
                {nav.name}
            </div>
        ))}
    </div>
  )
}

export default MobileSidebar