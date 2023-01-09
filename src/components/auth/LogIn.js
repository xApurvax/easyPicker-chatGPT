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
      dispatch(loginFetchAPi(values));
  }
  return (
        <div className='flex p-5 gap-8 w-full h-full'>
            <div className='flex flex-col gap-4 h-full w-full justify-center items-center py-10'>
            <Formik
                    initialValues={initialValues}
                    validationSchema={LoginValidationSchema}
                    validateOnBlur={false}
                    validateOnChange={false}
                    onSubmit={handleLoginSubmit}
                >
                    {({ handleSubmit }) =>
                    (<form className='w-full max-w-md' onSubmit={handleSubmit} >
                        <div className='w-full h-full flex flex-col gap-8 justify-center items-start'>
                            <div className='flex items-start'>
                                <p className='font-medium text-3xl'>Log in</p>
                            </div>
                            <div className='flex flex-col gap-10 items-start w-full'>
                            <InputField
                            type='text'
                            id='username'
                            name='username'
                            inputstyle='w-full  text-[#737373] text-xs 2xl:text-xl outline-none py-[14px] 2xl:py-[15px] rounded-md bg-[#EDF2F7] border border-[#FFFFFF]/[10%] pl-5 2xl:pl-6 placeholder:text-[#737373]'
                            borderstyle='w-full text-[#737373] text-xs 2xl:text-xl outline-none py-[14px] 2xl:py-[15px] rounded-2xl border border-red-500 bg-transparent pl-5 2xl:pl-6 placeholder:text-[#737373]'
                            placeholder='Username' />
                            <div className='flex flex-col gap-4 items-start w-full'>
                                <InputField
                                type='password'
                                id='password'
                                name='password'
                                inputstyle='w-full text-[#737373] text-xs 2xl:text-xl outline-none py-[14px] 2xl:py-[15px] rounded-md bg-[#EDF2F7] border border-[#FFFFFF]/[10%] pl-5 2xl:pl-6 placeholder:text-[#737373]'
                                borderstyle='w-full text-[#737373] text-xs 2xl:text-xl outline-none py-[14px] 2xl:py-[15px] rounded-2xl border border-red-500 bg-transparent pl-5 2xl:pl-6 placeholder:text-[#737373]'
                                placeholder='Password' />
                                <a className='flex items-center justify-end w-full font-semibold text-base text-[#4A5568]' href='/'>Forgot password?</a>
                            </div>
                            </div>
                            <div className='py-3 w-full'>
                            <CustomButton
                                type='submit'
                                disabled={isSuccess}
                                buttonStyle="w-full py-[12px] 2xl:py-[13px] text-base sm:text-sm lg:py-[12px] lg:text-[16px] 2xl:text-xl font-medium sm:font-medium rounded-md text-white bg-[#544BB9] shadow-lg"
                                loaderSize={20}
                                showLoader>
                                Log in
                            </CustomButton >
                            </div>
                        </div>
                    </form>)}
            </Formik>
                <div className='flex gap-1'>
                    <p className='font-normal text-sm text-[##7D7D7D]'>Don’t have an Account ? <p className='font-bold text-sm text-[#544BB9] cursor-pointer' onClick={() => {navigate('/auth/register')}}>Register</p>
                    </p>     
                </div>
            </div>
            <div className='flex justify-center items-center text-center px-4'>
                    <p className='font-medium text-base text-[#4A5568]'>Log in/ Sign in first to access AI Headline Generator</p>
            </div>
        </div>
  )
}

export default LogIn