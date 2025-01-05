import React from 'react'
import { FaLocationDot,FaPhone } from "react-icons/fa6";

export default function TopBar() {
  return (
    <div className='md:flex bg-green-100 justify-end py-1 gap-6 px-3 hidden'>
        <p className='text-sm flex items-center gap-1 text-gray-700'><FaLocationDot className='bg-green-500 text-white rounded-full text-base p-1 h-5 w-5'/> Pokhara-11,Fulbari, Gandaki Pradesh</p>
        <p className='text-sm flex items-center gap-1 text-gray-700'><FaPhone className='bg-green-500 text-white rounded-full text-base p-1 h-5 w-5'/> 9876543210</p>

    </div>
  )
}
