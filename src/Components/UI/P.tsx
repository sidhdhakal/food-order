
const P = ({children}:{children:React.ReactNode}) => {
    return (
      <p className="text-[0.9rem] sm:text-xs leading-[1.1] md:text-sm lg:text-sm 4xl:text-sm text-zinc-600">
            {children}
          </p>
    )
  }
  
  export default P