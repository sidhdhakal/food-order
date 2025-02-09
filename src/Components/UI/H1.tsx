
const H1 = ({children, className}:{children:React.ReactNode, className?:string}) => {
  return (
    <h1 className={`xs:text-base flex gap-x-1 sm:text-lg md:text-xl lg:text-[1.6rem] 4xl:text-[1.2vw] font-semibold ${className}`}>
    {children}
  </h1>
  )
}

export default H1