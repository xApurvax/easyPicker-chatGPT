import React,{useEffect, useState} from 'react'
import AnimationLetter from './AnimationLetter';
import CustomForm from './CustomForm'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import NavbarNew from './NavbarNew';
import FooterNew from './FooterNew';
import NavBarNewA from './NavBarNewA';

const HeaderNew = ({children}) => {
  const { token,tokenAtRegister } = useSelector((state) => ({
    token: state.loginSlice.allData?.token?.access,
    tokenAtRegister: state.registerSlice.allData?.token?.access,
  }));
  
  // const navigate = useNavigate();
    // useEffect(() => {
    //     token && token !== undefined || tokenAtRegister && tokenAtRegister !== undefined ? navigate('/') : navigate('/auth/login');
    // }, [token,tokenAtRegister])
    

  return (
    <div>    
      <NavBarNewA />
      <div className='relative bottom-0 pt-60px'>
        <header className="bg-[#544BB9] pt-24 pb-[44px] relative after:content-[''] after:h-[30%] after:w-full after:absolute after:top-full after:bg-[#EDF2F7] after:-translate-y-full after:z-0 h-full min-h-[96vh] flex flex-col items-center justify-center w-full">
            <div className='flex flex-col justify-center items-center ms:gap-1'>
                <p className='font-bold text-6xl ms:text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-white'>AI Headline Generator</p>
                <p className='font-medium text-lg ms:text-xs sm:text-base md:text-lg text-white'>Generate title ideas for your articles and blog posts</p>
              
            </div>
            <div className='mt-8 w-full'>
              <CustomForm >
                {children}
              </CustomForm>
            </div>
        </header>
      </div>
      <FooterNew />
    </div>

  )
}

export default HeaderNew