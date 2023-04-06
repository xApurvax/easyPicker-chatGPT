import React, { useEffect, useRef } from 'react'
import CustomForm from './CustomForm'
import FooterNew from './FooterNew'
import NavBarNewA from './NavBarNewA'
import { BuyPointsModal } from '../modal/BuyPointsModal'
import { useDispatch } from 'react-redux'
import { profileDetailsFetchAPI } from '../../redux/slices/ProfileSlice'

const HeaderAfterAuth = ({ children }) => {
  const dispatch = useDispatch()
  const domRef = useRef(null)

  useEffect(() => {
    dispatch(profileDetailsFetchAPI())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (
      domRef.current.clientHeight / 10 - 15 > 90 &&
      domRef.current.clientHeight / 10 - 15 < 150
    ) {
      document.getElementById('headerAaHRP').style.paddingTop = String(
        Math.round(domRef.current.clientHeight / 10 - 15) + 'px'
      )
    }
  }, [])

  return (
    <div ref={domRef} className="flex flex-col bg-[#544BB9] h-screen">
      <NavBarNewA />
      <div className="">
        {/* <header className="bg-[#544BB9] relative after:content-[''] after:h-[40%] after:w-full after:absolute after:top-full after:bg-[#EDF2F7] after:-translate-y-full after:z-0 h-full min-h-[75vh] flex flex-col items-center ms:justify-center md:justify-start w-full"> */}
        <header className="bg-[#544BB9] relative h-full min-h-[75vh] flex flex-col items-center ms:justify-center md:justify-start w-full">
          <div className="absolute bottom-0 h-[50%] w-full z-[10] bg-[#EDF2F7]" />
          <div id="headerAaHRP" className="mt-0 w-full">
            <CustomForm>{children}</CustomForm>
          </div>
        </header>
      </div>
      <BuyPointsModal />
      <FooterNew />
    </div>
  )
}

export default HeaderAfterAuth
