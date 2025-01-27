import React from 'react'

const Button = ({onClick,type, disabled, className, children}:{onClick?:()=>void, disabled?:boolean, className?:string, children:React.ReactNode, type?:any}) => {
  return (
    <button
    type={type}
    disabled={disabled}
    onClick={onClick}
    className={`w-full transition-colors duration-200 px-4 py-2 disabled:bg-orange-400 bg-orange-500 self-center text-white rounded-md hover:bg-orange-600  ${className}`}
      >
        {children}
  </button>
  )
}

export default Button