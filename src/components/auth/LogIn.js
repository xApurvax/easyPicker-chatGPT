import React from 'react'
import { Formik } from 'formik'
import logo from "../../assets/men-holding-phone.svg";
import InputField from "../form/InputField";
import CustomButton from "../form/CustomButton";
import { LoginValidationSchema } from '../../utils/FormValidations';
import { useSelector, useDispatch } from "react-redux";
import { registerFetchAPi } from '../../redux/slices/auth/registerSlice';
import toast, { Toaster } from 'react-hot-toast';
import { loginFetchAPi } from '../../redux/slices/auth/loginSlice';
import { useNavigate } from 'react-router-dom';
import { setLoginEffect } from '../../redux/slices/buttonEffectSlice';
import AuthMiddleware from '../../utils/AuthMiddleware';
import ParallaxText from '../layout/AnimationLetter';

const LogIn = () => {
    const dispatch = useDispatch();

    const { generateHeadlineEffect,isLoading,saveResult,reGenerate,allTitles,specialTags,hasTitleTag,copyAllSpecialTags,token,isSuccess } = useSelector((state) => ({
        generateHeadlineEffect: state.buttonEffectSlice.generateHeadlineEffect,
        saveResult: state.buttonEffectSlice.saveResult,
        reGenerate: state.buttonEffectSlice.reGenerate,
        isLoading: state.generateHeadlineSlice.isLoading,
        allTitles: state.generateHeadlineSlice.allTitles,
        specialTags: state.generateHeadlineSlice.specialTags,
        hasTitleTag: state.generateHeadlineSlice.hasTitleTag,
        copyAllSpecialTags: state.generateHeadlineSlice.copyAllSpecialTags,
        token: state.loginSlice.allData?.token?.access,
        isSuccess: state.loginSlice.isSuccess,
      }));
    const navigate = useNavigate();
    const initialValues = { username: "", password: "" };
    const handleLoginSubmit = (values) => {
         dispatch(loginFetchAPi(values))
        //  .then(() => {
        //     navigate('/');
        //   });
    }
    // const handleLoginSubmit = async (values) => {
    //     try {
    //         await dispatch(loginFetchAPi(values));
    //         navigate('/');
    //       } catch(error) {
    //         // handle any rejections/errors
    //       }
    // }

  return (
    <AuthMiddleware>
        <div className='flex p-10 ms:p-5 sm:p-5 md:p-10 lg:p-5 gap-8 rounded-xl bg-white w-full h-full  ms:max-w-[300px] sm:max-w-[400px] md:max-w-[700px] lg:max-w-[980px]'>
            <div className='flex flex-col gap-4 ms:gap-2 sm:gap-2 md:gap-4 lg:gap-4 h-full w-full justify-center items-center py-10 ms:py-0 lg:py-2'>
            <Formik
                    initialValues={initialValues}
                    validationSchema={LoginValidationSchema}
                    validateOnBlur={false}
                    validateOnChange={false}
                    onSubmit={handleLoginSubmit}
                >
                    {({ handleSubmit }) =>
                    (<form className='w-full max-w-md' onSubmit={handleSubmit} >
                        <div className='w-full h-full flex flex-col gap-8 ms:gap-4 sm:gap-4 md:gap-8 lg:gap-8 justify-center items-start'>
                            <div className='flex items-start'>
                                <p className='font-medium text-3xl ms:text-lg sm:text-xl md:text-2xl lg:text-3xl'>Sign in</p>
                            </div>
                            <div className='flex flex-col gap-10 ms:gap-5 sm:gap-5 md:gap-10 lg:gap-10 items-start w-full'>
                            <InputField
                            type='text'
                            id='username'
                            name='username'
                            inputstyle='w-full  text-[#737373] text-xs 2xl:text-xl outline-none py-[14px] 2xl:py-[15px] rounded-md bg-[#EDF2F7] border border-[#FFFFFF]/[10%] pl-5 2xl:pl-6 placeholder:text-[#737373]'
                            borderstyle='w-full text-[#737373] text-xs 2xl:text-xl outline-none py-[14px] 2xl:py-[15px] rounded-2xl border border-red-500 bg-transparent pl-5 2xl:pl-6 placeholder:text-[#737373]'
                            placeholder='Username or E-mail' />
                            <div className='flex flex-col gap-4 ms:gap-2 sm:gap-2 md:gap-4 lg:gap-4 items-start w-full'>
                                <InputField
                                type='password'
                                id='password'
                                name='password'
                                inputstyle='w-full text-[#737373] text-xs 2xl:text-xl outline-none py-[14px] 2xl:py-[15px] rounded-md bg-[#EDF2F7] border border-[#FFFFFF]/[10%] pl-5 2xl:pl-6 placeholder:text-[#737373]'
                                borderstyle='w-full text-[#737373] text-xs 2xl:text-xl outline-none py-[14px] 2xl:py-[15px] rounded-2xl border border-red-500 bg-transparent pl-5 2xl:pl-6 placeholder:text-[#737373]'
                                placeholder='Password' />
                                <div className='flex items-center justify-end w-full font-semibold text-base ms:text-xs sm:text-sm md:text-base lg:text-base text-[#544BB9] cursor-pointer' onClick={() => {{navigate('/auth/forgot')}}}>Forgot password?</div>
                            </div>
                            </div>
                            <div className='py-3 ms:py-0 sm:py-0 md:py-3 lg:py-3 w-full'>
                            <CustomButton
                                type='submit'
                                disabled={isSuccess}
                                onClick={(e) => {
                                dispatch(setLoginEffect(true));
                                }}
                                onAnimationEnd={() => {
                                dispatch(setLoginEffect(false));
                                }}
                                buttonStyle="w-full py-[12px] 2xl:py-[13px] text-base sm:text-sm lg:py-[12px] lg:text-[16px] 2xl:text-xl font-medium sm:font-medium rounded-md text-white bg-[#544BB9] shadow-lg"
                                loaderSize={20}
                                showLoader>
                                Sign in
                            </CustomButton >
                            </div>
                        </div>
                    </form>)}
            </Formik>
                <div className='flex gap-1'>
                   <div className='font-bold text-sm ms:text-xs sm:text-xs md:text-sm lg:text-sm text-[#544BB9] cursor-pointer' onClick={() => {navigate('/auth/register')}}>Register</div>
                   <p className='font-normal text-sm ms:text-xs sm:text-xs md:text-sm lg:text-sm text-[#4A5568]'>to Sign up for an account </p>   
                </div>
            </div>
            {/* <div className='hidden md:flex md:flex-col gap-10 justify-center items-center text-center px-4 w-full bg-[#544BB9] rounded-md'>
                    <p className='font-medium text-base text-[#4A5568]'>Log in/ Sign in first to access AI Headline Generator</p>
                    <ParallaxText baseVelocity={-5}>Log in/ Sign in first to access AI Headline Generator</ParallaxText>
                    <ParallaxText baseVelocity={5}>Log in/ Sign in first to access AI Headline Generator</ParallaxText>
            </div> */}
        </div>
    </AuthMiddleware>
  )
}

export default LogIn