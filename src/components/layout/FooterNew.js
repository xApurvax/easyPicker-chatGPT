import React from 'react'
import logo from "../../assets/logo-infynno-white.svg";
import { FaHeart } from 'react-icons/fa';

const FooterNew = () => {
  return (
    <div className='w-full z-50 my-auto'>
    <footer className="flex justify-center w-full max-w-screen bg-[#544BB9] items-center py-5">
      <div className="flex justify-between w-full py-3 max-w-6xl">
        <div className="flex gap-3 items-center justify-center w-full">
        <p className='font-bold text-3xl font-mono text-[#e5e5e5] hover:text-white transition duration-[0.4s]'>Made with</p>
        <FaHeart fill='red' size={30} />
        <p className='font-bold text-3xl font-mono text-[#e5e5e5] hover:text-white transition duration-[0.4s]'>by</p>
        <a href="/">
          <img src={logo} alt="logo" className="w-12 cursor-pointer" />
        </a>
        </div>
      </div>
    </footer>
  </div>
  )
}

export default FooterNew