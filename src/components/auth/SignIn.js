import React, { useEffect } from 'react'
import { Formik } from 'formik'
import InputField from "../form/InputField";
import CustomButton from "../form/CustomButton";
import { registerValidationSchema } from '../../utils/FormValidations';
import { useSelector, useDispatch } from "react-redux";
import { registerFetchAPi } from '../../redux/slices/auth/registerSlice';
import { useNavigate } from 'react-router-dom';
import {  setSignInEffect } from '../../redux/slices/buttonEffectSlice';
import AuthMiddleware from '../../utils/AuthMiddleware';

const SignIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isRegisterLoading } = useSelector((state) => ({
        isRegisterLoading: state.registerSlice.isRegisterLoading,
      }));
    const initialValues = { username: "", password: "" , name:"", email:"" };
    const handleSignInSubmit = (values) => {
        dispatch(registerFetchAPi(values));
    }

    useEffect(() => {
        document.title = "Sign up | Title Generator"
      }, [])

  return (
    <AuthMiddleware>
      <div className='flex p-10 ms:p-5 sm:p-5 md:p-10 lg:p-8 gap-8 rounded-xl bg-white w-full h-full ms:max-w-[90%]'>
             <div className='flex flex-col gap-4 ms:gap-2 sm:gap-2 md:gap-4 lg:gap-4 h-full w-full justify-center items-center py-10 ms:py-0 lg:py-0'>
                <Formik
                        initialValues={initialValues}
                        validationSchema={registerValidationSchema}
                        validateOnBlur={false}
                        validateOnChange={false}
                        onSubmit={handleSignInSubmit}
                    >
                        {({ handleSubmit }) =>
                        (<form className='w-full max-w-md' onSubmit={handleSubmit} >
                            <div className='w-full h-full flex flex-col gap-4 ms:gap-4 sm:gap-4 md:gap-8 lg:gap-4 justify-center items-start'>
                                <div className='flex items-start'>
                                    <p className='font-medium text-lg ms:text-lg sm:text-xl md:text-2xl lg:text-3xl'>Sign up</p>
                                </div>
                                <div className='flex flex-col gap-5 ms:gap-5 sm:gap-5 md:gap-10 lg:gap-7 items-start w-full'>
                                <div className='flex gap-3 w-full'>
                                    <InputField
                                    type='text'
                                    id='username'
                                    name='username'
                                    inputstyle='w-full text-[#737373] text-xs 2xl:text-xl outline-none py-[14px] 2xl:py-[15px] rounded-md bg-[#EDF2F7] border border-[#FFFFFF]/[10%] pl-5 2xl:pl-6 placeholder:text-[#737373] focus:border-[#544BB9]'
                                    borderstyle='w-full text-[#737373] text-xs 2xl:text-xl outline-none py-[14px] 2xl:py-[15px] rounded-2xl border border-red-500 bg-transparent pl-5 2xl:pl-6 placeholder:text-[#737373]'
                                    placeholder='Username' />
                                    <InputField
                                    type='text'
                                    id='name'
                                    name='name'
                                    inputstyle='w-full text-[#737373] text-xs 2xl:text-xl outline-none py-[14px] 2xl:py-[15px] rounded-md bg-[#EDF2F7] border border-[#FFFFFF]/[10%] pl-5 2xl:pl-6 placeholder:text-[#737373] focus:border-[#544BB9]'
                                    borderstyle='w-full text-[#737373] text-xs 2xl:text-xl outline-none py-[14px] 2xl:py-[15px] rounded-2xl border border-red-500 bg-transparent pl-5 2xl:pl-6 placeholder:text-[#737373]'
                                    placeholder='Name' />
                                </div>
                                <InputField
                                type='text'
                                id='email'
                                name='email'
                                inputstyle='w-full text-[#737373] text-xs 2xl:text-xl outline-none py-[14px] 2xl:py-[15px] rounded-md bg-[#EDF2F7] border border-[#FFFFFF]/[10%] pl-5 2xl:pl-6 placeholder:text-[#737373] focus:border-[#544BB9]'
                                borderstyle='w-full text-[#737373] text-xs 2xl:text-xl outline-none py-[14px] 2xl:py-[15px] rounded-2xl border border-red-500 bg-transparent pl-5 2xl:pl-6 placeholder:text-[#737373]'
                                placeholder='Email' />
                                <InputField
                                type='password'
                                id='password'
                                name='password'
                                inputstyle='w-full text-[#737373] text-xs 2xl:text-xl outline-none py-[14px] 2xl:py-[15px] rounded-md bg-[#EDF2F7] border border-[#FFFFFF]/[10%] pl-5 2xl:pl-6 placeholder:text-[#737373] focus:border-[#544BB9]'
                                borderstyle='w-full text-[#737373] text-xs 2xl:text-xl outline-none py-[14px] 2xl:py-[15px] rounded-2xl border border-red-500 bg-transparent pl-5 2xl:pl-6 placeholder:text-[#737373]'
                                placeholder='Password' />
                                </div>
                                <div className='py-2 ms:py-2 sm:py-2 md:py-3 lg:py-3 w-full'>
                                <CustomButton
                                    type='submit'
                                    disabled={isRegisterLoading}
                                    onClick={(e) => {
                                    dispatch(setSignInEffect(true));
                                    }}
                                    onAnimationEnd={() => {
                                    dispatch(setSignInEffect(false));
                                    }}
                                    buttonStyle="w-full py-[12px] 2xl:py-[13px] text-sm sm:text-sm lg:py-[12px] lg:text-[16px] 2xl:text-xl font-medium sm:font-medium rounded-md text-white bg-[#544BB9] shadow-lg"
                                    loaderSize={20}
                                    showLoader>
                                    Sign up
                                </CustomButton >
                                </div>
                            </div>
                        </form>)}
                </Formik>
                <div className='flex flex-col gap-1.5'>
                    <div className='flex gap-1'>
                            <p className='font-normal text-xs ms:text-xs sm:text-xs md:text-sm lg:text-sm text-[#4A5568]'>Already have an account ? </p>
                            <div className='font-bold text-xs ms:text-xs sm:text-xs md:text-sm lg:text-sm text-[#544BB9] cursor-pointer' 
                            onClick={() => { navigate('/auth/signin')}}>Sign in</div>
                    </div>
                        {/* <div className='flex gap-1'>
                            <p className='font-normal text-sm text-[#4A5568]'>You can</p>
                            <div className='font-bold text-sm text-[#544BB9] cursor-pointer' onClick={() => { navigate('/auth/login')}}>Login</div>
                        </div> */}
                    </div>
                </div>
            {/* <div className='hidden md:flex justify-center items-center px-4 text-center w-full'>
                    <p className='font-medium text-base ms:text-xs sm:text-sm md:text-base lg:text-base text-[#4A5568]'>Log in/ Sign in first to access AI Headline Generator</p>
            </div> */}
      </div>
      </AuthMiddleware>
  )
}

export default SignIn