import React, { useEffect, useRef, useState } from 'react'
import CustomForm from './CustomForm'
import FooterNew from './FooterNew'
import NavBarNewA from './NavBarNewA'
import { dynamicHeadline } from '../../utils/Data'

let COUNT = 0
const HeaderNew = ({ children }) => {
  const [heading, setHeading] = useState(dynamicHeadline[0])
  const domRef = useRef(null)
  // const { token, tokenAtRegister } = useSelector((state) => ({
  //   token: state.loginSlice.allData?.token?.access,
  //   tokenAtRegister: state.registerSlice.allData?.token?.access,
  // }))

  const handleHeading = () => {
    setHeading(dynamicHeadline[COUNT])
    if (COUNT >= dynamicHeadline.length - 1) COUNT = 0
    else COUNT++
  }
  useEffect(() => {
    setInterval(handleHeading, 10000)
  }, [])
  useEffect(() => {
    if (
      domRef.current.clientHeight / 10 - 15 > 90 &&
      domRef.current.clientHeight / 10 - 15 < 150
    ) {
      document.getElementById('headerBaHRP').style.paddingTop = String(
        Math.round(domRef.current.clientHeight / 10 - 15) + 'px'
      )
      document.getElementById('headerBaHRP').style.color = 'red'
    }
  }, [])
  return (
    <div ref={domRef} className="flex flex-col bg-primary h-screen">
      <NavBarNewA />
      <div className="">
        <header className="bg-primary py-0 relative h-full min-h-[80vh] flex flex-col items-center ms:justify-center md:justify-start w-full">
          <div
            id="headerBaHRP"
            className="flex flex-col justify-center items-center ms:gap-1"
          >
            <h1 className="font-bold text-2xl ms:text-2xl sm:text-3xl md:text-3xl lg:text-3xl text-white">
              AI Title Generator
            </h1>
            <h6
              id="dynamicText"
              className="font-medium text-[8px] ms:text-[8px] sm:text-base md:text-lg text-white"
            >
              {heading}
            </h6>
          </div>
          <div className="absolute bottom-0 h-[50%] w-full z-[10] bg-[#EDF2F7]" />
          <div className="mt-4 w-full">
            <CustomForm>{children}</CustomForm>
          </div>
        </header>
      </div>
      <FooterNew />
    </div>
  )
}

export default HeaderNew
