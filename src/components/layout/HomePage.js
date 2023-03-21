import React, { useState, useEffect, useRef } from 'react'
import AuthMiddleware from '../../utils/AuthMiddleware'
import FooterNew from './FooterNew'
import NavbarNewA from './NavBarNewA'
import CustomButton from '../form/CustomButton'
import InputField from '../form/InputField'
import { dynamicHeadline } from "../../utils/Data";
import { generateCaptcha } from "../../utils/helper";
import captchaBG from "../../assets/captcha-bg.png";
import demo1 from "../../assets/Demo1-tagline-generator.png";
import demo2 from "../../assets/Demo2-tagline-generator.png";
import demo3 from "../../assets/Demo3-tagline-generator.png";
import use1 from "../../assets/use-title-generator-1.svg";
import use2 from "../../assets/use-title-generator-2.svg";
import use3 from "../../assets/use-title-generator-3.svg";
import ReCAPTCHA from "react-google-recaptcha";
import { IoIosMail } from 'react-icons/io';
import { FaGlobe, FaPhoneAlt, FaSkype, FaMapMarkerAlt } from 'react-icons/fa';
import { Formik } from 'formik'
import { contactUsValidationSchema, contactUsValidationWithoutCaptchaSchema } from '../../utils/FormValidations'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ContactUsFetchAPi } from '../../redux/slices/auth/contactusSlice'
import { motion } from "framer-motion";

