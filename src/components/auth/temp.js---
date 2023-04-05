import React from 'react'
import { Formik } from 'formik'
import logo from "../../assets/men-holding-phone.svg";
import InputField from "../form/InputField";
import CustomButton from "../form/CustomButton";
import { registerValidationSchema } from '../../utils/FormValidations';
import { useSelector, useDispatch } from "react-redux";
import { registerFetchAPi } from '../../redux/slices/auth/registerSlice';
import toast, { Toaster } from 'react-hot-toast';

const LogIn = () => {
    const dispatch = useDispatch();
    const initialValues = { username: "", password: "" , name:"", email:"" };
    const handleLoginSubmit = (values) => {
        dispatch(registerFetchAPi(values));
    }
  return (
        <div className='flex h-screen max-h-[90vh]'>
             <Toaster
                position="top-right"
                reverseOrder={false}
             />
            <div className='w-1/2 h-full flex items-center justify-center'>
                <div className='flex flex-col gap-14 relative'>
                    <div className='flex flex-col gap-4'>
                        <p className='font-semibold text-5xl'>Sign in to</p>
                        <div className='flex items-center gap-4'>
                            {/* <div className='flex'>
                                <span className='font-semibold text-5xl text-[#544BB9] hover:text-[#4A5568]'>A</span>
                                <span className='font-semibold text-5xl text-[#4A5568] hover:text-[#544BB9]'>I</span>
                            </div> */}
                            {/* <span  className='font-semibold text-5xl'>AI</span> */}
                            <p className='font-medium text-3xl'>AI Headline Generator</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-1.5'>
                        <p className='font-normal text-sm text-[#4A5568]'>Already have an account</p>
                        <div className='flex gap-1'>
                            <p className='font-normal text-sm text-[#4A5568]'>You can</p>
                            <a className='font-bold text-sm text-[#544BB9]' href='/'>Login</a>
                        </div>
                    </div>
                    <div className='absolute top-1/2 -right-40'>
                    <img src={logo} alt="auth" className="w-56 cursor-pointer" />
                    </div>
                </div>
            </div>
            <div className='w-1/2 h-full'>
                <div className='flex h-full w-full justify-center items-center pt-32'>
                <Formik
                        initialValues={initialValues}
                        validationSchema={registerValidationSchema}
                        validateOnBlur={false}
                        validateOnChange={false}
                        onSubmit={handleLoginSubmit}
                    >
                        {({ handleSubmit }) =>
                        (<form className='w-full max-w-md' onSubmit={handleSubmit} >
                            <div className='w-full h-full flex flex-col gap-8 justify-center items-start'>
                                <div className='flex items-start'>
                                    <p className='font-medium text-3xl'>Sign in</p>
                                </div>
                                <div className='flex flex-col gap-10 items-start w-full'>
                                <InputField
                                type='text'
                                id='username'
                                name='username'
                                inputstyle='w-full text-[#737373] text-xs 2xl:text-xl outline-none py-[14px] 2xl:py-[15px] rounded-md bg-[#EDF2F7] border border-[#FFFFFF]/[10%] pl-5 2xl:pl-6 placeholder:text-[#737373]'
                                borderstyle='w-full text-[#737373] text-xs 2xl:text-xl outline-none py-[14px] 2xl:py-[15px] rounded-2xl border border-red-500 bg-transparent pl-5 2xl:pl-6 placeholder:text-[#737373]'
                                placeholder='Username' />

                                <InputField
                                type='text'
                                id='name'
                                name='name'
                                inputstyle='w-full text-[#737373] text-xs 2xl:text-xl outline-none py-[14px] 2xl:py-[15px] rounded-md bg-[#EDF2F7] border border-[#FFFFFF]/[10%] pl-5 2xl:pl-6 placeholder:text-[#737373]'
                                borderstyle='w-full text-[#737373] text-xs 2xl:text-xl outline-none py-[14px] 2xl:py-[15px] rounded-2xl border border-red-500 bg-transparent pl-5 2xl:pl-6 placeholder:text-[#737373]'
                                placeholder='Name' />

                                <InputField
                                type='text'
                                id='email'
                                name='email'
                                inputstyle='w-full text-[#737373] text-xs 2xl:text-xl outline-none py-[14px] 2xl:py-[15px] rounded-md bg-[#EDF2F7] border border-[#FFFFFF]/[10%] pl-5 2xl:pl-6 placeholder:text-[#737373]'
                                borderstyle='w-full text-[#737373] text-xs 2xl:text-xl outline-none py-[14px] 2xl:py-[15px] rounded-2xl border border-red-500 bg-transparent pl-5 2xl:pl-6 placeholder:text-[#737373]'
                                placeholder='Email' />

                                <InputField
                                type='password'
                                id='password'
                                name='password'
                                inputstyle='w-full text-[#737373] text-xs 2xl:text-xl outline-none py-[14px] 2xl:py-[15px] rounded-md bg-[#EDF2F7] border border-[#FFFFFF]/[10%] pl-5 2xl:pl-6 placeholder:text-[#737373]'
                                borderstyle='w-full text-[#737373] text-xs 2xl:text-xl outline-none py-[14px] 2xl:py-[15px] rounded-2xl border border-red-500 bg-transparent pl-5 2xl:pl-6 placeholder:text-[#737373]'
                                placeholder='Password' />
                               
                                </div>
                                <div className='py-3 w-full'>
                                <CustomButton
                                    type='submit'
                                    // disabled={isLoading}
                                    buttonStyle="w-full py-[12px] 2xl:py-[13px] text-base sm:text-sm lg:py-[12px] lg:text-[16px] 2xl:text-xl font-medium sm:font-medium rounded-md text-white bg-[#544BB9] shadow-lg"
                                    loaderSize={20}
                                    showLoader>
                                    Sign in
                                </CustomButton >
                                </div>
                            </div>
                        </form>)}
                </Formik>
                </div>
            </div>
        </div>
  )
}

export default LogIn