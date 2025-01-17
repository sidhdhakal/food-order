
import { Icon } from "@iconify/react";

const Navbar = ({activeComponent}:any) => {
    return (
        <div className='w-full h-[5rem] shadow-md bg-zinc-50 flex justify-center items-center text-black z-[5]'>
            <div className='w-full px-8 flex justify-between items-center'>

                <div className='h-full flex justify-center items-center gap-x-4' >
                        <Icon icon='mynaui:arrow-long-left-solid' className='text-[3rem] px-3 rounded-2xl bg-zinc-200/70 hover:bg-zinc-300'/>

                        <p>{activeComponent} </p>
                </div>

                <div className='w-[25rem] relative flex  justify-center items-center'>
                    <input type='text' placeholder='Search Food' className='px-6 py-3 w-full placeholder:text-zinc-600 bg-zinc-200/50 border border-zinc-300 rounded-2xl text-black active:outline-none focus:outline-none'/>
                    <button className='ml-2 bg-primary-300 hover:bg-primary-400 transition-all duration-200 px-6 rounded-2xl text-black py-2 h-full absolute right-0 flex justify-center items-center gap-x-1 '>
                        <Icon icon='flowbite:search-outline' className='text-[1.5rem]' />
                        Search</button>

                </div>
                {/* <UserDetail /> */}
            </div>
        </div>
    )
}

export default Navbar



