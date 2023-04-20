import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo-infynno-white.svg'
import { useSelector, useDispatch } from 'react-redux'
import { setLogOutModal } from '../../redux/slices/auth/loginSlice'
import { useNavigate } from 'react-router-dom'
import { FiLogOut } from 'react-icons/fi'
import { CgProfile } from 'react-icons/cg'
import {
  setHasArticle,
  setHasSomethingTyped,
  setHasTitleTag,
  setTag,
} from '../../redux/slices/generateHeadlineSlice'
import { LogoutModal } from '../modal/LogoutModal'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { BsPerson } from 'react-icons/bs'
import { MdHistory } from 'react-icons/md'
import Cookies from 'js-cookie'
import classNames from 'classnames'
import { GiTwoCoins } from 'react-icons/gi'
import { GoHome } from 'react-icons/go'
import { BiPlus } from 'react-icons/bi'
import { setShowBuyPointsModal } from '../../redux/slices/pointsSlice'
import VerifyOtpModal from '../modal/VerifyOtpModal'
import { AppDispatch, RootState } from '../../redux/store/store'

const NavbarNewA = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [toggle, setToggle] = useState(false)
  const [availableCoins, setAvailableCoins] = useState()
  const [accessToken, setAccessToken] = useState()
  const { token, tokenR, profileDetails } = useSelector((state: RootState) => ({
    token: state.LoginSlice.allData?.token?.access,
    tokenR: state.RegisterSlice.allData?.token?.access,
    profileDetails: state.ProfileSlice.profileDetails,
  }))

  const handleClickScroll = () => {
    const element = document.getElementById('howitworks')
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const navigate = useNavigate()
  useEffect(() => {}, [token, tokenR])

  useEffect(() => {
    setAccessToken(Cookies.get('access_token'))
  }, [accessToken])
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

  useEffect(() => {}, [profileDetails?.profile_pic])

  const toggleClass = () => {
    setIsNavOpen(!isNavOpen)
    const coinsText = document.querySelector('#nav-icon4')
    coinsText?.classList?.toggle('open')
  }

  return (
    <>
      <div className="w-full z-50 flex justify-center items-center">
        <nav
          className={classNames(
            'flex justify-center max-w-screen bg-primary items-center w-full px-[5%]',
            toggle && 'fixed top-0'
          )}
        >
          <div className="flex justify-between w-full py-3 max-w-6xl">
            <div className="flex gap-5 items-center justify-center">
              {accessToken ? (
                <Link to="/generator">
                  <div className="w-14 cursor-pointer">
                    <img
                      src={logo}
                      alt="company logo after auth"
                      className="w-full h-auto"
                    />
                  </div>
                </Link>
              ) : (
                <Link to="/">
                  <div className="w-14 cursor-pointer">
                    <img
                      src={logo}
                      alt="company logo before auth"
                      className="w-full h-auto"
                    />
                  </div>
                </Link>
              )}
            </div>
            <div className="">
              <div className="flex ms:flex md:hidden w-full h-full">
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
                    ? 'visible ms:visible sm:visible z-[3]'
                    : 'invisible -z-10'
                )}
              >
                <div
                  className={classNames(
                    'md:invisible w-full h-full flex flex-wrap absolute left-0 top-0',
                    toggle
                      ? 'visible ms:visible sm:visible z-[3]'
                      : 'invisible -z-10'
                  )}
                >
                  <span
                    className={classNames(
                      "absolute top-5 bg-black h-full transition before:content-[''] before:w-[150%] before:h-full before:bg-black before:absolute before:top-0 before:-left-[149%] -z-10",
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
                        : 'left-1/4 w-0  delay-[0.3s]skew-x-0'
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
                      "absolute top-5 bg-black h-full transition  before:content-[''] before:w-[150%] before:h-full before:bg-black before:absolute before:top-0 before:-right-[149%] -z-10",
                      toggle
                        ? 'left-full w-1/2  delay-[0s] skew-x-[45deg]'
                        : 'lleft-3/4 w-0  delay-[0.3s] skew-x-0'
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
                        : 'opacity-0 -translate-y-0 delay-[0s]'
                    )}
                  >
                    <ul
                      className={classNames(
                        'transition flex flex-col gap-5 my-5 items-start',
                        toggle ? 'delay-[0.45s]' : 'delay-[0s]'
                      )}
                    >
                      {accessToken ? (
                        <>
                          <li
                            onClick={() => {
                              setIsNavOpen(false)
                              setToggle(false)
                              dispatch(setTag([]))
                              dispatch(setHasSomethingTyped(''))
                              dispatch(setHasArticle(''))
                              const coinsText =
                                document.querySelector('#nav-icon4')
                              coinsText?.classList?.remove('open')
                              navigate('/generator')
                            }}
                            className="font-normal text-lg text-center text-[#e3e3e3] hover:text-white transition delay-[0s]"
                          >
                            Home
                          </li>
                          <li
                            onClick={() => {
                              setIsNavOpen(false)
                              setToggle(false)
                              dispatch(setTag([]))
                              dispatch(setHasSomethingTyped(''))
                              dispatch(setHasArticle(''))
                              const coinsText =
                                document.querySelector('#nav-icon4')
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
                              dispatch(setTag([]))
                              dispatch(setHasSomethingTyped(''))
                              dispatch(setHasArticle(''))
                              const coinsText =
                                document.querySelector('#nav-icon4')
                              coinsText?.classList?.remove('open')
                              dispatch(setHasTitleTag([]))
                              navigate('/transaction-history')
                            }}
                            className="font-normal text-lg text-center text-[#e3e3e3] hover:text-white transition delay-[0s]"
                          >
                            Transactions
                          </li>
                          <li
                            onClick={() => {
                              setIsNavOpen(false)
                              setToggle(false)
                              dispatch(setTag([]))
                              dispatch(setHasSomethingTyped(''))
                              dispatch(setHasArticle(''))
                              const coinsText =
                                document.querySelector('#nav-icon4')
                              coinsText?.classList?.remove('open')
                              dispatch(setHasTitleTag([]))
                              navigate('/bookmarks')
                            }}
                            className="font-normal text-lg text-center text-[#e3e3e3] hover:text-white transition delay-[0s]"
                          >
                            Bookmarks
                          </li>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              setIsNavOpen(false)
                              setToggle(false)
                              dispatch(setTag([]))
                              dispatch(setHasSomethingTyped(''))
                              dispatch(setHasArticle(''))
                              const coinsText =
                                document.querySelector('#nav-icon4')
                              coinsText?.classList?.remove('open')
                              navigate('/')
                            }}
                            className="font-bold text-lg rounded-md text-secondaryLayout hover:text-white transition duration-[0.4s] whitespace-nowrap list-none"
                          >
                            How it works
                          </button>
                          <a
                            href="https://infynno.com/about-us/"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <li className="font-bold text-lg text-secondaryLayout hover:text-white transition duration-[0.4s] whitespace-nowrap">
                              About us
                            </li>
                          </a>
                        </>
                      )}
                    </ul>
                    {accessToken ? (
                      <button
                        onClick={() => {
                          dispatch(setLogOutModal(true))
                          setIsNavOpen(false)
                          setToggle(false)
                          dispatch(setTag([]))
                          dispatch(setHasSomethingTyped(''))
                          dispatch(setHasArticle(''))
                          const coinsText = document.querySelector('#nav-icon4')
                          coinsText?.classList?.remove('open')
                        }}
                        className="flex gap-2 items-center font-bold text-lg px-3 py-1 rounded-md bg-primary text-white hover:text-[#7f8389] transition duration-[0.4s] whitespace-nowrap"
                      >
                        Sign out
                        <FiLogOut />
                      </button>
                    ) : (
                      <div className="flex">
                        <button
                          onClick={() => {
                            setIsNavOpen(false)
                            setToggle(false)
                            dispatch(setTag([]))
                            dispatch(setHasSomethingTyped(''))
                            dispatch(setHasArticle(''))
                            const coinsText =
                              document.querySelector('#nav-icon4')
                            coinsText?.classList?.remove('open')
                            navigate('/auth/signin')
                          }}
                          className="felx font-bold text-lg px-3 py-1 rounded-md bg-primary text-white hover:text-[#7f8389] transition duration-[0.4s] whitespace-nowrap list-none"
                        >
                          Sign in
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <ul className="hidden items-center justify-center gap-5 w-full h-full cursor-pointer ms:hidden md:flex">
                {accessToken ? (
                  <div className="flex gap-4 justify-center items-center">
                    <div className="">
                      <div className="flex justify-end gap-1 ms:justify-between md:justify-end">
                        <div className="bg-primary flex justify-end">
                          <div className="flex items-center gap-6 ms:gap-2 sm:gap-3 md:gap-1 px-2 py-1">
                            <GiTwoCoins
                              color="#FFD700"
                              className={classNames(
                                availableCoins &&
                                  'origin-center hover:rotate-12 text-2xl ms:text-[16px] sm:text-[24px] md:text-lg lg:text-lg cursor-pointer'
                              )}
                            />
                            <button
                              onClick={() => {
                                dispatch(setShowBuyPointsModal(true))
                              }}
                              className="flex items-center justify-center"
                            >
                              <p
                                id="coins-text"
                                className="font-semibold text-2xl ms:text-xs sm:text-base md:text-base lg:text-base text-white ml-2"
                              >
                                {availableCoins || 0}
                              </p>
                              <BiPlus className="text-2xl ms:text-[16px] sm:text-[20px] md:text-xl lg:text-2xl cursor-pointer text-white md:px-0.5" />
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-end items-center">
                          <button
                            onClick={() => {
                              navigate('/bookmarks')
                              dispatch(setHasTitleTag([]))
                              dispatch(setTag([]))
                              dispatch(setHasSomethingTyped(''))
                              dispatch(setHasArticle(''))
                            }}
                            className="flex gap-6 bg-primary px-2 py-1 h-full w-full"
                          >
                            <p className="font-semibold text-2xl ms:text-xs sm:text-base md:text-base lg:text-base text-white whitespace-nowrap">
                              Bookmarks
                            </p>
                          </button>
                        </div>
                      </div>
                    </div>
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <Menu.Button className="inline-flex w-full justify-center rounded-md bg-transparent bg-opacity-20 text-4xl font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                          {profileDetails?.profile_pic ? (
                            <div className="overflow-hidden w-14 h-14 lg:w-12 lg:h-12 rounded-full border-[1px] border-solid border-gray-500">
                              <img
                                src={profileDetails?.profile_pic}
                                alt="user-profile-img"
                                className="w-full h-auto"
                              />
                            </div>
                          ) : (
                            <CgProfile className="h-14 w-14 lg:w-12 lg:h-12" />
                          )}
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="px-1 py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() => {
                                    setIsNavOpen(false)
                                    const coinsText =
                                      document.querySelector('#nav-icon4')
                                    coinsText?.classList?.remove('open')
                                    navigate('/generator')
                                  }}
                                  className={classNames(
                                    'group flex gap-2.5 w-full items-center rounded-md px-2 py-2 text-sm',
                                    active
                                      ? 'bg-violet-500 text-white'
                                      : 'text-gray-900'
                                  )}
                                >
                                  {active ? (
                                    <div>
                                      <GoHome />
                                    </div>
                                  ) : (
                                    <div>
                                      <GoHome />
                                    </div>
                                  )}
                                  <div>Home</div>
                                </button>
                              )}
                            </Menu.Item>
                          </div>
                          <div className="px-1 py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() => {
                                    setIsNavOpen(false)
                                    dispatch(setTag([]))
                                    dispatch(setHasSomethingTyped(''))
                                    dispatch(setHasArticle(''))
                                    const coinsText =
                                      document.querySelector('#nav-icon4')
                                    coinsText?.classList?.remove('open')
                                    dispatch(setHasTitleTag([]))
                                    navigate('/profile')
                                  }}
                                  className={classNames(
                                    'group flex gap-2.5 w-full items-center rounded-md px-2 py-2 text-sm',
                                    active
                                      ? 'bg-violet-500 text-white'
                                      : 'text-gray-900'
                                  )}
                                >
                                  {active ? (
                                    <div>
                                      <BsPerson />
                                    </div>
                                  ) : (
                                    <div>
                                      <BsPerson />
                                    </div>
                                  )}
                                  <div>Profile</div>
                                </button>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() => {
                                    setIsNavOpen(false)
                                    dispatch(setTag([]))
                                    dispatch(setHasSomethingTyped(''))
                                    dispatch(setHasArticle(''))
                                    const coinsText =
                                      document.querySelector('#nav-icon4')
                                    coinsText?.classList?.remove('open')
                                    dispatch(setHasTitleTag([]))
                                    navigate('/transaction-history')
                                  }}
                                  className={classNames(
                                    'group flex gap-2.5 w-full items-center rounded-md px-2 py-2 text-sm',
                                    active
                                      ? 'bg-violet-500 text-white'
                                      : 'text-gray-900'
                                  )}
                                >
                                  {active ? (
                                    <div>
                                      <MdHistory />
                                    </div>
                                  ) : (
                                    <div>
                                      <MdHistory />
                                    </div>
                                  )}
                                  <div>Transactions</div>
                                </button>
                              )}
                            </Menu.Item>
                          </div>
                          <div className="px-1 py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() => {
                                    dispatch(setLogOutModal(true))
                                    setIsNavOpen(false)
                                    const coinsText =
                                      document.querySelector('#nav-icon4')
                                    coinsText?.classList?.remove('open')
                                  }}
                                  className={classNames(
                                    'group flex gap-2.5 w-full items-center rounded-md px-2 py-2 text-sm',
                                    active
                                      ? 'bg-violet-500 text-white'
                                      : 'text-gray-900'
                                  )}
                                >
                                  {active ? (
                                    <div>
                                      <FiLogOut />
                                    </div>
                                  ) : (
                                    <div>
                                      <FiLogOut />
                                    </div>
                                  )}
                                  <div>Sign out</div>
                                </button>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                ) : (
                  <div className="flex gap-5 w-full h-full items-start justify-start">
                    <div className="flex items-center justify-center w-full h-full">
                      <button
                        onClick={() => {
                          setIsNavOpen(false)
                          setToggle(false)
                          dispatch(setTag([]))
                          dispatch(setHasSomethingTyped(''))
                          dispatch(setHasArticle(''))
                          const coinsText = document.querySelector('#nav-icon4')
                          coinsText?.classList?.remove('open')
                          handleClickScroll()
                          navigate('/')
                        }}
                        className="font-bold text-lg text-secondaryLayout hover:text-white transition duration-[0.4s] whitespace-nowrap list-none"
                      >
                        How it works
                      </button>
                    </div>
                    <div className="flex items-center justify-center w-full h-full">
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
                        dispatch(setTag([]))
                        dispatch(setHasSomethingTyped(''))
                        dispatch(setHasArticle(''))
                        const coinsText = document.querySelector('#nav-icon4')
                        coinsText?.classList?.remove('open')
                        navigate('/auth/signin')
                      }}
                      className="font-bold text-lg px-2 py-1 rounded-md bg-white text-primary hover:text-[#7f8389] transition duration-[0.4s] whitespace-nowrap list-none"
                    >
                      Sign in
                    </button>
                  </div>
                )}
              </ul>
            </div>
          </div>
        </nav>
        <LogoutModal />
        <VerifyOtpModal />
      </div>
    </>
  )
}

export default NavbarNewA
