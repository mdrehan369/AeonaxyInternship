import React from 'react'
import { twMerge } from "tailwind-merge"

function Input({
    name,
    register,
    className='',
    type='text',
    placeholder='',
    label='',
    id='',
    divClasses='',
    labelClasses='',
    ...props
}) {
  return (
    <div className={twMerge('flex flex-col items-start justify-center w-full', divClasses)}>
        <label htmlFor={id || name} className={twMerge('text-xl font-bold text-stone-700', labelClasses)}>
            {label}
        </label>
    <input
    className={twMerge('w-full md:h-[7vh] h-[5vh] rounded-md bg-[#e3e3e3] p-4 text-stone-700', className)}
    id={id || name}
    {...register(name)}
    placeholder={placeholder}
    {...props}
    />
    </div>
  )
}

export default Input