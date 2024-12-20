import React from 'react'
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";


export default function Footer() {
  return (
    <div className='w-full border-t-2 border-t-slate-400  bottom-0 flex flex-col sm:flex-row gap-4 md:gap-0 items-center justify-between p-4 md:h-20 h-auto'>
      <div className='first font-bold sm:text-md text-sm md:text-lg'>©2022 SwiftCart. All rights reserved</div>
      <div className='sec flex items-center gap-2'>
        <FaFacebookF className=' cursor-pointer hover:opacity-75'/>
        <FaInstagram className=' cursor-pointer hover:opacity-75'/>
        <FaTwitter className=' cursor-pointer hover:opacity-75'/>
        <FaLinkedin className=' cursor-pointer hover:opacity-75'/>
      </div>
      <div className='terms flex items-center gap-2 font-bold sm:text-md text-sm md:text-lg'>
        <h1>Privacy & Policy</h1>
        <h1>Terms & Conditions</h1>
      </div>
    </div>
  )
}
