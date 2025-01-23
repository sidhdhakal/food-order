
const H1 = ({children}:{children:React.ReactNode}) => {
  return (
    <h1 className="xs:text-base sm:text-lg md:text-xl lg:text-[1.6rem] 4xl:text-[1.2vw] font-semibold">
    {children}
  </h1>
  )
}

export default H1