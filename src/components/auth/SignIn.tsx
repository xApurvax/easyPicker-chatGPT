import React, { useEffect } from 'react'
import { Formik } from 'formik'
import InputField from '../form/InputField'
import CustomButton from '../form/CustomButton'
import { registerValidationSchema } from '../../utils/FormValidations'
import { useSelector, useDispatch } from 'react-redux'
import { registerFetchAPi } from '../../redux/slices/auth/registerSlice'
import { useNavigate } from 'react-router-dom'
import { setSignInEffect } from '../../redux/slices/buttonEffectSlice'
import AuthMiddleware from '../../utils/AuthMiddleware'
import { AppDispatch, RootState } from '../../redux/store/store'

type SignupProps = {
  username: string
  password: string
  name: string
  email: string
}

const SignIn = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { isRegisterLoading } = useSelector((state: RootState) => ({
    isRegisterLoading: state.RegisterSlice.isRegisterLoading,
  }))
  const initialValues = { username: '', password: '', name: '', email: '' }

  useEffect(() => {
    document.title = 'Sign up | Title Generator'
  }, [])

  return (
    <AuthMiddleware>
      <div className="flex p-10 ms:p-5 sm:p-5 md:p-10 lg:p-8 gap-8 rounded-xl bg-white w-full h-full ms:max-w-[90%]">
        <div className="flex flex-col gap-4 ms:gap-2 sm:gap-2 md:gap-4 lg:gap-4 h-full w-full justify-center items-center py-10 ms:py-0 lg:py-0">
          <Formik<SignupProps>
            initialValues={initialValues}
            validationSchema={registerValidationSchema}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={(values) => dispatch(registerFetchAPi(values))}
          >
            {({ handleSubmit }) => (
              <form className="w-full max-w-md" onSubmit={handleSubmit}>
                <div className="w-full h-full flex flex-col gap-4 ms:gap-4 sm:gap-4 md:gap-8 lg:gap-4 justify-center items-start">
                  <div className="flex items-start">
                    <h1 className="font-medium text-lg ms:text-lg sm:text-xl md:text-2xl lg:text-3xl">
                      Sign up
                    </h1>
                  </div>
                  <div className="flex flex-col gap-5 ms:gap-5 sm:gap-5 md:gap-10 lg:gap-7 items-start w-full">
                    <div className="flex gap-3 w-full">
                      <InputField
                        type="text"
                        id="username"
                        name="username"
                        inputstyle="w-full text-textGray text-xs 2xl:text-xl outline-none py-[14px] 2xl:py-[15px] rounded-md bg-secondary border border-[#FFFFFF]/[10%] pl-5 2xl:pl-6 placeholder:text-textGray focus:border-primary"
                        borderstyle="w-full text-textGray text-xs 2xl:text-xl outline-none py-[14px] 2xl:py-[15px] rounded-2xl border border-red-500 bg-transparent pl-5 2xl:pl-6 placeholder:text-textGray"
                        placeholder="Username"
                      />
                      <InputField
                        type="text"
                        id="name"
                        name="name"
                        inputstyle="w-full text-textGray text-xs 2xl:text-xl outline-none py-[14px] 2xl:py-[15px] rounded-md bg-secondary border border-[#FFFFFF]/[10%] pl-5 2xl:pl-6 placeholder:text-textGray focus:border-primary"
                        borderstyle="w-full text-textGray text-xs 2xl:text-xl outline-none py-[14px] 2xl:py-[15px] rounded-2xl border border-red-500 bg-transparent pl-5 2xl:pl-6 placeholder:text-textGray"
                        placeholder="Name"
                      />
                    </div>
                    <InputField
                      type="text"
                      id="email"
                      name="email"
                      inputstyle="w-full text-textGray text-xs 2xl:text-xl outline-none py-[14px] 2xl:py-[15px] rounded-md bg-secondary border border-[#FFFFFF]/[10%] pl-5 2xl:pl-6 placeholder:text-textGray focus:border-primary"
                      borderstyle="w-full text-textGray text-xs 2xl:text-xl outline-none py-[14px] 2xl:py-[15px] rounded-2xl border border-red-500 bg-transparent pl-5 2xl:pl-6 placeholder:text-textGray"
                      placeholder="Email"
                    />
                    <InputField
                      type="password"
                      id="password"
                      name="password"
                      inputstyle="w-full text-textGray text-xs 2xl:text-xl outline-none py-[14px] 2xl:py-[15px] rounded-md bg-secondary border border-[#FFFFFF]/[10%] pl-5 2xl:pl-6 placeholder:text-textGray focus:border-primary"
                      borderstyle="w-full text-textGray text-xs 2xl:text-xl outline-none py-[14px] 2xl:py-[15px] rounded-2xl border border-red-500 bg-transparent pl-5 2xl:pl-6 placeholder:text-textGray"
                      placeholder="Password"
                    />
                  </div>
                  <div className="py-2 ms:py-2 sm:py-2 md:py-3 lg:py-3 w-full">
                    <CustomButton
                      type="submit"
                      disabled={isRegisterLoading}
                      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
                        dispatch(setSignInEffect(true))
                      }}
                      onAnimationEnd={() => {
                        dispatch(setSignInEffect(false))
                      }}
                      buttonStyle="w-full py-3 2xl:py-[13px] text-sm sm:text-sm lg:py-3 lg:text-base lg:leading-none 2xl:text-xl font-medium sm:font-medium rounded-md text-white bg-primary shadow-lg"
                      loaderSize={20}
                      showLoader
                    >
                      Sign up
                    </CustomButton>
                  </div>
                </div>
              </form>
            )}
          </Formik>
          <div className="flex flex-col gap-1.5">
            <div className="flex gap-1">
              <p className="font-normal text-xs ms:text-xs sm:text-xs md:text-sm lg:text-sm text-[#4A5568]">
                Already have an account ?{' '}
              </p>
              <div
                className="font-bold text-xs ms:text-xs sm:text-xs md:text-sm lg:text-sm text-primary cursor-pointer"
                onClick={() => {
                  navigate('/auth/signin')
                }}
              >
                Sign in
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthMiddleware>
  )
}

export default SignIn
