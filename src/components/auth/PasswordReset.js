import React,{useEffect} from 'react'
import { Formik } from 'formik'
import InputField from "../form/InputField";
import CustomButton from "../form/CustomButton";
import { ResetPasswordValidationSchema } from '../../utils/FormValidations';
import { useSelector, useDispatch } from "react-redux";
import { resetPasswordApi, setResetPasswordStatus } from '../../redux/slices/auth/forgotPasswordSlice';
import { useNavigate } from 'react-router-dom';
import AuthMiddleware from '../../utils/AuthMiddleware';
import Cookies from 'js-cookie';
import ResetPasswordMiddleware from '../../utils/ResetPasswordMiddleware';

const PasswordReset = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isPasswordChange,forgotModal,resetPasswordStatus } = useSelector((state) => ({
        isPasswordChange: state.forgotPasswordSlice.isPasswordChange,
        forgotModal: state.forgotPasswordSlice.forgotModal,
        resetPasswordStatus: state.forgotPasswordSlice.resetPasswordStatus,
      }));
    const initialValues = { password: "", confirmPassword: "" };

    const handleResetPassword = (values) => {
        dispatch(resetPasswordApi({ email: forgotModal?.email === null ? Cookies.get('user_mail') : forgotModal?.email , password:values.password }));
    }

    useEffect(() => {
    if(resetPasswordStatus === 200){
        navigate('/auth/signin')
    }
    dispatch(setResetPasswordStatus(0))
    }, [resetPasswordStatus])
    
    useEffect(() => {
        document.title = "Reset Password | Title Generator"
      }, [])

  return (
    <ResetPasswordMiddleware>
    <AuthMiddleware>
    <div className='flex p-5 ms:p-5 sm:p-5 md:p-10 lg:p-10 gap-8 rounded-xl bg-white w-full h-full ms:max-w-[90%]'>
        <div className='flex flex-col gap-2 ms:gap-2 sm:gap-2 md:gap-4 lg:gap-4 h-full w-full justify-center items-center py-0 ms:py-0 lg:py-10'>
            <Formik
                    initialValues={initialValues}
                    validationSchema={ResetPasswordValidationSchema}
                    validateOnBlur={false}
                    validateOnChange={false}
                    onSubmit={handleResetPassword}
                >
                    {({ handleSubmit }) =>
                    (<form className='w-full max-w-md' onSubmit={handleSubmit} >
                        <div className='w-full h-full flex flex-col gap-4 ms:gap-4 sm:gap-4 md:gap-8 lg:gap-8 justify-center items-start'>
                            <div className='flex items-start w-full'>
                                <p className='font-medium text-lg ms:text-lg sm:text-xl md:text-2xl lg:text-3xl'>Reset password</p>
                            </div>
                            <div className='flex flex-col gap-5 ms:gap-5 sm:gap-5 md:gap-10 lg:gap-10 items-start w-full'>
                            <InputField
                            type='password'
                            id='password'
                            name='password'
                            inputstyle='w-full  text-[#737373] text-xs 2xl:text-xl outline-none py-[14px] 2xl:py-[15px] rounded-md bg-[#EDF2F7] border border-[#FFFFFF]/[10%] pl-5 2xl:pl-6 placeholder:text-[#737373]'
                            borderstyle='w-full text-[#737373] text-xs 2xl:text-xl outline-none py-[14px] 2xl:py-[15px] rounded-2xl border border-red-500 bg-transparent pl-5 2xl:pl-6 placeholder:text-[#737373]'
                            placeholder='Enter new password' />
                            <InputField
                            type='password'
                            id='confirmPassword'
                            name='confirmPassword'
                            inputstyle='w-full  text-[#737373] text-xs 2xl:text-xl outline-none py-[14px] 2xl:py-[15px] rounded-md bg-[#EDF2F7] border border-[#FFFFFF]/[10%] pl-5 2xl:pl-6 placeholder:text-[#737373]'
                            borderstyle='w-full text-[#737373] text-xs 2xl:text-xl outline-none py-[14px] 2xl:py-[15px] rounded-2xl border border-red-500 bg-transparent pl-5 2xl:pl-6 placeholder:text-[#737373]'
                            placeholder='Confirm new password' />
                            </div> 
                            <div className='py-2 ms:py-2 sm:py-2 md:py-3 lg:py-3 w-full'>
                            <CustomButton
                                type='submit'
                                disabled={isPasswordChange}
                                buttonStyle="w-full py-[12px] 2xl:py-[13px] text-base sm:text-sm lg:py-[12px] lg:text-[16px] 2xl:text-xl font-medium sm:font-medium rounded-md text-white bg-[#544BB9] shadow-lg  disabled:cursor-not-allowed"
                                loaderSize={20}
                                showLoader>
                                Change Password
                            </CustomButton >
                            </div>
                        </div>
                    </form>)}
            </Formik>
        </div>
    </div>
    </AuthMiddleware>
    </ResetPasswordMiddleware>
  )
}

export default PasswordReset