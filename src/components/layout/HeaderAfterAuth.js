import React, { useEffect } from 'react'
import CustomForm from './CustomForm'
import FooterNew from './FooterNew';
import NavBarNewA from './NavBarNewA';
import { BuyPointsModal } from '../modal/BuyPointsModal';
import { useDispatch } from 'react-redux';
import { profileDetailsFetchAPI } from "../../redux/slices/ProfileSlice";

const HeaderAfterAuth = ({children}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(profileDetailsFetchAPI())
}, [])
  return (
    <div className='flex flex-col bg-[#544BB9] h-screen'>    
      <NavBarNewA />
      <div className=''>
        <header className="bg-[#544BB9] relative after:content-[''] after:h-[40%] after:w-full after:absolute after:top-full after:bg-[#EDF2F7] after:-translate-y-full after:z-0 h-full min-h-[75vh] flex flex-col items-center ms:justify-center md:justify-start w-full">
            <div className='mt-0 w-full'>
              <CustomForm >
                {children}
              </CustomForm>
            </div>
        </header>
      </div>
      <BuyPointsModal />
      <FooterNew />
    </div>
  )
}

export default HeaderAfterAuth