import React, { useEffect,useState } from 'react'
import logo from "../../assets/logo-infynno-white.svg";
import { useSelector, useDispatch } from "react-redux";
import { logOut, setLogOutModal } from '../../redux/slices/auth/loginSlice';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { setHasTitleTag } from '../../redux/slices/generateHeadlineSlice';
import { LogoutModal } from '../modal/LogoutModal';

const NavbarNewA = () => {
  const dispatch = useDispatch();
  const [isNavOpen, setIsNavOpen] = useState(false); 
  const [toggle, setToggle] = useState(false); 
  // const navigate = useNavigate();
    const { token } = useSelector((state) => ({
    token: state.loginSlice.allData?.token?.access,
  }));
  const navigate = useNavigate()
  useEffect(() => {
  }, [token])

  const toggleClass = () => {
    setIsNavOpen(!isNavOpen);
    const coinsText = document.querySelector("#nav-icon4")
    coinsText?.classList?.toggle("open");
  }

  
  return (
    <div className='fixed w-full z-50'>
    <nav className="flex justify-center w-full max-w-screen bg-[#544BB9] items-center px-4">
      <div className="flex justify-between w-full py-3 max-w-6xl">
        <div className="flex gap-5 items-center justify-center">
        <a href="/">
          <img src={logo} alt="logo" className="w-14 cursor-pointer" />
        </a>
        {/* <a href="/">
          <p className="font-bold text-black text-xl text-transparent bg-clip-text bg-gradient-to-t from-purple-400 to-blue-600 transition duration-[0.4s]">TAGLINE GENERATOR</p>
        </a> */}
        </div>
        <div className="">
          <div className='hidden ms:flex md:hidden w-full h-full'>
            <div id="nav-icon4" onClick={() => {toggleClass(); setToggle(!toggle);} }>
                <span></span>
                <span></span>
                <span></span>
            </div>
          </div>
          <div className={`md:invisible w-full h-full flex flex-wrap flex-col justify-center items-center fixed left-0 top-[33px] ${toggle ? "visible ms:visible sm:visible  z-[3]" : "invisible -z-10"}`}>
            <div className={`md:invisible w-full h-full flex flex-wrap absolute left-0 top-0 ${toggle ? "visible ms:visible sm:visible z-[3]" : "invisible -z-10"}`}> 
                <span className={`${toggle ? "-left-1/2 w-1/2  delay-[0s] skew-x-[45deg]" : "left-0 w-0  delay-[0.3s] skew-x-0"} absolute top-5 bg-black h-full transition before:content-[''] before:w-[150%] before:h-full before:bg-black before:absolute before:top-0 before:-left-[149%] -z-10`}></span> 
                <span className={`${toggle ? "left-0 w-1/2  delay-[0s] skew-x-[45deg]" : "left-1/4 w-0  delay-[0.3s] skew-x-0"} absolute top-5 bg-black h-full transition -z-10`}></span> 
                <span className={`${toggle ? "left-1/2 w-1/2  delay-[0s] skew-x-[45deg]" : "left-1/2 w-0  delay-[0.3s] skew-x-0"} absolute top-5 bg-black h-full transition -z-10`}></span> 
                <span className={`${toggle ? "left-full w-1/2  delay-[0s] skew-x-[45deg]" : "left-3/4 w-0  delay-[0.3s] skew-x-0"} absolute top-5 bg-black h-full transition  before:content-[''] before:w-[150%] before:h-full before:bg-black before:absolute before:top-0 before:-right-[149%] -z-10`}></span> 
            </div>
           <div data-tilt data-tilt-perspective="2000" 
           className="navbar_menu will-change-transform"
           >
            <div className={`block min-h-[130px] transform transition ${toggle ? "opacity-100 -translate-y-1/3 delay-[0.45s]" : "opacity-0 -translate-y-0  delay-[0s]"}`}>
                <ul className={`transition flex flex-col gap-5 my-5 items-start justify-between ${toggle ? "delay-[0.45s]" : "delay-[0s]"}` }>
            <Link href="/">
                  <li className="font-normal text-lg text-center text-[#e3e3e3] hover:text-white transition delay-[0s]">
                    How it works?
                  </li>
                </Link>
                <Link href="/">
                  <li className="font-normal text-lg text-center text-[#e3e3e3] hover:text-white transition delay-[0s]">
                    Pricing
                  </li>
                </Link>
                <a href="https://infynno.com/about-us/" target='_blank' >
                  <li className="font-normal text-lg text-center text-[#e3e3e3] hover:text-white transition delay-[0s]">
                    About us
                  </li>
                </a>
                <Link href="/">
                  <li className="font-normal text-lg text-center text-[#e3e3e3] hover:text-white transition delay-[0s]">
                    Help
                  </li>
                </Link> 
            </ul>
            {token?
            <button 
            onClick={() => {dispatch(setLogOutModal(true)); setIsNavOpen(false);
              setToggle(false);
              dispatch(setHasTitleTag([]));
              const coinsText = document.querySelector("#nav-icon4")
            coinsText?.classList?.remove("open");
              navigate("/auth/login")}}
            className='flex gap-2 items-center font-bold text-lg px-3 py-1 rounded-md bg-[#544BB9] text-white hover:text-[#7f8389] transition duration-[0.4s] whitespace-nowrap'>
              Log out
              <FiLogOut />
            </button> 
            :
              <button onClick={() => {setIsNavOpen(false);
                setToggle(false);
              const coinsText = document.querySelector("#nav-icon4")
              coinsText?.classList?.remove("open");
              navigate("/auth/register");}} className="font-bold text-lg px-3 py-1 rounded-md bg-[#544BB9] text-white hover:text-[#7f8389] transition duration-[0.4s] whitespace-nowrap list-none">
                Get Started
              </button>
            }
            </div>
            </div>
        </div>
          {/* <div className={isNavOpen ? "flex flex-col absolute w-full h-screen top-[55px] left-0 bg-white z-10 justify-start items-start px-5" : "hidden"}>
            <ul className="flex flex-col gap-5 my-5 items-start justify-between">
            <Link href="/">
                  <li className="font-normal text-lg text-black hover:text-[#141414] transition duration-[0.4s]">
                    How it works?
                  </li>
                </Link>
                <Link href="/">
                  <li className="font-normal text-lg text-black hover:text-[#141414] transition duration-[0.4s]">
                    Pricing
                  </li>
                </Link>
                <button onClick={() => navigate("https://infynno.com/about-us/")} >
                  <li className="font-normal text-lg text-black hover:text-[#141414] transition duration-[0.4s]">
                    About us
                  </li>
                  </button>
                <Link href="/">
                  <li className="font-normal text-lg text-black hover:text-[#141414] transition duration-[0.4s]">
                    Help
                  </li>
                </Link> 
            </ul>
            {token?
            <button 
            onClick={() => {dispatch(logOut()); setIsNavOpen(false);
              const coinsText = document.querySelector("#nav-icon4")
            coinsText?.classList?.remove("open");
              navigate("/auth/login")}}
            className='flex gap-2 items-center font-bold text-lg px-3 py-1 rounded-md bg-[#544BB9] text-white hover:text-[#7f8389] transition duration-[0.4s] whitespace-nowrap'>
              Log out
              <FiLogOut />
            </button> 
            :
              <button onClick={() => {setIsNavOpen(false);
              const coinsText = document.querySelector("#nav-icon4")
              coinsText?.classList?.remove("open");
              navigate("/auth/register");}} className="font-bold text-lg px-3 py-1 rounded-md bg-[#544BB9] text-white hover:text-[#7f8389] transition duration-[0.4s] whitespace-nowrap list-none">
                Get Started
              </button>
            }
          </div> */}
          <ul className="flex items-center justify-center gap-10 w-full h-full cursor-pointer ms:hidden md:flex">
            <div className='flex items-center justify-center gap-5 w-full h-full cursor-pointer'>
              <Link href="/">
                <li className="font-bold text-lg text-[#e5e5e5] hover:text-[#141414] transition duration-[0.4s]">
                  How it works?
                </li>
              </Link>
              <Link href="/">
                <li className="font-bold text-lg text-[#e5e5e5] hover:text-[#141414] transition duration-[0.4s]">
                  Pricing
                </li>
              </Link>
              {/* <Link href="https://infynno.com/about-us/" target="_blank"> */}
              <a href="https://infynno.com/about-us/" target="_blank">
                <li className="font-bold text-lg text-[#e5e5e5] hover:text-white transition duration-[0.4s]">
                  About us
                </li>
                </a>
              {/* </Link> */}
              <Link href="/">
                <li className="font-bold text-lg text-[#e5e5e5] hover:text-white transition duration-[0.4s]">
                  Help
                </li>
              </Link>
            </div>
            {/* {token?
            <button 
            onClick={() => dispatch(logOut())}
            className='font-bold text-lg px-3 py-1 rounded-md bg-white text-[#544BB9] hover:text-[#7f8389] transition duration-[0.4s] whitespace-nowrap'>Log out</button> 
            :
            <Link href="/auth/register">
              <li className="font-bold text-lg px-3 py-1 rounded-md bg-white text-[#544BB9] hover:text-[#7f8389] transition duration-[0.4s] whitespace-nowrap">
                Get Started
              </li>
            </Link>} */}
              {token?
            <button 
            onClick={() => {dispatch(setLogOutModal(true)); setIsNavOpen(false);
              const coinsText = document.querySelector("#nav-icon4")
            coinsText?.classList?.remove("open");
            dispatch(setHasTitleTag([]));
              navigate("/auth/login")}}
            className='flex gap-2 items-center font-bold text-lg px-3 py-1 rounded-md bg-white text-[#544BB9] hover:text-[#7f8389] transition duration-[0.4s] whitespace-nowrap'>
              Log out
              <FiLogOut />
            </button> 
            :
              <button onClick={() => {setIsNavOpen(false);
              const coinsText = document.querySelector("#nav-icon4")
              coinsText?.classList?.remove("open");
              navigate("/auth/register");}} className="font-bold text-lg px-3 py-1 rounded-md bg-white text-[#544BB9] hover:text-[#7f8389] transition duration-[0.4s] whitespace-nowrap list-none">
                Get Started
              </button>
            }
          </ul>
        </div>
      </div>
    </nav>
    <LogoutModal />
    </div>
  )
}

export default NavbarNewA