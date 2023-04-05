import React,{useEffect, useState} from 'react'
import { Formik } from 'formik'
import InputField from "../form/InputField";
import CustomButton from "../form/CustomButton";
import VerifyOtpModal from "../modal/VerifyOtpModal";
import { forgotPasswordValidationSchema } from '../../utils/FormValidations';
import { useSelector, useDispatch } from "react-redux";
import OtpInput from 'react-otp-input';
import { forgotFetchAPi, forgotOtpVerifyApi } from '../../redux/slices/auth/forgotPasswordSlice';
import { useNavigate } from 'react-router-dom';
import AuthMiddleware from '../../utils/AuthMiddleware';
import { useRef } from 'react';
import { twoDigits } from '../../utils/helper';

const INITIAL_COUNT = 59;
const STATUS = {
    STARTED: 'Started',
    STOPPED: 'Stopped',
  }
const Forgot = () => {
    const dispatch = useDispatch();
    const [otp, setOtp] = useState("")
    const handleOtp = (otp) => setOtp(otp)

    const[secondsRemaining, setSecondsRemaining] = useState(INITIAL_COUNT)
    const[status, setStatus] = useState(STATUS.STOPPED)
    const secondsToDisplay = secondsRemaining % 60;
    const minutesRemaining= (secondsRemaining - secondsToDisplay) % 60;
    const minutesToDisplay = minutesRemaining % 60;
    const hoursToDisplay = (minutesRemaining - minutesToDisplay) % 60;

    const handleTimerStart = async() =>{
        setStatus(STATUS.STARTED);
        setSecondsRemaining(INITIAL_COUNT)
    }

    const {isLoading,isVerify,forgotModal,isVerified,minute,second } = useSelector((state) => ({       
        isLoading: state.generateHeadlineSlice.isLoading,
        isVerify: state.forgotPasswordSlice.isVerify,
        isVerified: state.forgotPasswordSlice.isVerified,
        forgotModal: state.forgotPasswordSlice.forgotModal,
        minute: state.generateHeadlineSlice.minute,
        second: state.forgotPasswordSlice.second,
      }));
    const navigate = useNavigate();
    const initialValues = { email: "" };
    const handleLoginSubmit = (values) => {
        dispatch(forgotFetchAPi(values));
        handleTimerStart()
    }

    const handleOtpVerify = (e) => {
        // console.log(otp)
        e.preventDefault();
        dispatch(forgotOtpVerifyApi({ email: forgotModal?.email, otp }));
        setOtp('');
    }

    useEffect(() => {
        forgotModal.otpVerified && navigate('/reset-password');
    }, [forgotModal.otpVerified, navigate]);

    useInterval(
        () => {
          if (secondsRemaining > 0) {
            setSecondsRemaining(secondsRemaining - 1)
          } else {
            setStatus(STATUS.STOPPED)
          }
        },
        status === STATUS.STARTED ? 1000 : null,
    )

    function useInterval(callback, delay) {
    const savedCallback = useRef()
    
    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback
    }, [callback])
    
    // Set up the interval.
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

    useEffect(() => {
        document.title = "Forgot password | Title Generator"
      }, [])
  return (
    <AuthMiddleware>
    <div className='flex p-5 ms:p-5 sm:p-5 md:p-10 lg:p-8 gap-8 rounded-xl bg-white w-full h-full ms:max-w-[90%]'>
        <div className='flex flex-col gap-2 ms:gap-2 sm:gap-2 md:gap-4 lg:gap-4 h-full w-full justify-center items-center py-10 ms:py-0 lg:py-3'>
            <Formik
                    initialValues={initialValues}
                    validationSchema={forgotPasswordValidationSchema}
                    validateOnBlur={false}
                    validateOnChange={false}
                    onSubmit={handleLoginSubmit}
                >
                    {({ handleSubmit }) =>
                    (<form className='w-full max-w-md sm:max-w-sm ms:max-w-xs' onSubmit={handleSubmit} >
                        <div className='w-full h-full flex flex-col gap-4 ms:gap-4 sm:gap-4 md:gap-8 lg:gap-4 justify-center items-start'>
                            <div className='flex items-start'>
                                <h1 className='font-medium text-lg ms:text-lg sm:text-xl md:text-2xl lg:text-3xl'>Forgot password</h1>
                            </div>
                            <div className='flex flex-col gap-5 ms:gap-5 sm:gap-5 md:gap-10 lg:gap-8 items-start w-full'>
                            <p className='font-medium text-xs ms:text-xs sm:text-sm md:text-base lg:text-base text-[#4A5568]'>Enter the email address associated with your account and we will send you instructions to reset your password.</p>
                            <InputField
                            type='text'
                            id='email'
                            name='email'
                            inputstyle='w-full  text-[#737373] text-xs 2xl:text-xl outline-none py-[14px] 2xl:py-[15px] rounded-md bg-[#EDF2F7] border border-[#FFFFFF]/[10%] pl-5 2xl:pl-6 placeholder:text-[#737373] focus:border-[#544BB9]'
                            borderstyle='w-full text-[#737373] text-xs 2xl:text-xl outline-none py-[14px] 2xl:py-[15px] rounded-2xl border border-red-500 bg-transparent pl-5 2xl:pl-6 placeholder:text-[#737373]'
                            placeholder='E-mail' />
                            </div> 
                            <div className='py-2 ms:py-2 sm:py-2 md:py-3 lg:py-3 w-full'>
                            <CustomButton
                                type='submit'
                                disabled={isVerify}
                                buttonStyle="w-full py-[12px] 2xl:py-[13px] text-sm sm:text-sm lg:py-[12px] lg:text-[16px] 2xl:text-xl font-medium sm:font-medium rounded-md text-white bg-[#544BB9] shadow-lg disabled:opacity-75  disabled:cursor-not-allowed"
                                loaderSize={20}
                                showLoader>
                                Verify
                            </CustomButton >
                            </div>
                        </div>
                    </form>)}
            </Formik>
            <div className='flex gap-1'>
                <div className='font-bold text-sm text-[#544BB9] cursor-pointer' onClick={() => {navigate('/auth/signin')}}>Sign in</div>
            </div>
            <div className=''>
                <VerifyOtpModal modal={forgotModal} onClose={() => { }} >
                                <div className="p-[10px] ms:p-[30px] flex flex-col gap-[40px] items-center bg-[#FFFFFF] border max-w-[500px] rounded-[10px]">
                                    <form
                                        onSubmit={handleOtpVerify}
                                    >
                                        <div className='flex flex-col items-center gap-3 ms:gap-3 sm:gap-3 md:gap-6 lg:gap-6'>
                                            <div className='flex flex-col gap-3'>
                                                <h1 className='text-center text-black text-lg ms:text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-[21px] tracking-wide'>OTP Verification</h1>
                                                <p className="text-center text-black text-xl sm:text-xl font-normal leading-[21px] tracking-wide">
                                                    Please check your email. We sent a OTP on your registered email
                                                    id.
                                                </p>
                                            </div>
                                            <div className='flex flex-col gap-4'>
                                            <OtpInput
                                                inputStyle="text-xl sm:!p-2 sm:!w-[35px] rounded-[5px] border-[1px] border-solid border-[#000000]"
                                                value={otp}
                                                isInputNum={true}
                                                onChange={handleOtp}
                                                numInputs={6}
                                                separator={<span>&nbsp; &nbsp;</span>}
                                            />
                                            <div className='flex gap-2 justify-center items-center'>
                                                {(twoDigits(minutesToDisplay) === "00") && (twoDigits(secondsToDisplay) === "00") ? <>
                                                <p className='font-semibold text-base ms:text-xs sm:text-sm md:text-base lg:text-base text-[#4A5568] '>Didn't receive OTP ? </p>
                                                <div className='font-bold text-base ms:text-xs sm:text-sm md:text-base lg:text-base text-[#544BB9] cursor-pointer' 
                                                onClick={() => {dispatch(forgotFetchAPi({ email: forgotModal?.email })); handleTimerStart()}
                                                }>resend OTP</div>
                                                </> 
                                                :
                                                <p className='font-normal text-base ms:text-xs sm:text-sm md:text-base lg:text-base text-[#4A5568]'>Resend OTP in <span className='font-semibold text-[#544BB9]'>{twoDigits(minutesToDisplay)}:
                                                           {twoDigits(secondsToDisplay)}</span></p>}
                                            </div>
                                            </div>
                                            <CustomButton
                                                type='submit'
                                                loaderSize={15}
                                                showLoader={isVerified}
                                                disabled={otp.length < 6 || isLoading}
                                                buttonStyle="w-[90px] mt-[20px] ms:mt-[5px] sm:mt-[10px] md:mt-[20px] lg:mt-[20px] h-[40px] text-sm font-bold rounded-md text-white bg-[#544BB9]">
                                                Submit
                                            </CustomButton>    
                                        </div>
                                    </form>
                                </div>
                </VerifyOtpModal>
            </div>
        </div>
    </div>
    </AuthMiddleware>
  )
}

export default Forgot