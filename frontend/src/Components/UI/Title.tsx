
const Title = ({className, children}:any) => {
  return (
    <h1 className={`text-2xl md:text-[2rem] lg:text-[3rem] leading-[1] ${className}`}>{children}</h1>
  )
}

export default Title