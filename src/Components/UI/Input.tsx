
const Input = ({type='text', placeholder, className, id, required, value, onChange}:{type:string, placeholder?:string, className?:string, id?:string, required?:boolean, value:any, onChange:(e:any)=>void}) => {
  return (
    <input
    type={type}
    placeholder={placeholder}
    id={id}
    value={value}
    onChange={onChange}
    required={required}
    className={`w-full bg-zinc-100 border border-zinc-300 rounded-md px-3 py-2 focus:outline-none ${className}`}
  />
  )
}

export default Input