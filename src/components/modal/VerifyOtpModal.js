import React, { useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import CustomButton from '../form/CustomButton'
import { twoDigits } from '../../utils/helper'
import {
  forgotFetchAPi,
  forgotOtpVerifyApi,
} from '../../redux/slices/auth/forgotPasswordSlice'
import OtpInput from 'react-otp-input'
import { useSelector, useDispatch } from 'react-redux'

const INITIAL_COUNT = 59
const STATUS = {
  STARTED: 'Started',
  STOPPED: 'Stopped',
}

const VerifyOtpModal = () => {
  const dispatch = useDispatch()
  const [otp, setOtp] = useState('')
  const [secondsRemaining, setSecondsRemaining] = useState(INITIAL_COUNT)
  const [status, setStatus] = useState(STATUS.STOPPED)

  const secondsToDisplay = secondsRemaining % 60
  const minutesRemaining = (secondsRemaining - secondsToDisplay) % 60
  const minutesToDisplay = minutesRemaining % 60

  const { isLoading, forgotModal, isVerified } = useSelector((state) => ({
    isLoading: state.generateHeadlineSlice.isLoading,
    isVerify: state.forgotPasswordSlice.isVerify,
    isVerified: state.forgotPasswordSlice.isVerified,
    forgotModal: state.forgotPasswordSlice.forgotModal,
    minute: state.generateHeadlineSlice.minute,
    second: state.forgotPasswordSlice.second,
  }))

  useInterval(
    () => {
      if (secondsRemaining > 0) setSecondsRemaining(secondsRemaining - 1)
      else setStatus(STATUS.STOPPED)
    },
    status === STATUS.STARTED ? 1000 : null
  )

  function useInterval(callback, delay) {
    const savedCallback = useRef()

    useEffect(() => {
      savedCallback.current = callback
    }, [callback])

    useEffect(() => {
      function tick() {
        savedCallback.current()
      }
      if (delay !== null) {
        let id = setInterval(tick, delay)
        return () => clearInterval(id)
      }
    }, [delay])
  }

  const handleOtp = (otp) => setOtp(otp)

  const handleTimerStart = async () => {
    setStatus(STATUS.STARTED)
    setSecondsRemaining(INITIAL_COUNT)
  }

  const handleOtpVerify = (e) => {
    e.preventDefault()
    dispatch(forgotOtpVerifyApi({ email: forgotModal?.email, otp }))
    setOtp('')
  }

  return (
    <>
      <Transition appear show={forgotModal?.isVisible || false} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {}}>
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
          <div className="fixed inset-0 overflow-y-auto bg-transparent">
            <div className="flex p-3 min-h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel>
                  <div className="p-[10px] ms:p-[30px] flex flex-col gap-[40px] items-center bg-[#FFFFFF] border max-w-[500px] rounded-[10px]">
                    <form onSubmit={handleOtpVerify}>
                      <div className="flex flex-col items-center gap-3 ms:gap-3 sm:gap-3 md:gap-6 lg:gap-6">
                        <div className="flex flex-col gap-3">
                          <h1 className="text-center text-black text-lg ms:text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-[21px] tracking-wide">
                            OTP Verification
                          </h1>
                          <p className="text-center text-black text-lg sm:text-md font-normal leading-[21px] tracking-wide">
                            Please check your email. We sent a OTP on your
                            registered email id.
                          </p>
                        </div>
                        <div className="flex flex-col gap-4">
                          <OtpInput
                            inputStyle="text-xl sm:!p-2 sm:!w-[35px] rounded-[5px] border-[1px] border-solid border-[#000000]"
                            value={otp}
                            isInputNum={true}
                            onChange={handleOtp}
                            numInputs={6}
                            separator={<span>&nbsp; &nbsp;</span>}
                          />
                          <div className="flex gap-2 justify-center items-center">
                            {twoDigits(minutesToDisplay) === '00' &&
                            twoDigits(secondsToDisplay) === '00' ? (
                              <>
                                <p className="font-semibold text-base ms:text-xs sm:text-sm md:text-base lg:text-base text-[#4A5568] ">
                                  Didn't receive OTP ?{' '}
                                </p>
                                <div
                                  className="font-bold text-base ms:text-xs sm:text-sm md:text-base lg:text-base text-primary cursor-pointer"
                                  onClick={() => {
                                    dispatch(
                                      forgotFetchAPi({
                                        email: forgotModal?.email,
                                      })
                                    )
                                    handleTimerStart()
                                  }}
                                >
                                  resend OTP
                                </div>
                              </>
                            ) : (
                              <p className="font-normal text-base ms:text-xs sm:text-sm md:text-base lg:text-base text-[#4A5568]">
                                Resend OTP in{' '}
                                <span className="font-semibold text-primary">
                                  {twoDigits(minutesToDisplay)}:
                                  {twoDigits(secondsToDisplay)}
                                </span>
                              </p>
                            )}
                          </div>
                        </div>
                        <CustomButton
                          type="submit"
                          loaderSize={15}
                          showLoader={isVerified}
                          disabled={otp.length < 6 || isLoading}
                          buttonStyle="w-[90px] mt-[20px] ms:mt-[5px] sm:mt-[10px] md:mt-[20px] lg:mt-[20px] h-[40px] text-sm font-bold rounded-md text-white bg-primary"
                        >
                          Submit
                        </CustomButton>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default VerifyOtpModal
