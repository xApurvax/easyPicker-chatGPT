import React, { useEffect, useState } from 'react'
import logo from '../../assets/logo-infynno-white.svg'
import { useSelector, useDispatch } from 'react-redux'
import { setLogOutModal } from '../../redux/slices/auth/loginSlice'
import { useNavigate } from 'react-router-dom'
import { setHasTitleTag } from '../../redux/slices/generateHeadlineSlice'
import { LogoutModal } from '../modal/LogoutModal'
import Cookies from 'js-cookie'
import { AppDispatch, RootState } from '../../redux/store/store'
import classNames from 'classnames'

const NavbarNewA = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [toggle, setToggle] = useState(false)
  const [availableCoins, setAvailableCoins] = useState()

  const { token, tokenR, profileDetails } = useSelector((state: RootState) => ({
    token: state.LoginSlice.allData?.token?.access,
    tokenR: state.RegisterSlice.allData?.token?.access,
    profileDetails: state.ProfileSlice.profileDetails,
  }))
  const navigate = useNavigate()
  useEffect(() => {}, [token, tokenR])

  const coins = Cookies.get('coins')

  useEffect(() => {
    if (Cookies.get('coins')) {
      setAvailableCoins(Cookies.get('coins'))
      const coinsText = document.querySelector('#coins-text')
      coinsText?.classList?.add('animate-ping')
      setTimeout(() => {
        coinsText?.classList?.remove('animate-ping')
      }, 100)
    }
  }, [availableCoins, coins])

  const toggleClass = () => {
    setIsNavOpen(!isNavOpen)
    const coinsText = document.querySelector('#nav-icon4')
    coinsText?.classList?.toggle('open')
  }

  return (
    <div className="fixed w-full z-50">
      <nav className="flex justify-center w-full max-w-screen bg-primary items-center px-4">
        <div className="flex justify-between w-full py-3 max-w-6xl">
          <div className="flex gap-5 items-center justify-center">
            <a href="/">
              <img
                src={logo}
                alt="company logo at auth"
                className="w-14 cursor-pointer"
              />
            </a>
            {/* <a href="/">
          <p className="font-bold text-black text-xl text-transparent bg-clip-text bg-gradient-to-t from-purple-400 to-blue-600 transition duration-[0.4s]">TAGLINE GENERATOR</p>
        </a> */}
          </div>
          <div className="">
            <div className="hidden ms:flex md:hidden w-full h-full">
              <div
                id="nav-icon4"
                onClick={() => {
                  toggleClass()
                  setToggle(!toggle)
                }}
              >
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <div
              className={classNames(
                'md:invisible w-full h-full flex flex-wrap flex-col justify-center items-center fixed left-0 top-[33px]',
                toggle
                  ? 'visible ms:visible sm:visible  z-[3]'
                  : 'invisible -z-10'
              )}
            >
              <div
                className={classNames(
                  'md:invisible w-full h-full flex flex-wrap absolute left-0 top-0',
                  toggle
                    ? 'visible ms:visible sm:visible  z-[3]'
                    : 'invisible -z-10'
                )}
              >
                <span
                  className={classNames(
                    'absolute top-5 bg-black h-full transition before:content-[',
                    '] before:w-[150%] before:h-full before:bg-black before:absolute before:top-0 before:-left-[149%] -z-10',
                    toggle
                      ? '-left-1/2 w-1/2  delay-[0s] skew-x-[45deg]'
                      : 'left-0 w-0  delay-[0.3s] skew-x-0'
                  )}
                ></span>
                <span
                  className={classNames(
                    'absolute top-5 bg-black h-full transition -z-10',
                    toggle
                      ? 'left-0 w-1/2  delay-[0s] skew-x-[45deg]'
                      : 'left-1/4 w-0  delay-[0.3s] skew-x-0'
                  )}
                ></span>
                <span
                  className={classNames(
                    'absolute top-5 bg-black h-full transition -z-10',
                    toggle
                      ? 'left-1/2 w-1/2  delay-[0s] skew-x-[45deg]'
                      : 'left-1/2 w-0  delay-[0.3s] skew-x-0'
                  )}
                ></span>
                <span
                  className={classNames(
                    'absolute top-5 bg-black h-full transition  before:content-[',
                    '] before:w-[150%] before:h-full before:bg-black before:absolute before:top-0 before:-right-[149%] -z-10',
                    toggle
                      ? 'left-full w-1/2  delay-[0s] skew-x-[45deg]'
                      : 'left-3/4 w-0  delay-[0.3s] skew-x-0'
                  )}
                ></span>
              </div>
              <div
                data-tilt
                data-tilt-perspective="2000"
                className="navbar_menu will-change-transform"
              >
                <div
                  className={classNames(
                    'block min-h-[130px] transform transition',
                    toggle
                      ? 'opacity-100 -translate-y-1/3 delay-[0.45s]'
                      : 'opacity-0 -translate-y-0  delay-[0s]'
                  )}
                >
                  <ul
                    className={classNames(
                      'transition flex flex-col gap-5 my-5 items-start',
                      toggle ? 'delay-[0.45s]' : 'delay-[0s]'
                    )}
                  >
                    <li
                      onClick={() => {
                        setIsNavOpen(false)
                        setToggle(false)
                        const coinsText = document.querySelector('#nav-icon4')
                        coinsText?.classList?.remove('open')
                        dispatch(setHasTitleTag([]))
                        navigate('/profile')
                      }}
                      className="font-normal text-lg text-center text-[#e3e3e3] hover:text-white transition delay-[0s]"
                    >
                      Profile
                    </li>
                    <li
                      onClick={() => {
                        setIsNavOpen(false)
                        setToggle(false)
                        const coinsText = document.querySelector('#nav-icon4')
                        coinsText?.classList?.remove('open')
                        dispatch(setHasTitleTag([]))
                        navigate('/transaction-history')
                      }}
                      className="font-normal text-lg text-center text-[#e3e3e3] hover:text-white transition delay-[0s]"
                    >
                      Transactions
                    </li>
                    {token || tokenR ? (
                      <>
                        <li
                          onClick={() => {
                            setIsNavOpen(false)
                            setToggle(false)
                            const coinsText =
                              document.querySelector('#nav-icon4')
                            coinsText?.classList?.remove('open')
                            dispatch(setHasTitleTag([]))
                            navigate('/history')
                          }}
                          className="font-normal text-lg text-center text-[#e3e3e3] hover:text-white transition delay-[0s]"
                        >
                          History
                        </li>
                        <li
                          onClick={() => {
                            setIsNavOpen(false)
                            setToggle(false)
                            const coinsText =
                              document.querySelector('#nav-icon4')
                            coinsText?.classList?.remove('open')
                            dispatch(setHasTitleTag([]))
                            navigate('/transaction-history')
                            dispatch(setLogOutModal(true))
                          }}
                          className="font-normal text-lg text-center text-[#e3e3e3] hover:text-white transition delay-[0s]"
                        >
                          Buy Coins
                        </li>
                      </>
                    ) : (
                      <></>
                    )}
                  </ul>
                  <div>
                    <button
                      onClick={() => {
                        setIsNavOpen(false)
                        setToggle(false)
                        const coinsText = document.querySelector('#nav-icon4')
                        coinsText?.classList?.remove('open')
                        navigate('/auth/register')
                      }}
                      className="font-bold text-lg px-3 py-1 rounded-md bg-primary text-white hover:text-[#7f8389] transition duration-[0.4s] whitespace-nowrap list-none"
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <ul className="flex items-center justify-center gap-5 w-full h-full cursor-pointer ms:hidden md:flex">
              <div className="flex gap-[5%] w-full">
                <div className="flex items-center justify-center">
                  <a
                    href="https://infynno.com/about-us/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <li className="font-bold text-lg text-secondaryLayout hover:text-white transition duration-[0.4s] whitespace-nowrap">
                      About us
                    </li>
                  </a>
                </div>
                <button
                  onClick={() => {
                    setIsNavOpen(false)
                    const coinsText = document.querySelector('#nav-icon4')
                    coinsText?.classList?.remove('open')
                    navigate('/auth/register')
                  }}
                  className="font-bold text-lg px-2 py-1 rounded-md bg-white text-primary hover:text-[#7f8389] transition duration-[0.4s] whitespace-nowrap list-none"
                >
                  Get Started
                </button>
              </div>
            </ul>
          </div>
        </div>
      </nav>
      <LogoutModal />
    </div>
  )
}

export default NavbarNewA
