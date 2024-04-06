import React from 'react'

function Options({ image, text, option, ...props }) {

    return (
        <div className={`md:w-[25%] w-[80%] h-[100%] hover:shadow-md hover:bg-gray-100 cursor-pointer ${option === text ? 'border-4 border-green-500' : 'border-2 border-gray-200'} flex flex-col items-center justify-start gap-4 transition-all rounded-lg p-3`} {...props}>
            <img src={image} className='w-auto h-[70%] object-cover' />
            <h1 className='text-xl font-bold text-stone-600 text-center h-[8vh]'>{text}</h1>
            <div className={`w-8 h-8 rounded-full ${option === text ? 'bg-green-500 border-0' : 'bg-none'} border-2 border-gray-400 p-1`}>
            </div>
        </div>
    )
}

export default Options