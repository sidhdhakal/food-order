import React from 'react'

const Loading = ({children}:{children:React.ReactNode}) => {
  return (
    <div className="py-5 text-xl text-zinc-400">{children}</div>
  )
}

export default Loading
