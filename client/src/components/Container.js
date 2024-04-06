import React from 'react'
import { twMerge } from "tailwind-merge"

function Container({
    children,
    className=''
}) {
  return (
    <div className={twMerge('md:w-[100vw] w-[100%] h-full md:h-[100vh] bg-[#fcf6f5ff]', className)}>
        {children}
    </div>
  )
}

export default Container