let COUNT = 0;
const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const captchaRef = useRef()
  const { isLoading } = useSelector((state) => ({
      isLoading: state.contactusSlice.isLoading,
    }));
  const [heading, setHeading] = useState(dynamicHeadline[0]);
  const [getInTouch , setGetInTouch] = useState({
    name: "",
    email: "",
    message: "",
    isVarified: false,
  })
  const initialValues = { name: "", email: "" ,message: "", captcha: ""};

  // const [captcha, setCaptcha] = useState(String(Math.floor(Math.random()*100000+1)))
  const [captcha, setCaptcha] = useState(generateCaptcha(5))
  const [validation, setValidation] = useState(contactUsValidationSchema);
  const [error, setError] = useState(false);

  const handleGetInTouchSubmit = (values) => {
       dispatch(ContactUsFetchAPi(values))
       captchaRef.current.reset();
      // console.log(values)
  }

  // const regenerateCaptcha = () => {
  //   // setCaptcha(String(Math.floor(Math.random()*100000+1)))
  //   setCaptcha(generateCaptcha(5))
  // }

    useEffect(() => {
        document.title = "How it works | Title Generator"
      }, [])
      
  return (
    <AuthMiddleware>
    <div className='flex flex-col w-full max-w-[100vw] overflow-x-hidden'>
      <div className='sticky top-0 w-full h-full z-[20]'>  
      <NavbarNewA />
      </div>  
      <div className="flex flex-col justify-center items-center h-full w-full">
        <div className="bg-[#544BB9] py-8 ms:py-8 sm:py-10 md:py-14 lg:py-20 h-full flex flex-col items-center justify-center w-full">
          <div className="flex flex-col justify-center items-center gap-1 ms:gap-3 lg:gap-5 ">
            <div  className="flex flex-col justify-center items-center ms:gap-1 max-w-[90%] ms:max-w-[60%] lg:max-w-[40%]">
              <h1 className="font-bold text-2xl ms:text-2xl sm:text-4xl md:text-4xl lg:text-4xl text-[#ffe84d]">
                Title Generator
              </h1>
              <h2 className="font-bold text-xl ms:text-xl sm:text-3xl md:text-3xl lg:text-3xl text-white">
                Powered by AI
              </h2>
            </div>
            <p
              className="font-normal text-xs ms:text-xs sm:text-base md:text-lg lg:text-xl text-white text-center max-w-[80%] ms:max-w-[80%] lg:max-w-[50%]"
            >
              For your blog or post, do you need compelling titles? To receive a tonne of useful suggestions for a successful content strategy, use this tool to generate innovative title ideas.
            </p>
          </div>
        </div>
        <div className='h-full w-full'>
        <div className="bg-white py-8 ms:py-8 sm:py-10 md:py-14 lg:py-20 h-full flex flex-col items-center justify-center w-full">
          <div className="flex flex-col gap-3 justify-center items-center ms:gap-3 lg:gap-5">
            <h1 className="font-bold text-xl ms:text-xl sm:text-3xl md:text-3xl lg:text-4xl text-center text-black max-w-[80%] ms:max-w-[80%] lg:max-w-[60%]">
            What Can You Do with AI Title Generator?
            </h1>
            <p
              className="font-normal text-lg ms:text-xs sm:text-base md:text-lg lg:text-xl text-black text-center"
            >
              AI Title Generator is catchy title maker, developed by <b className='text-[#544BB9]'><a href='https://infynno.com/' target="_blank">Infynno</a></b>, to help you unleash your creativity.
            </p>
          </div>
        </div>
        </div>
        <div className='flex flex-col justify-center items-center w-full h-full gap-5 ms:gap-5 sm:gap-8 md:gap-10 lg:gap-14'>
          <div className='py-4 ms:p-4 md:py-12 md:px-10 lg:py-12 lg:px-0 flex flex-col ms:flex-col md:flex-row bg-[#544BB9] max-w-7xl justify-center items-start gap-3 ms:gap-3 md:gap-0 w-full rounded-2xl' id='howitworks'>
              <div className='w-full h-full flex justify-center items-center'>
                  <img src={demo1} alt="Demo-tagline-generator1" className='rounded-2xl' />
              </div>
              <div className='w-full h-full flex justify-center items-center'>
                <div className="flex flex-col gap-[2%] justify-center items-center ms:items-start ms:justify-start md:items-center md:justify-center ms:gap-3 lg:gap-8 max-w-[90%] ms:max-w-[95%] lg:max-w-[80%]">
              <p className="font-bold text-xl ms:text-xl sm:text-3xl md:text-3xl lg:text-4xl text-white">
              Create the Perfect Title for Your New Blog Post
              </p>
              <p
                className="font-normal text-xs ms:text-xs sm:text-base md:text-lg lg:text-xl text-white"
              >
                ⮩ Create a large number of pertinent title recommendations with only one click to acquire fresh blog post ideas.
              </p>
              <p
                className="font-normal text-xs ms:text-xs sm:text-base md:text-lg lg:text-xl text-white"
              >
                ⮩ In order to position your material for success, add certain words that will appear in your title.
              </p>
              <p
                className="font-normal text-xs ms:text-xs sm:text-base md:text-lg lg:text-xl text-white"
              >
                ⮩ Use generated titles for higher social media engagement.
              </p>
                </div>
              </div>
          </div>
          <div className='py-4 ms:p-4 md:py-12 md:px-10 lg:py-12 lg:px-0 flex flex-col-reverse ms:flex-col-reverse md:flex-row bg-[#ffe84d] max-w-7xl justify-start items-start gap-3 ms:gap-3 md:gap-0 w-full rounded-2xl'>
              <div className='w-full h-full flex justify-center items-center'>
                <div className="flex flex-col gap-[2%] justify-center items-center ms:items-start ms:justify-start md:items-center md:justify-center ms:gap-3 lg:gap-8 max-w-[90%] ms:max-w-[95%] lg:max-w-[80%]">
                  <p className="font-bold text-xl ms:text-xl sm:text-3xl md:text-3xl lg:text-4xl text-white">
                  Elevate Your Content with Catchy, Diverse titles
                  </p>
                  <p
                    className="font-normal text-xs ms:text-xs sm:text-base md:text-lg lg:text-xl text-white"
                  >
                    ⮩ If you like the produced titles and wish to save them for future use, simply click on save results. You may then examine prior results and copy them later.
                  </p>
                  <p
                    className="font-normal text-xs ms:text-xs sm:text-base md:text-lg lg:text-xl text-white"
                  >
                    ⮩ If you want to produced titles with same input and and wish to regenerate again than we have that option too.
                  </p>
                  <p
                    className="font-normal text-xs ms:text-xs sm:text-base md:text-lg lg:text-xl text-white"
                  >
                    ⮩ To increase reach, use generated keywords as # hastags while posting it on social media.
                  </p>
                </div>
              </div>
              <div className='w-full h-full flex justify-center items-center'>
                  <img src={demo2} alt="Demo-tagline-generator2" className='rounded-2xl' />
              </div>
          </div>
          <div className='py-4 ms:p-4 md:py-12 md:px-10 lg:py-12 lg:px-0 flex flex-col ms:flex-col md:flex-row bg-[#544BB9] max-w-7xl justify-center items-start gap-3 ms:gap-3 md:gap-0 w-full rounded-2xl'>
              <div className='w-full h-full flex justify-center items-center'>
                  <img src={demo3} alt="Demo-tagline-generator3" className='rounded-2xl' />
              </div>
              <div className='w-full h-full flex justify-center items-center'>
                <div className="flex flex-col gap-[2%] justify-center items-center ms:items-start ms:justify-start md:items-center md:justify-center ms:gap-3 lg:gap-8 max-w-[90%] ms:max-w-[95%] lg:max-w-[80%]">
              <p className="font-bold text-xl ms:text-xl sm:text-3xl md:text-3xl lg:text-4xl text-white">
                Generate New Ideas for Your Content Calendar
              </p>
              <p
                className="font-normal text-xs ms:text-xs sm:text-base md:text-lg lg:text-xl text-white"
              >
               ⮩ Use AI to set your content up for success with creative, attention-grabbing blog post titles.
              </p>
              <p
                className="font-normal text-xs ms:text-xs sm:text-base md:text-lg lg:text-xl text-white"
              >
               ⮩ Enter a topic you’d like to cover, and get suggestions for original blogs or articles.
              </p>
              <p
                className="font-normal text-xs ms:text-xs sm:text-base md:text-lg lg:text-xl text-white"
              >
               ⮩ Specified keywords will appear in the title, inventive terms might be used for optimum SEO techniques.
              </p>
                </div>
              </div>
          </div>
        </div>
        <div className='w-full h-full mt-6 ms:mt-6 sm:mt-10 md:mt-12 lg:mt-14 bg-[#ffe84d]'>
          <div className='flex flex-col py-12 ms:py-4 sm:py-6 md:py-8 lg:py-12 justify-center items-center'>
            <div className="flex justify-center items-center">
              <h1 className="font-bold text-2xl ms:text-2xl sm:text-3xl md:text-3xl lg:text-4xl text-center text-black max-w-[80%]">
               Why Use AI Title Generator by Infynno?
              </h1>
            </div>
            <div className='flex flex-col ms:flex-col md:flex-row ms:gap-5 md:gap-0 max-w-7xl py-10 ms:py-4 sm:py-6 md:py-8 lg:py-10'>
              <div className='flex flex-col justify-between items-center h-full w-full gap-8'>
                <div className='w-full h-full flex justify-center items-center'>
                    <img src={use1} alt="Use-tagline-generator1" className='rounded-2xl' />
                </div>
                <div className='w-full h-full flex justify-center items-center'>
                  <div className="flex flex-col gap-[2%] justify-center items-center ms:gap-3 lg:gap-5 max-w-[80%]">
                    <p
                      className="font-normal text-lg ms:text-xs sm:text-base md:text-lg lg:text-xl text-[#333333] text-center"
                    >
                      Lead more eyes to your content with high-quality titles.
                    </p>
                  </div>
              </div>
              </div>
              <div className='flex flex-col justify-between items-center h-full w-full gap-8'>
                <div className='w-full h-full flex justify-center items-center'>
                    <img src={use2} alt="Use-tagline-generator2" className='rounded-2xl' />
                </div>
                <div className='w-full h-full flex justify-center items-center'>
                  <div className="flex flex-col gap-[2%] justify-center items-center ms:gap-1 lg:gap-5 max-w-[80%]">
                    <p
                      className="font-normal text-lg ms:text-xs sm:text-base md:text-lg lg:text-xl text-[#333333] text-center"
                    >
                      Come up with high-potential titles with the best tone of voice for your audience.
                    </p>
                  </div>
              </div>
              </div>
              <div className='flex flex-col justify-between items-center h-full w-full gap-8'>
                <div className='w-full h-full flex justify-center items-center'>
                    <img src={use3} alt="Use-tagline-generator3" className='rounded-2xl' />
                </div>
                <div className='w-full h-full flex justify-center items-center'>
                  <div className="flex flex-col gap-[2%] justify-center items-center ms:gap-1 lg:gap-5 max-w-[80%]">
                    <p
                      className="font-normal text-lg ms:text-xs sm:text-base md:text-lg lg:text-xl text-[#333333] text-center"
                    >
                     Design and enrich your content plan, with diverse blog titles and related content ideas.
                    </p>
                  </div>
              </div>
              </div>
            </div>
          </div>
        </div>
        <div className="py-8 ms:py-8 sm:py-10 md:py-14 lg:py-16 h-full flex flex-col items-center justify-center w-full">
          <div className="flex flex-col justify-center items-center gap-1 ms:gap-5 lg:gap-16 ">
            <div className="flex justify-center items-center">
              <h1 className="font-bold text-xl ms:text-xl sm:text-4xl md:text-4xl lg:text-4xl text-center text-black">
                  FAQ
              </h1>
            </div>
            {/* <div className='grid grid-cols-1 grid-flow-rows auto-rows-max ms:grid-cols-1 md:grid-cols-2 gap-4 ms:gap-4 sm:gap-6 md:gap-8 lg:gap-10 w-full h-full max-w-6xl'>
                <div className='bg-white hover:scale-105 hover:shadow-xl transition-all ease-in-out duration-500 border-2 border-solid border-[#544BB9] flex flex-col gap-3 rounded-2xl p-2 ms:p-5 sm:p-5 md:p-5 lg:p-6 overflow-hidden'>
                  <p className='font-bold text-xs ms:text-xs sm:text-base md:text-lg lg:text-2xl text-[#333333]'>How Does AI Title Generator Work?</p>
                  <p className='font-normal text-xs ms:text-xs sm:text-base md:text-lg lg:text-xl text-[#333333]'>AI Title Generator is powered by AI. It uses artificial intelligence to suggest catchy, relevant titles for your blog posts, articles, landing pages, or other content. It also suggests related topics you might want to target.</p>
                </div>
                <div className='bg-white hover:scale-105 hover:shadow-xl transition-all ease-in-out duration-500 border-2 border-solid border-[#544BB9] flex flex-col gap-3 rounded-2xl p-2 ms:p-5 sm:p-5 md:p-5 lg:p-6 overflow-hidden'>
                  <p className='font-bold text-xs ms:text-xs sm:text-base md:text-lg lg:text-2xl text-[#333333]'>Why Should I Use AI Title Generator?</p>
                  <p className='font-normal text-xs ms:text-xs sm:text-base md:text-lg lg:text-xl text-[#333333]'>AI Title Generator suggest dozens of original titles in just a click. Speed up your brainstorming process, generate new blog post ideas, or create the perfect headline for an existing project.</p>
                </div>
                <div className='bg-white hover:scale-105 hover:shadow-xl transition-all ease-in-out duration-500 border-2 border-solid border-[#544BB9] col-span-full flex flex-col gap-3 rounded-2xl p-2 ms:p-5 sm:p-5 md:p-5 lg:p-6 overflow-hidden'>
                  <p className='font-bold text-xs ms:text-xs sm:text-base md:text-lg lg:text-2xl text-[#333333]'>How Much Does AI Title Generator Cost?</p>
                  <p className='font-normal text-xs ms:text-xs sm:text-base md:text-lg lg:text-xl text-[#333333]'>AI Title Generator is paid to use, but will get 1000 coins as joining bonus on first sign up, then after you can buy it any time and generate as many titles as you want, and share them with your teammates and writers.</p>
                </div>
                <div className='bg-white hover:scale-105 hover:shadow-xl transition-all ease-in-out duration-500 border-2 border-solid border-[#544BB9] flex flex-col gap-3 rounded-2xl p-2 ms:p-5 sm:p-5 md:p-5 lg:p-6 overflow-hidden'>
                  <p className='font-bold text-xs ms:text-xs sm:text-base md:text-lg lg:text-2xl text-[#333333]'>Who Owns the Generated Text?</p>
                  <p className='font-normal text-xs ms:text-xs sm:text-base md:text-lg lg:text-xl text-[#333333]'>You do! You’re free to use any title you generate in your own work.</p>
                </div>
                <div className='bg-white hover:scale-105 hover:shadow-xl transition-all ease-in-out duration-500 border-2 border-solid border-[#544BB9] flex flex-col gap-3 rounded-2xl p-2 ms:p-5 sm:p-5 md:p-5 lg:p-6 overflow-hidden'>
                  <p className='font-bold text-xs ms:text-xs sm:text-base md:text-lg lg:text-2xl text-[#333333]'>What Languages Are Supported?</p>
                  <p className='font-normal text-xs ms:text-xs sm:text-base md:text-lg lg:text-xl text-[#333333]'>Currently, AI Title Generator is available in English.</p>
                </div>
            </div> */}
            <div className='grid grid-cols-1 grid-flow-rows auto-rows-max ms:grid-cols-1 md:grid-cols-2 gap-4 ms:gap-4 sm:gap-6 md:gap-8 lg:gap-10 w-full h-full max-w-6xl'>
                <motion.div 
                 initial={{ x: -300 }}
                 whileInView={{ x : 0 }}
                 whileHover={{
                  scale: 1.1,
                }}
                 transition={{
                   duration: 0.2,
                   ease: [0, 0.50, 0.1,0.59]
                 }}
                 viewport={{ once: true }}
                className='bg-white hover:scale-105 hover:shadow-xl transition-all ease-in-out duration-500 border-2 border-solid border-[#544BB9] flex flex-col gap-3 rounded-2xl p-2 ms:p-5 sm:p-5 md:p-5 lg:p-6 overflow-hidden'>
                  <p className='font-bold text-xs ms:text-xs sm:text-base md:text-lg lg:text-2xl text-[#333333]'>How Does AI Title Generator Work?</p>
                  <p className='font-normal text-xs ms:text-xs sm:text-base md:text-lg lg:text-xl text-[#333333]'>AI Title Generator is powered by AI. It uses artificial intelligence to suggest catchy, relevant titles for your blog posts, articles, landing pages, or other content. It also suggests related topics you might want to target.</p>
                </motion.div>
                <motion.div 
                 initial={{ x: 300 }}
                 whileInView={{ x : 0 }}
                 whileHover={{
                  scale: 1.1,
                }}
                 transition={{
                   duration: 0.2,
                   ease: [0, 0.50, 0.1,0.59]
                 }}
                 viewport={{ once: true }} 
                 className='bg-white hover:scale-105 hover:shadow-xl transition-all ease-in-out duration-500 border-2 border-solid border-[#544BB9] flex flex-col gap-3 rounded-2xl p-2 ms:p-5 sm:p-5 md:p-5 lg:p-6 overflow-hidden'>
                  <p className='font-bold text-xs ms:text-xs sm:text-base md:text-lg lg:text-2xl text-[#333333]'>Why Should I Use AI Title Generator?</p>
                  <p className='font-normal text-xs ms:text-xs sm:text-base md:text-lg lg:text-xl text-[#333333]'>AI Title Generator suggest dozens of original titles in just a click. Speed up your brainstorming process, generate new blog post ideas, or create the perfect headline for an existing project.</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{
                    scale: 1.1,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: [0, 0.50, 0.1,0.59]
                  }}
                  viewport={{ once: true }}
                  className='bg-white hover:scale-105 hover:shadow-xl transition-all ease-in-out duration-500 border-2 border-solid border-[#544BB9] col-span-full flex flex-col gap-3 rounded-2xl p-2 ms:p-5 sm:p-5 md:p-5 lg:p-6 overflow-hidden'>
                  <p className='font-bold text-xs ms:text-xs sm:text-base md:text-lg lg:text-2xl text-[#333333]'>How Much Does AI Title Generator Cost?</p>
                  <p className='font-normal text-xs ms:text-xs sm:text-base md:text-lg lg:text-xl text-[#333333]'>AI Title Generator is paid to use, but will get 1000 coins as joining bonus on first sign up, then after you can buy it any time and generate as many titles as you want, and share them with your teammates and writers.</p>
                </motion.div>
                <motion.div 
                 initial={{ x: -300 }}
                 whileInView={{ x : 0 }}
                 whileHover={{
                  scale: 1.1,
                }}
                 transition={{
                   duration: 0.2,
                   ease: [0, 0.50, 0.1,0.59]
                 }}
                 viewport={{ once: true }} className='bg-white hover:scale-105 hover:shadow-xl transition-all ease-in-out duration-500 border-2 border-solid border-[#544BB9] flex flex-col gap-3 rounded-2xl p-2 ms:p-5 sm:p-5 md:p-5 lg:p-6 overflow-hidden'>
                  <p className='font-bold text-xs ms:text-xs sm:text-base md:text-lg lg:text-2xl text-[#333333]'>Who Owns the Generated Text?</p>
                  <p className='font-normal text-xs ms:text-xs sm:text-base md:text-lg lg:text-xl text-[#333333]'>You do! You’re free to use any title you generate in your own work.</p>
                </motion.div>
                <motion.div 
                 initial={{ x: 300 }}
                 whileInView={{ x : 0 }}
                 whileHover={{
                  scale: 1.1,
                }}
                 transition={{
                   duration: 0.2,
                   ease: [0, 0.50, 0.1,0.59]
                 }}
                 viewport={{ once: true }} 
                 className='bg-white hover:scale-105 hover:shadow-xl transition-all ease-in-out duration-500 border-2 border-solid border-[#544BB9] flex flex-col gap-3 rounded-2xl p-2 ms:p-5 sm:p-5 md:p-5 lg:p-6 overflow-hidden'>
                  <p className='font-bold text-xs ms:text-xs sm:text-base md:text-lg lg:text-2xl text-[#333333]'>What Languages Are Supported?</p>
                  <p className='font-normal text-xs ms:text-xs sm:text-base md:text-lg lg:text-xl text-[#333333]'>Currently, AI Title Generator is available in English.</p>
                </motion.div>
            </div>
          </div>
        </div>
        <div className="py-8 ms:py-8 sm:py-10 md:py-14 lg:py-16 h-full flex flex-col items-center justify-center w-full">
          <div className="flex flex-col justify-center items-center gap-1 ms:gap-5 lg:gap-10 w-full max-w-[90%] ms:max-w-[90%] md:max-w-[90%] lg:max-w-6xl h-full">
            <div className="flex justify-center items-center">
              <h1 className="font-bold text-xl ms:text-xl sm:text-4xl md:text-4xl lg:text-4xl text-center text-black">
                Contact Us
              </h1>
            </div>
            {/* <div className='w-full h-full flex flex-col justify-center items-center gap-8'>
              <input type="text" name='name' value={getInTouch.name} 
              onChange={(e) => setGetInTouch({...getInTouch,name: e.target.value})} 
              placeholder="Name" autoComplete='off' className='w-full max-w-sm h-full p-3 border-[1px] rounded-md border-solid border-[#aab2b8] focus:outline-none'  />
              <input type="text" name='email' value={getInTouch.email}
              onChange={(e) => setGetInTouch({...getInTouch,email: e.target.value})}
               placeholder="E-mail" autoComplete='off' className='w-full max-w-sm h-full p-3 border-[1px] rounded-md border-solid border-[#aab2b8] focus:outline-none'  />
               {!(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).test(getInTouch.email) && <p>Please enter valid e-mail</p>}
              <textarea value={getInTouch.message}
              onChange={(e) => setGetInTouch({...getInTouch,message: e.target.value})} 
              className='w-full h-full min-h-[150px] max-w-sm p-3 border-[1px] rounded-md border-solid border-[#aab2b8] resize-none focus:outline-none' placeholder='Enter message ...'/>
              <div className='flex gap-5 justify-center items-center'>
                  <div className='relative z-0'>
                      <img src={captchaBG} className=' h-8 ' />
                      <p className='absolute top-1 left-[15%] z-10 font-bold tracking-widest'>{captcha}</p>
                  </div>
                  <img src={recycle} onClick={() => regenerateCaptcha()} className='relative h-5' />
                  <div> 
                  <input type="text" name='captcha'
                    onChange={(e) => {
                      captcha === e.target.value ? setGetInTouch({...getInTouch,isVarified: true}):
                      setGetInTouch({...getInTouch,isVarified: false})
                      console.log(captcha,e.target.value,captcha===e.target.value)
                  }}
                    placeholder="Enter captcha" autoComplete='off' className='w-full max-w-sm h-full p-3 border-[1px] rounded-md border-solid border-[#aab2b8] focus:outline-none'  />
                  </div>
              </div>
               <ReCAPTCHA
                  sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                  onChange={(e) => setGetInTouch({...getInTouch,isVarified: true})}
              />
              <button
              disabled={(getInTouch.name.trim().length < 1 || getInTouch.email.trim().length < 1 || getInTouch.message.trim().length < 1) || !getInTouch.isVarified} 
              className='px-5 py-1.5 bg-[#544BB9] rounded-md text-white font-bold disabled:cursor-not-allowed disabled:opacity-70'>Send</button>
            </div> */}
            <div className='flex flex-col-reverse md:flex-row-reverse justify-center items-center gap-10 w-full h-full sm:max-w-[95%]'>
            <Formik
                    initialValues={initialValues}
                    validationSchema={validation}
                    validateOnBlur={false}
                    validateOnChange={false}
                    onSubmit={handleGetInTouchSubmit}
                >
                    {({ handleSubmit,errors,touched,handleChange,setFieldValue,values}) =>
                    (<form className='w-full max-w-md' onSubmit={handleSubmit} >
                        <div className='w-full h-full flex flex-col gap-8 ms:gap-4 sm:gap-4 md:gap-8 lg:gap-8 justify-center items-start'>
                        <h1 className='font-600 text-xl font-bold'>Let's Get In Touch</h1>
                        <div className='h-1 w-10 bg-[#544BB9]'></div>
                            <div className='flex flex-col gap-10 ms:gap-5 sm:gap-5 md:gap-10 lg:gap-8 items-start w-full'>
                            <InputField
                            type='text'
                            id='name'
                            name='name'
                            inputstyle='w-full  text-[#737373] text-xs 2xl:text-xl outline-none py-[14px] 2xl:py-[15px] rounded-md bg-white border border-[#aab2b8] pl-3 2xl:pl-5 placeholder:text-[#737373] focus:border-[#544BB9]'
                            borderstyle='w-full text-[#737373] text-xs 2xl:text-xl outline-none py-[14px] 2xl:py-[15px] rounded-2xl border border-red-500 pl-5 2xl:pl-6 placeholder:text-[#737373] focus:border-[#544BB9]'
                            placeholder='Enter your name' />
                            <InputField
                            type='text'
                            id='email'
                            name='email'
                            inputstyle='w-full text-[#737373] text-xs 2xl:text-xl outline-none py-[14px] 2xl:py-[15px] rounded-md border border-[#aab2b8] pl-3 2xl:pl-5 placeholder:text-[#737373] bg-white focus:border-[#544BB9]'
                            borderstyle='w-full text-[#737373] text-xs 2xl:text-xl outline-none py-[14px] 2xl:py-[15px] rounded-2xl border border-red-500 pl-5 2xl:pl-6 placeholder:text-[#737373] focus:border-[#544BB9]'
                            placeholder='Enter your e-mail' />
                            <div className='w-full h-full relative'>
                            <textarea
                              name="message"
                              id="message"
                              type="text"
                              onChange={(e) => {setFieldValue("message",e?.target?.value)}}
                              // onChange={(e) => setGetInTouch({...getInTouch,message: e.target.value})} 
                              className={`w-full h-full min-h-[150px] text-xs 2xl:text-xl p-3 2xl:pl-5  border-[1px] rounded-md border-solid  resize-none focus:outline-none placeholder:text-[#737373] focus:border-[#544BB9] text-[#737373] ${errors.message && touched.message ? "border-red-500" : "border-[#aab2b8]"}`} 
                              placeholder='Enter message ...'/>
                              {errors.message && touched.message && (
                                  <div className="absolute error lg:mt-[2px] left-0">
                                      <p className="text-[11px] md:text-[12px] xl:text-sm 2xl:text-base  whitespace-nowrap text-red-500">{errors.message}</p>
                                  </div>
                              )}
                              </div>
                            </div>
                            {/* {!error &&  */}
                            <div className='relative h-full w-full flex justify-center items-center'>
                            <ReCAPTCHA
                                name="captcha"
                                id="captcha"
                                sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                                onChange={(value) => {setFieldValue("captcha",value)}}
                                ref={captchaRef}
                                className="h-max w-full flex justify-center items-center"
                                onErrored={(err) => {
                                  // console.log("error",err);
                                  setError(true)
                                  // setFieldValue("captcha_verified",true)
                                  setValidation(contactUsValidationWithoutCaptchaSchema)} }
                            />
                             {errors.captcha && touched.captcha && (
                                  <div className="absolute error lg:mt-[2px] top-full left-0">
                                      <p className="text-[11px] md:text-[12px] xl:text-sm 2xl:text-base  whitespace-nowrap text-red-500">{errors.captcha}</p>
                                  </div>
                              )}
                            </div>
                            {/* } */}
                            <div className='py-3 ms:py-0 sm:py-0 md:py-3 lg:py-3 w-full flex justify-center items-center'>
                            {values.name.trim().length < 1 || values.email.trim().length < 1 || values.message.trim().length < 1 || (!error && values.captcha.trim().length < 1) ? 
                             <CustomButton
                             type='submit'
                             disabled={(values.name.trim().length < 1 || values.email.trim().length < 1 || values.message.trim().length < 1 || (!error && values.captcha.trim().length < 1) ) }
                             onClick={(e) => {
                             // dispatch(setLoginEffect(true));
                             }}
                             onAnimationEnd={() => {
                             // dispatch(setLoginEffect(false));
                             }}
                             buttonStyle="w-full py-[6px] md:py-[10px] 2xl:py-[13px] text-base sm:text-sm lg:py-[12px] lg:text-[16px] 2xl:text-xl font-medium sm:font-medium rounded-md text-white bg-[#544BB9] shadow-lg max-w-[300px] disabled:cursor-not-allowed disabled:opacity-70 disabled:bg-[#544BB9]"
                             loaderSize={20}
                             >
                             Send
                            </CustomButton>
                            :
                            <CustomButton
                                type='submit'
                                disabled={(values.name.trim().length < 1 || values.email.trim().length < 1 || values.message.trim().length < 1 || (!error && values.captcha.trim().length < 1)) || isLoading }
                                onClick={(e) => {
                                // dispatch(setLoginEffect(true));
                                }}
                                onAnimationEnd={() => {
                                // dispatch(setLoginEffect(false));
                                }}
                                buttonStyle="w-full py-[6px] md:py-[10px] 2xl:py-[13px] text-base sm:text-sm lg:py-[12px] lg:text-[16px] 2xl:text-xl font-medium sm:font-medium rounded-md text-white bg-[#544BB9] shadow-lg max-w-[300px] disabled:cursor-not-allowed disabled:opacity-70 disabled:bg-[#544BB9]"
                                loaderSize={20}
                                showLoader
                                >
                                Send
                            </CustomButton>}
                            </div>
                        </div>
                    </form>)}
            </Formik>
            <div className='h-full w-full flex flex-col justify-between items-center'>
              <div className='aspect-w-8 aspect-h-4 w-full h-full border-[3px] border-solid border-[#544BB9] rounded-md'>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3669.541138621801!2d72.53909061505688!3d23.113887518709067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9ddd5e24dcd1%3A0xdf5c3d5463cdece5!2sInfynno%20Solutions%20%7C%20Expert%20in%20Laravel%2C%20React%20and%20Node%20Apps!5e0!3m2!1sen!2sin!4v1679390031546!5m2!1sen!2sin" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>  
              </div>
              <div className='flex flex-col gap-3 my-2 h-full w-full'>
                  {/* <h1 className='font-600 text-xl font-bold'>Let's Get In Touch</h1>
                  <div className='h-1 w-10 bg-[#544BB9]'></div> */}
                  <p className='font-400 font-normal text-lg ms:text-xs sm:text-base md:text-lg lg:text-xl text-[#353535]'>We are offering something exclusive to our clients by using cutting-edge technologies. We provide top IT software development solutions across the globe.</p>
                  <div className='flex flex-col gap-2 h-full w-full'>
                      <div className='flex items-center gap-2 h-full w-full'> 
                          <FaMapMarkerAlt className='h-8 w-8 sm:h-6 sm:w-6 md:h-4 md:w-4 ' />
                          <p className='font-400 text-xs text-[#353535]'>1208 Ganesh Glory, Nr. BSNL Office, Jagatpur Chenpur Road, Gota, Sarkhej - Gandhinagar Highway, Ahmedabad - 382481 Gujarat, India</p>
                      </div>
                      <div className='flex items-center gap-2 h-full w-full'> 
                          <FaGlobe className='h-4 w-4 ' />
                          <p className='font-400 text-xs text-[#353535]'>sales@infynno.com</p>
                      </div>
                      <div className='flex items-center gap-2 h-full w-full'> 
                          <IoIosMail className='h-4 w-4 ' />
                          <p className='font-400 text-xs text-[#353535]'>hr@infynno.com</p>
                      </div>
                      <div className='flex items-center gap-2 h-full w-full'> 
                          <FaPhoneAlt className='h-4 w-4 ' />
                          <p className='font-400 text-xs text-[#353535]'>+91 848-883-8308</p>
                      </div>
                      <div className='flex items-center gap-2 h-full w-full'> 
                          <FaSkype className='h-4 w-4 ' />
                          <p className='font-400 text-xs text-[#353535]'>live.Infynno</p>
                      </div>
                  </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
      <div className='relative z-[10]'>
        <FooterNew />
      </div>
    </div>
    </AuthMiddleware>
  )
}

export default HomePage