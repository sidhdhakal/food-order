
const LogoSidebar = ({className}:{className?:string}) => {
  return (
    <div className='h-[5rem] flex justify-center items-center'>
        <h1 className={`font-bold text-[1.8rem] pt-4 4xl:text-[2.6rem] text-zinc-800 leading-[1] flex flex-col 4xl:flex-row ${className}`}>Food
          <span className='text-primary-400'>Mate</span></h1>
      </div>
  )
}

export default LogoSidebar
