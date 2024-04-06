import React from 'react'
import { twMerge } from "tailwind-merge"

function Button({
    children,
    className='',
    ...props
}) {
  return (
    <button
    className={twMerge('hover:bg-green-500 px-4 py-2 text-green-700 rounded-md hover:shadow-lg font-bold bg-green-400 disabled:opacity-50 text-lg focus:ring-green-500 hover:disabled:bg-green-400 hover:disabled:shadow-none', className)}
    {...props}
    >
        {children}
    </button>
  )
}

export default Button