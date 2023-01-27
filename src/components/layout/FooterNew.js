import React from 'react'
import logo from "../../assets/logo-infynno-white.svg";
import { FaHeart } from 'react-icons/fa';
import { motion, useScroll } from "framer-motion"

const FooterNew = () => {
  const { scrollYProgress } = useScroll();
  return (
    <div className='w-full z-50 my-auto'>
    <footer className="flex justify-center w-full max-w-screen bg-[#544BB9] items-center py-5  ms:py-2 sm:py-3 md:py-5 lg:py-5">
      <div className="flex justify-between w-full py-3 ms:py-1 sm:py-2 md:py-3 lg:py-3 max-w-6xl">
        <div className="flex gap-3 items-center justify-center w-full text-4xl ms:text-lg sm:text-2xl md:text-3xl lg:text-4xl">
        <p className='font-bold font-mono text-[#e5e5e5] hover:text-white transition duration-[0.4s]'>Made with</p>
        <motion.div 
        initial={{ opacity: 0, scale: 0.1 }}
        whileInView={{ opacity: 1, scale: 1.3  }}
        >
        <FaHeart fill='red'
        //  size={30}
        className='focus-within:animate-ping' 
         />
        </motion.div>
        <p className='font-bold font-mono text-[#e5e5e5] hover:text-white transition duration-[0.4s]'>by</p>
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