/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import InputField from '../form/InputField'
import CustomButton from '../form/CustomButton'
import { forgotPasswordValidationSchema } from '../../utils/FormValidations'
import { forgotFetchAPi } from '../../redux/slices/auth/forgotPasswordSlice'
import AuthMiddleware from '../../utils/AuthMiddleware'
import { AppDispatch, RootState } from '../../redux/store/store'

export type ForgotProps = {
  email: string
}

const INITIAL_COUNT = 59
const STATUS = {
  STARTED: 'Started',
  STOPPED: 'Stopped',
}
const Forgot = () => {
  const dispatch = useDispatch<AppDispatch>()

  const [secondsRemaining, setSecondsRemaining] = useState(INITIAL_COUNT)
  const [status, setStatus] = useState(STATUS.STOPPED)

  const handleTimerStart = async () => {
    setStatus(STATUS.STARTED)
    setSecondsRemaining(INITIAL_COUNT)
  }

  const { isVerify, forgotModal } = useSelector((state: RootState) => ({
    isVerify: state.ForgotPasswordSlice.isVerify,
    forgotModal: state.ForgotPasswordSlice.forgotModal,
  }))

  const navigate = useNavigate()
  const initialValues = { email: '' }

  useEffect(() => {
    forgotModal.otpVerified && navigate('/reset-password')
  }, [forgotModal.otpVerified, navigate])

  useEffect(() => {
    document.title = 'Forgot password | Title Generator'
  }, [])

  return (
    <AuthMiddleware>
      <div className="flex p-5 ms:p-5 sm:p-5 md:p-10 lg:p-8 gap-8 rounded-xl bg-white w-full h-full ms:max-w-[90%]">
        <div className="flex flex-col gap-2 ms:gap-2 sm:gap-2 md:gap-4 lg:gap-4 h-full w-full justify-center items-center py-10 ms:py-0 lg:py-3">
          <Formik<ForgotProps>
            initialValues={initialValues}
            validationSchema={forgotPasswordValidationSchema}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={(values) => {
              dispatch(forgotFetchAPi(values))
              handleTimerStart()
            }}
          >
            {({ handleSubmit }) => (
              <form
                className="w-full max-w-md sm:max-w-sm ms:max-w-xs"
                onSubmit={handleSubmit}
              >
                <div className="w-full h-full flex flex-col gap-4 ms:gap-4 sm:gap-4 md:gap-8 lg:gap-4 justify-center items-start">
                  <div className="flex items-start">
                    <h1 className="font-medium text-lg ms:text-lg sm:text-xl md:text-2xl lg:text-3xl">
                      Forgot password
                    </h1>
                  </div>
                  <div className="flex flex-col gap-5 ms:gap-5 sm:gap-5 md:gap-10 lg:gap-8 items-start w-full">
                    <p className="font-medium text-xs ms:text-xs sm:text-sm md:text-base lg:text-base text-[#4A5568]">
                      Enter the email address associated with your account and
                      we will send you instructions to reset your password.
                    </p>
                    <InputField
                      type="text"
                      id="email"
                      name="email"
                      inputstyle="w-full  text-textGray text-xs 2xl:text-xl outline-none py-[14px] 2xl:py-[15px] rounded-md bg-secondary border border-[#FFFFFF]/[10%] pl-5 2xl:pl-6 placeholder:text-textGray focus:border-primary"
                      borderstyle="w-full text-textGray text-xs 2xl:text-xl outline-none py-[14px] 2xl:py-[15px] rounded-2xl border border-red-500 bg-transparent pl-5 2xl:pl-6 placeholder:text-textGray"
                      placeholder="E-mail"
                    />
                  </div>
                  <div className="py-2 ms:py-2 sm:py-2 md:py-3 lg:py-3 w-full">
                    <CustomButton
                      type="submit"
                      disabled={isVerify}
                      buttonStyle="w-full py-3 2xl:py-[13px] text-sm sm:text-sm lg:py-3 lg:text-base lg:leading-none 2xl:text-xl font-medium sm:font-medium rounded-md text-white bg-primary shadow-lg disabled:opacity-75  disabled:cursor-not-allowed"
                      loaderSize={20}
                      showLoader
                    >
                      Verify
                    </CustomButton>
                  </div>
                </div>
              </form>
            )}
          </Formik>
          <div className="flex gap-1">
            <div
              className="font-bold text-sm text-primary cursor-pointer"
              onClick={() => {
                navigate('/auth/signin')
              }}
            >
              Sign in
            </div>
          </div>
        </div>
      </div>
    </AuthMiddleware>
  )
}

export default Forgot
