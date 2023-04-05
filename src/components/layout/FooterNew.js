import React from 'react'
import logo from "../../assets/logo-infynno-white.svg";
import { FaHeart } from 'react-icons/fa';
import { motion, useScroll } from "framer-motion"

const FooterNew = () => {
  const { scrollYProgress } = useScroll();
  return (
    <div className='w-full h-full z-20 my-auto relative'>
    <footer className="flex flex-col justify-center w-full h-full bg-[#544BB9] items-center py-5 ms:py-1 sm:py-2 md:py-2 lg:py-1.5">
      <div className="flex justify-between w-full py-3 ms:py-0.5 sm:py-1 md:py-1.5 lg:py-3">
        <div className="flex gap-3 items-center justify-center w-full font-medium text-sm ms:text-sm sm:text-base md:text-lg lg:text-xl">
        <p className='text-[#e5e5e5] hover:text-white transition duration-[0.4s]'>Made with</p>
        <motion.div 
        initial={{ opacity: 0, scale: 0.1 }}
        whileInView={{ opacity: 1, scale: 1.3  }}
        >
        <FaHeart fill='red'
        //  size={30}
        className='focus-within:animate-ping' 
         />
        </motion.div>
        <p className='text-[#e5e5e5] hover:text-white transition duration-[0.4s]'>by</p>
        <a href="https://infynno.com/" target="_blank">
        <div className="w-12 ms:w-[25px] sm:w-[30px] md:w-[36px] lg:w-[42px] cursor-pointer">
          <img src={logo} alt="company logo at footer" className="" height="auto" width="auto"  />
        </div>
        </a>
        </div>
      </div>
      <div className='flex gap-2 md:hidden'>
        <div className='text-white font-600 font-semibold hover:text-[#141414] transition ease-in-out duration-[.4s] cursor-pointer'><a href='/terms-of-use' target="_blank">Terms of use</a></div>
        <div className='text-white font-600 font-semibold'>|</div>
        <div className='text-white font-600 font-semibold hover:text-[#141414] transition ease-in-out duration-[.4s] cursor-pointer'><a href='/privacy-policy' target="_blank">Privacy policy</a></div>
      </div>
      <div className='hidden gap-2 md:flex absolute right-[5%]'>
        <div className='text-white font-600 font-semibold hover:text-[#141414] transition ease-in-out duration-[.4s] cursor-pointer'><a href='/terms-of-use' target="_blank">Terms of use</a></div>
        <div className='text-white font-600 font-semibold'>|</div>
        <div className='text-white font-600 font-semibold hover:text-[#141414] transition ease-in-out duration-[.4s] cursor-pointer'><a href='/privacy-policy' target="_blank">Privacy policy</a></div>
      </div>
    </footer>
  </div>
  )
}

export default FooterNew