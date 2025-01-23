import { Icon } from '@iconify/react/dist/iconify.js'
import Navs from '../Data/Navs.json'
const MobileSidebar = ({ activeComponent, setIsActiveComponent }: any) => {
  return (
    <div className='fixed bottom-0 px-4 left-0 w-full md:hidden h-[4rem] bg-zinc-50 z-[100] flex justify-between items-center'>
        {Navs.map((nav:any)=>(
            <div key={nav.id} onClick={() => setIsActiveComponent(nav.name)} className={`h-full flex flex-col justify-center items-center aspect-square text-[0.9rem] sm:text-xs leading-[1.1] md:text-sm lg:text-[0.8vw] ${activeComponent==nav.name?'text-orange-400':'text-zinc-800'}`}>
                <Icon icon={nav.icon} className={` text-xl ${activeComponent==nav.name?'text-orange-400':'text-zinc-800'}`}/>
                {nav.name}
            </div>
        ))}
    </div>
  )
}

export default MobileSidebar