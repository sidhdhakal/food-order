import { Icon } from "@iconify/react/dist/iconify.js"


const DialogLayout = ({title, onClose,isOpen, children}:{title:string, onClose: () => void, children:React.ReactNode, isOpen:boolean}) => {


  return (
    <div onClick={onClose} className={`fixed top-0 right-0 z-[50] flex justify-end h-full backdrop-blur-sm pt-[5rem] min-w-[25rem] w-[30%] transition-all duration-300 dialog ${isOpen?'translate-x-0 opacity-1':'translate-x-full opacity-0'}`}>
        <div onClick={(e:any)=>e.stopPropagation()} className={`h-full border-l border-zinc-300 shadow-lg w-full bg-white p-4 relative overflow-y-auto dialog`}>
        <Icon 
          icon='maki:cross' 
          className="p-2 bg-zinc-100 rounded-full absolute top-4 right-4 cursor-pointer text-3xl text-black"
          onClick={onClose}
        />

        <h1 className="text-[2rem] font-semibold">{title}</h1>
        {children}
     
        </div>
    </div>
  )
}

export default DialogLayout