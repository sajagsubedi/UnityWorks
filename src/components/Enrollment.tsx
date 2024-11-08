import React from 'react'
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

export default function Enrollment() {
  return (
    <section className='bg-green-500 min-h-60 w-full flex flex-col md:flex-row md:px-[15vw] px-10 gap-[6vw] py-6 items-center justify-center'>
        <div className='flex flex-col md:w-2/3 w-full gap-3'>
            <h1 className='text-2xl text-white font-bold'>Wanna Become A Member?</h1>
            <p className='text-yellow-200'>Check the member enrollment procedure and if you need help or have any questions, please feel free to contact us!</p>
        </div>
        <div className='md:w-1/3 w-full'>
            <button className='group text-green-500 rounded-lg bg-white py-2 px-3 font-bold flex justify-center items-center transition-all w-64 text-nowrap hover:w-72'>Member Enrollment Procedure <MdKeyboardDoubleArrowRight className='text-green-500 hidden group-hover:block transition-all'/> </button>
        </div>
    </section>
  )
}
