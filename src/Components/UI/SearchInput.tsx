import { Icon } from '@iconify/react/dist/iconify.js'

const SearchInput = ({className='hidden md:flex', onSearch, placeholder='Search Food', value, onChange}:{className?:string, value?:string, onChange?:(e:any)=>void, placeholder?:string, onSearch?:()=>void}) => {
  return (
    <div className={`w-auto md:w-[25rem] relative    justify-center items-center ${className}`}>
    <input
    value={value}
    onChange={onChange}
      type="text"
      placeholder={placeholder}
      className=" px-3 md:px-6 py-3 w-full block placeholder:text-zinc-600 bg-zinc-200/50 border border-zinc-300 rounded-2xl text-black active:outline-none focus:outline-none"
    />
    <button onClick={onSearch} className="ml-2 bg-primary-300 flex hover:bg-primary-400 transition-all duration-200 px-4 md:px-6 rounded-2xl text-black py-2 h-full absolute right-0  justify-center items-center gap-x-1 ">
      <Icon
        icon="flowbite:search-outline"
        className="text-[1.2rem] md:text-[1.5rem]"
      />
      <span className="hidden sm:block">Search</span>
    </button>
    </div>
  )
}

export default SearchInput
