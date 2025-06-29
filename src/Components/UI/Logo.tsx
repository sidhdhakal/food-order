
const Logo = ({className}:{className?:string}) => {
  return (
    <div className="h-fit flex justify-center items-center ">
    <h1  className={`font-bold text-[2rem] select-none cursor-pointer 4xl:text-[2.6rem] text-zinc-800 leading-[1] flex-row ${className}`}>
      Food
      <span className="text-primary-400">Mate</span>
    </h1>
  </div>
  )
}

export default Logo
