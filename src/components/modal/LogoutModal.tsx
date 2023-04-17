import React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logOut, setLogOutModal } from '../../redux/slices/auth/loginSlice'
import { IoClose } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { AppDispatch, RootState } from '../../redux/store/store'
import { setHasTitleTag } from '../../redux/slices/generateHeadlineSlice'

export const LogoutModal = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { logOutModal } = useSelector((state: RootState) => ({
    logOutModal: state.LoginSlice.logOutModal,
  }))
  return (
    <Transition appear show={logOutModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => {
          dispatch(setLogOutModal(false))
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full relative max-w-[360px] ms:max-w-[200px] sm:max-w-[250px] md:max-w-[300px] p-5 transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 mt-2 ms:mt-2 sm:mt-2 md:mt-4 lg:mt-4 ms:text-xs sm:text-base md:text-xl lg:text-xl"
                >
                  Are you sure you want to Sign out ?
                </Dialog.Title>
                <div
                  onClick={() => {
                    dispatch(setLogOutModal(false))
                  }}
                  className="absolute top-3 right-3 text-primary text-2xl ms:text-lg sm:text-lg md:text-2xl lg:text-2xl cursor-pointer"
                >
                  <IoClose />
                </div>
                <div className="mt-5 ms:mt-5 sm:mt-6 md:mt-8 lg:mt-10 flex gap-5 justify-end">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-primary disabled:opacity-3 px-5 py-2 ms:px-2 sm:px-3 md:px-5 lg:px-5 
                    ms:py-1 sm:py-1 md:py-2 lg:py-2 text-sm font-medium text-white hover:bg-[#966FD6] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 tracking-widest"
                    onClick={() => {
                      dispatch(logOut())
                      dispatch(setHasTitleTag([]))
                      navigate('/auth/signin')
                    }}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border-1 px-3 py-2 ms:px-2 sm:px-2 md:px-3 lg:px-3 ms:py-1 sm:py-1 md:py-2 lg:py-2 text-sm font-medium text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 border-[1px] border-solid border-primary"
                    onClick={() => {
                      dispatch(setLogOutModal(false))
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
