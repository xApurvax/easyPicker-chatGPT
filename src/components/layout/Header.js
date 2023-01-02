import React from "react";
import logo from "../../assets/logo-infynno-crop.svg";
const Header = () => {
  return (
    <div>
      <nav className="flex justify-center w-full max-w-screen bg-white border-b-[1px] border-solid border-[#ebebeb] items-center">
        <div className="flex justify-between w-full py-3 max-w-6xl">
          <div className="flex gap-5 items-center justify-center">
          <a href="/">
            <img src={logo} alt="logo" className="w-14 cursor-pointer" />
          </a>
          <a href="/">
            <p className="font-bold text-black text-xl text-transparent bg-clip-text bg-gradient-to-t from-purple-400 to-blue-600 transition duration-[0.4s]">TAGLINE GENERATOR</p>
          </a>
          </div>
          <div className="">
            <ul className="flex items-center justify-center gap-5 w-full h-full cursor-pointer">
              {/* <a href="/">
                <li className="font-bold text-black hover:text-[#7f8389] transition duration-[0.4s]">
                  How it works?
                </li>
              </a> */}
              <a href="https://infynno.com/about-us/" target="_blank">
                <li className="font-bold text-lg text-black hover:text-[#2E90FA] transition duration-[0.4s]">
                  About us
                </li>
              </a>
              {/* <a href="/">
                <li className="font-bold text-black hover:text-[#7f8389] transition duration-[0.4s]">
                  Help
                </li>
              </a> */}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
