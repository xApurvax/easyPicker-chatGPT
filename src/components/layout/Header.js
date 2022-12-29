import React from "react";
import logo from "../../assets/logo-infynno-crop.svg";
const Header = () => {
  return (
    <div>
      <nav className="flex justify-center w-full max-w-screen bg-white border-b-[1px] border-solid border-[#ebebeb] items-center">
        <div className="flex justify-between w-full py-3 max-w-6xl">
          <div className="">
            <img src={logo} alt="logo" className="w-14 cursor-pointer" />
          </div>
          <div className="">
            <ul className="flex items-center justify-center gap-5 w-full h-full cursor-pointer">
              <a href="#">
                <li className="font-bold text-black hover:text-[#7f8389] transition duration-[0.4s]">
                  How it works?
                </li>
              </a>
              <a href="#">
                <li className="font-bold text-black hover:text-[#7f8389] transition duration-[0.4s]">
                  about us
                </li>
              </a>
              <a href="#">
                <li className="font-bold text-black hover:text-[#7f8389] transition duration-[0.4s]">
                  Help
                </li>
              </a>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
