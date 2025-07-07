
const Input = ({type='text',checked,disabled,accept, step, min, placeholder, className, id, required, value, onChange}:{type:string, accept?:string, placeholder?:string, className?:string, id?:string, required?:boolean, value?:any, onChange?:(e:any)=>void, checked?:boolean, min?:any, step?:string, disabled?:boolean}) => {
  return (
    <input
    accept={accept}
    type={type}
    placeholder={placeholder}
    id={id}
    value={value}
    onChange={onChange}
    checked={checked}
    min={min}
    step={step}
    required={required}
    disabled={disabled}
    className={`w-full bg-zinc-100 border focus:outline-none focus:ring-primary-300 focus:border-primary-300 border-zinc-300 rounded-md px-3 py-2  ${className}`}
  />
  )
}

export default Input