import React, { useEffect, useRef, useState } from "react";
import CustomForm from "./CustomForm";
import { useSelector, useDispatch } from "react-redux";
import FooterNew from "./FooterNew";
import NavBarNewA from "./NavBarNewA";
import classNames from 'classnames';
import { dynamicHeadline } from "../../utils/Data";

let COUNT = 0;  
const HeaderNew = ({ children }) => {
  const [heading, setHeading] = useState(dynamicHeadline[0]);
  const [headingCount, setHeadingCount] = useState(0);
  // const [height, setHeight] = useState(0);
  // const domRef = useRef(null)
  const { token, tokenAtRegister } = useSelector((state) => ({
    token: state.loginSlice.allData?.token?.access,
    tokenAtRegister: state.registerSlice.allData?.token?.access,
  }));

  const handleHeading = () => {
    setHeading(dynamicHeadline[COUNT]);
    if (COUNT >= dynamicHeadline.length - 1) COUNT = 0;
    else COUNT++;
  };
  useEffect(() => {
    setInterval(handleHeading, 10000);
  }, []);
  // useEffect(() => {
  //   if((domRef.current.clientHeight / 10 ) - 15 < 60 ){
  //     console.log((domRef.current.clientHeight / 10 ) - 15)
  //     let updateHeight = Math.round((domRef.current.clientHeight / 10 ) - 15) + "%"
  //     setHeight(updateHeight)
  //   }
  //   if((domRef.current.clientHeight / 10 ) - 15 > 60 && (domRef.current.clientHeight / 10 ) - 30 < 100 ){
  //     console.log((domRef.current.clientHeight / 10 ) - 15)
  //     let updateHeight = Math.round((domRef.current.clientHeight / 10 ) - 15) + "%"
  //     setHeight(updateHeight)
  //   }
  //   console.log((domRef.current.clientHeight / 10 ) - 15)
  // }, [])
  return (
    <div className='flex flex-col bg-[#544BB9] h-screen'>
      <NavBarNewA />
      <div className="">
        <header className="bg-[#544BB9] py-0 relative h-full min-h-[80vh] flex flex-col items-center ms:justify-center md:justify-start w-full">
        {/* <header className="bg-[#544BB9] py-0 relative after:content-[''] after:h-[30%] after:w-full after:absolute after:top-full after:bg-[#EDF2F7] after:-translate-y-full after:z-0 h-full min-h-[80vh] flex flex-col items-center ms:justify-center md:justify-start w-full"> */}
          <div className="flex flex-col justify-center items-center ms:gap-1">     
            <p className="font-bold text-2xl ms:text-2xl sm:text-3xl md:text-3xl lg:text-3xl text-white">
              AI Title Generator
            </p>
            <p
              id="dynamicText"
              className="font-medium text-[8px] ms:text-[8px] sm:text-base md:text-lg text-white"
            >
              {heading}
            </p>
          </div>
          <div
          // style={{
          //   height: `${height}`
          // }}
           className='absolute bottom-0 h-[50%] w-full z-[10] bg-[#EDF2F7]'
          />
          <div className="mt-4 w-full">
            <CustomForm>{children}</CustomForm>
          </div>
        </header>
      </div>
      <FooterNew />
    </div>
  );
};

export default HeaderNew;
