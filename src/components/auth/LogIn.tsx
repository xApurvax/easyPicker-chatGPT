import React, { useEffect } from 'react'
import { Formik } from 'formik'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import InputField from '../form/InputField'
import CustomButton from '../form/CustomButton'
import { loginFetchAPi } from '../../redux/slices/auth/loginSlice'
import { setLoginEffect } from '../../redux/slices/buttonEffectSlice'
import { LoginValidationSchema } from '../../utils/FormValidations'
import AuthMiddleware from '../../utils/AuthMiddleware'
import { AppDispatch, RootState } from '../../redux/store/store'

export type LoginProps = {
  username: string
  password: string
}
const LogIn = () => {
  const dispatch = useDispatch<AppDispatch>()

  const { isSuccess } = useSelector((state: RootState) => ({
    isSuccess: state.LoginSlice.isSuccess,
  }))
  const navigate = useNavigate()
  const initialValues = { username: '', password: '' }

  useEffect(() => {
    document.title = 'Sign in | Title Generator'
  }, [])

  return (
    <AuthMiddleware>
      <div className="flex p-10 ms:p-5 sm:p-5 md:p-10 lg:p-5 gap-8 rounded-xl bg-white w-full h-full  ms:max-w-[90%]">
        <div className="flex flex-col gap-4 ms:gap-2 sm:gap-2 md:gap-4 lg:gap-4 h-full w-full justify-center items-center py-10 ms:py-0 lg:py-2">
          <Formik<LoginProps>
            initialValues={initialValues}
            validationSchema={LoginValidationSchema}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={(values) => dispatch(loginFetchAPi(values))}
          >
            {({ handleSubmit }) => (
              <form className="w-full max-w-md" onSubmit={handleSubmit}>
                <div className="w-full h-full flex flex-col gap-4 ms:gap-4 sm:gap-4 md:gap-8 lg:gap-8 justify-center items-start">
                  <div className="flex items-start">
                    <h1 className="font-medium text-lg ms:text-lg sm:text-xl md:text-2xl lg:text-3xl">
                      Sign in
                    </h1>
                  </div>
                  <div className="flex flex-col gap-10 ms:gap-5 sm:gap-5 md:gap-10 lg:gap-10 items-start w-full">
                    <InputField
                      type="text"
                      id="username"
                      name="username"
                      inputstyle="w-full  text-textGray text-xs 2xl:text-xl outline-none py-[14px] 2xl:py-[15px] rounded-md bg-secondary border border-[#FFFFFF]/[10%] pl-5 2xl:pl-6 placeholder:text-textGray focus:border-primary"
                      borderstyle="w-full text-textGray text-xs 2xl:text-xl outline-none py-[14px] 2xl:py-[15px] rounded-2xl border border-red-500 bg-transparent pl-5 2xl:pl-6 placeholder:text-textGray"
                      placeholder="E-mail or username"
                    />
                    <div className="flex flex-col gap-2 ms:gap-2 sm:gap-2 md:gap-4 lg:gap-4 items-start w-full">
                      <InputField
                        type="password"
                        id="password"
                        name="password"
                        inputstyle="w-full text-textGray text-xs 2xl:text-xl outline-none py-[14px] 2xl:py-[15px] rounded-md bg-secondary border border-[#FFFFFF]/[10%] pl-5 2xl:pl-6 placeholder:text-textGray focus:border-primary"
                        borderstyle="w-full text-textGray text-xs 2xl:text-xl outline-none py-[14px] 2xl:py-[15px] rounded-2xl border border-red-500 bg-transparent pl-5 2xl:pl-6 placeholder:text-textGray"
                        placeholder="Password"
                      />
                      <div
                        className="flex items-center justify-end w-full font-semibold text-xs ms:text-xs sm:text-sm md:text-base lg:text-base text-primary cursor-pointer"
                        onClick={() => {
                          navigate('/auth/forgot')
                        }}
                      >
                        Forgot password?
                      </div>
                    </div>
                  </div>
                  <div className="py-0 ms:py-0 sm:py-0 md:py-3 lg:py-3 w-full">
                    <CustomButton
                      type="submit"
                      disabled={isSuccess}
                      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
                        dispatch(setLoginEffect(true))
                      }}
                      onAnimationEnd={() => {
                        dispatch(setLoginEffect(false))
                      }}
                      buttonStyle="w-full py-3 2xl:py-[13px] text-base sm:text-sm lg:py-3 lg:text-base lg:leading-none 2xl:text-xl font-medium sm:font-medium rounded-md text-white bg-primary shadow-lg"
                      loaderSize={20}
                      showLoader
                    >
                      Sign in
                    </CustomButton>
                  </div>
                </div>
              </form>
            )}
          </Formik>
          <div className="flex gap-1">
            <div
              className="font-bold text-xs ms:text-xs sm:text-xs md:text-sm lg:text-sm text-primary cursor-pointer"
              onClick={() => {
                navigate('/auth/register')
              }}
            >
              Sign up
            </div>
            <p className="font-normal text-xs ms:text-xs sm:text-xs md:text-sm lg:text-sm text-[#4A5568]">
              for an account{' '}
            </p>
          </div>
        </div>
      </div>
    </AuthMiddleware>
  )
}

export default LogIn
