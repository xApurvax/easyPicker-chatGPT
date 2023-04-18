import React, { useState, useEffect, useRef } from 'react'
import AuthMiddleware from '../../utils/AuthMiddleware'
import FooterNew from './FooterNew'
import NavbarNewA from './NavBarNewA'
import CustomButton from '../form/CustomButton'
import InputField from '../form/InputField'
import demo1 from '../../assets/Demo1-tagline-generator.png'
import demo2 from '../../assets/Demo2-tagline-generator.png'
import demo3 from '../../assets/Demo3-tagline-generator.png'
import use1 from '../../assets/use-title-generator-1.svg'
import use2 from '../../assets/use-title-generator-2.svg'
import use3 from '../../assets/use-title-generator-3.svg'
import ReCAPTCHA from 'react-google-recaptcha'
import { IoIosMail } from 'react-icons/io'
import { FaGlobe, FaPhoneAlt, FaSkype, FaMapMarkerAlt } from 'react-icons/fa'
import { Formik, FormikHelpers } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ContactUsFetchAPi } from '../../redux/slices/auth/contactusSlice'
import { motion } from 'framer-motion'
import CustomTextArea from '../form/CustomTextArea'
import Tool from './Tool'
import classNames from 'classnames'
import { ContactUsPayload } from '../../utils/types/types'
import { AppDispatch, RootState } from '../../redux/store/store'
import {
  contactUsValidationSchema,
  contactUsValidationWithoutCaptchaSchema,
} from '../../utils/FormValidations'

interface InitialValues {
  name: string
  email: string
  message: string
  captcha: string
}

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const captchaRef = useRef<any>(null)
  const navigate = useNavigate()
  const { isLoading, isSubmittedSuccessfully, limitExceeds } = useSelector(
    (state: RootState) => ({
      isLoading: state.ContactusSlice.isLoading,
      isSubmittedSuccessfully: state.ContactusSlice.isSubmittedSuccessfully,
      limitExceeds: state.GenerateHeadlineSlice.limitExceeds,
    })
  )

  const initialValues: InitialValues = {
    name: '',
    email: '',
    message: '',
    captcha: '',
  }

  const [validation, setValidation] = useState<any>(contactUsValidationSchema)
  const [error, setError] = useState(false)

  const handleGetInTouchSubmit = (
    values: ContactUsPayload,
    { resetForm }: FormikHelpers<InitialValues>
  ) => {
    dispatch(ContactUsFetchAPi(values))
    captchaRef.current?.reset()
    isSubmittedSuccessfully && resetForm({ values: initialValues })
  }

  useEffect(() => {
    document.title = 'How it works | Title Generator'
  }, [])

  return (
    <AuthMiddleware>
      <div className="flex flex-col w-full max-w-[100vw] overflow-x-hidden">
        <div className="sticky top-0 w-full h-full z-[20]">
          <NavbarNewA />
        </div>
        <div className="flex flex-col justify-center items-center h-full w-full">
          {/* INTRODUCTION HEADER  */}
          <div className="bg-primary py-8 ms:py-8 sm:py-10 md:py-14 lg:py-20 h-screen/2 flex flex-col items-center justify-center w-full">
            <div className="flex flex-col justify-center items-center gap-1 ms:gap-3 lg:gap-5 ">
              <div className="flex flex-col justify-center items-center ms:gap-1 max-w-[90%] ms:max-w-[60%] lg:max-w-[40%]">
                <h1 className="font-bold text-2xl ms:text-2xl sm:text-4xl md:text-4xl lg:text-4xl text-secondaryYellow">
                  Title Generator
                </h1>
                <h2 className="font-bold text-xl ms:text-xl sm:text-3xl md:text-3xl lg:text-3xl text-white">
                  Powered by AI
                </h2>
              </div>
              <p className="font-normal text-xs ms:text-xs sm:text-base md:text-lg lg:text-xl text-white text-center max-w-[80%] ms:max-w-[80%] lg:max-w-[50%]">
                Do you struggle to come up with attention-grabbing titles for
                your blog or post? Look no further! Use our tool to generate a
                plethora of innovative title ideas and improve your content
                strategy today.
              </p>
            </div>
          </div>

          <>
            <div className="bg-white py-8 ms:py-8 sm:py-10 md:py-14 h-screen/2 lg:py-20 flex flex-col gap-3 justify-center items-center ms:gap-3 lg:gap-5 ">
              <h1 className="font-bold text-xl ms:text-xl sm:text-3xl md:text-3xl lg:text-4xl text-center text-black max-w-[80%] ms:max-w-[80%] lg:max-w-[60%]">
                Why wait? Give it a try now and see for yourself!
              </h1>
              <p className="font-normal text-lg ms:text-xs sm:text-base md:text-lg lg:text-xl text-black text-center">
                Take the plunge and try it out now. You never know what you
                might discover.
              </p>
            </div>
            <div className="py-4 ms:p-4 md:py-12 md:px-10 lg:py-14 lg:px-0 flex flex-col ms:flex-col md:flex-col bg-gradient-to-r from-primary to-secondaryYellow justify-center items-center gap-3 ms:gap-3 md:gap-3 w-full mt-10">
              <div className=" relative">
                <div
                  className={classNames(
                    limitExceeds && 'pointer-events-none cursor-not-allowed'
                  )}
                >
                  <Tool homepageTrial={true} />
                </div>
                {limitExceeds && (
                  <div className="absolute top-0 backdrop-blur-md back  w-full h-full flex flex-col items-center justify-center gap-10 font-bold text-xl ms:text-xl sm:text-3xl md:text-3xl lg:text-3xl text-center text-black ms:max-w-full lg:max-w-full">
                    <p className="w-[90%] select-none ">
                      Oops! Looks like you've hit the limit of demo attempts.
                      Please login or sign up to continue.
                    </p>
                    <CustomButton
                      type="submit"
                      onClick={() => navigate('/auth/signin')}
                      buttonStyle="w-full py-[6px] md:py-[10px] 2xl:py-[13px] text-base sm:text-sm lg:py-[12px] lg:text-[16px] 2xl:text-xl font-medium sm:font-medium rounded-md text-white bg-primary shadow-lg max-w-[300px] disabled:cursor-not-allowed disabled:opacity-70 disabled:bg-primary shadow-lg"
                      loaderSize={20}
                      showLoader
                    >
                      Click here to Get Started 👆
                    </CustomButton>
                  </div>
                )}
              </div>
            </div>
          </>

          {/* WHAT CAN YOU DO WITH IT  */}
          <div className="h-full w-full">
            <div className="bg-white py-8 ms:py-8 sm:py-10 md:py-14 lg:py-20 h-full flex flex-col items-center justify-center w-full">
              <div className="flex flex-col gap-3 justify-center items-center ms:gap-3 lg:gap-5">
                <h1 className="font-bold text-xl ms:text-xl sm:text-3xl md:text-3xl lg:text-4xl text-center text-black max-w-[80%] ms:max-w-[80%] lg:max-w-[60%]">
                  What Can You Do with AI Title Generator?
                </h1>
                <p className="font-normal text-lg ms:text-xs sm:text-base md:text-lg lg:text-xl text-black text-center">
                  AI Title Generator is catchy title maker, developed by{' '}
                  <b className="text-primary">
                    <a
                      href="https://infynno.com/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Infynno
                    </a>
                  </b>
                  , to help you unleash your creativity.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center w-full h-full gap-5 ms:gap-5 sm:gap-8 md:gap-10 lg:gap-14">
            {/* INTRO TEMPLATE 1 */}

            <div
              className="py-4 ms:p-4 md:py-12 md:px-10 lg:py-12 lg:px-0 flex flex-col ms:flex-col md:flex-row bg-primary max-w-7xl justify-center items-start gap-3 ms:gap-3 md:gap-0 w-full rounded-2xl"
              id="howitworks"
            >
              <div className="w-full h-full flex justify-center items-center">
                <img
                  src={demo1}
                  alt="Demo-tagline-generator1"
                  className="rounded-2xl"
                />
              </div>
              <div className="w-full h-full flex justify-center items-center">
                <div className="flex flex-col gap-[2%] justify-center items-center ms:items-start ms:justify-start md:items-center md:justify-center ms:gap-3 lg:gap-8 max-w-[90%] ms:max-w-[95%] lg:max-w-[80%]">
                  <p className="font-bold text-xl ms:text-xl sm:text-3xl md:text-3xl lg:text-4xl text-white">
                    Create the Perfect Title for Your New Blog Post
                  </p>
                  <p className="font-normal text-xs ms:text-xs sm:text-base md:text-lg lg:text-xl text-white">
                    👉 Create a large number of pertinent title recommendations
                    with only one click to acquire fresh blog post ideas.
                  </p>
                  <p className="font-normal text-xs ms:text-xs sm:text-base md:text-lg lg:text-xl text-white">
                    👉 To ensure your content's success, include strategic
                    keywords in your titles. Our tool can help you identify and
                    add these words for optimal positioning.
                  </p>
                  <p className="font-normal text-xs ms:text-xs sm:text-base md:text-lg lg:text-xl text-white">
                    👉 Increase your social media engagement with our generated
                    titles! Use them to captivate your audience and drive more
                    traffic to your content.
                  </p>
                </div>
              </div>
            </div>

            {/* INTRO TEMPLATE 2 */}

            <div className="py-4 ms:p-4 md:py-12 md:px-10 lg:py-12 lg:px-0 flex flex-col-reverse ms:flex-col-reverse md:flex-row bg-secondaryYellow max-w-7xl justify-start items-start gap-3 ms:gap-3 md:gap-0 w-full rounded-2xl">
              <div className="w-full h-full flex justify-center items-center">
                <div className="flex flex-col gap-[2%] justify-center items-center ms:items-start ms:justify-start md:items-center md:justify-center ms:gap-3 lg:gap-8 max-w-[90%] ms:max-w-[95%] lg:max-w-[80%]">
                  <p className="font-bold text-xl ms:text-xl sm:text-3xl md:text-3xl lg:text-4xl text-black">
                    Elevate Your Content with Catchy, Diverse titles
                  </p>
                  <p className="font-normal text-xs ms:text-xs sm:text-base md:text-lg lg:text-xl text-black">
                    👉 Love the titles our tool generated? Save generated titles
                    for future use with one click. Access and copy paste results
                    anytime.
                  </p>
                  <p className="font-normal text-xs ms:text-xs sm:text-base md:text-lg lg:text-xl text-black">
                    👉 If you want to generate titles with the same input and
                    regenerate them again, we have that option available too.
                  </p>
                  <p className="font-normal text-xs ms:text-xs sm:text-base md:text-lg lg:text-xl text-black">
                    👉 To increase reach, use generated keywords as
                    &quot;#&quot; hastags while posting it on social media.
                  </p>
                </div>
              </div>
              <div className="w-full h-full flex justify-center items-center">
                <img
                  src={demo2}
                  alt="Demo-tagline-generator2"
                  className="rounded-2xl"
                />
              </div>
            </div>

            {/* INTRO TEMPLATE 3 */}
            <div className="py-4 ms:p-4 md:py-12 md:px-10 lg:py-12 lg:px-0 flex flex-col ms:flex-col md:flex-row bg-primary max-w-7xl justify-center items-start gap-3 ms:gap-3 md:gap-0 w-full rounded-2xl">
              <div className="w-full h-full flex justify-center items-center">
                <img
                  src={demo3}
                  alt="Demo-tagline-generator3"
                  className="rounded-2xl"
                />
              </div>
              <div className="w-full h-full flex justify-center items-center">
                <div className="flex flex-col gap-[2%] justify-center items-center ms:items-start ms:justify-start md:items-center md:justify-center ms:gap-3 lg:gap-8 max-w-[90%] ms:max-w-[95%] lg:max-w-[80%]">
                  <p className="font-bold text-xl ms:text-xl sm:text-3xl md:text-3xl lg:text-4xl text-white">
                    Generate New Ideas for Your Content Calendar
                  </p>
                  <p className="font-normal text-xs ms:text-xs sm:text-base md:text-lg lg:text-xl text-white">
                    👉 Boost your content's success with attention-grabbing blog
                    post titles generated by AI technology. Set yourself up for
                    success today!
                  </p>
                  <p className="font-normal text-xs ms:text-xs sm:text-base md:text-lg lg:text-xl text-white">
                    👉 Enter a topic you&apos;d like to cover, and get
                    suggestions for original blogs or articles.
                  </p>
                  <p className="font-normal text-xs ms:text-xs sm:text-base md:text-lg lg:text-xl text-white">
                    👉 Specified keywords will appear in the title, inventive
                    terms might be used for optimum SEO techniques.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* WHY USE AI TITLE GENERATOR */}
          <div className="w-full h-full mt-6 ms:mt-6 sm:mt-10 md:mt-12 lg:mt-14 bg-secondaryYellow">
            <div className="flex flex-col py-12 ms:py-4 sm:py-6 md:py-8 lg:py-12 justify-center items-center">
              <div className="flex justify-center items-center">
                <h1 className="font-bold text-2xl ms:text-2xl sm:text-3xl md:text-3xl lg:text-4xl text-center text-black max-w-[80%]">
                  Why Use AI Title Generator by Infynno?
                </h1>
              </div>
              <div className="flex flex-col ms:flex-col md:flex-row ms:gap-5 md:gap-0 max-w-7xl py-10 ms:py-4 sm:py-6 md:py-8 lg:py-10">
                <div className="flex flex-col justify-between items-center h-full w-full gap-8">
                  <div className="w-full h-full flex justify-center items-center">
                    <img
                      src={use1}
                      alt="Use-tagline-generator1"
                      className="rounded-2xl"
                    />
                  </div>
                  <div className="w-full h-full flex justify-center items-center">
                    <div className="flex flex-col gap-[2%] justify-center items-center ms:gap-3 lg:gap-5 max-w-[80%]">
                      <p className="font-normal text-lg ms:text-xs sm:text-base md:text-lg lg:text-xl text-[#333333] text-center">
                        Lead more eyes to your content with high-quality titles.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-between items-center h-full w-full gap-8">
                  <div className="w-full h-full flex justify-center items-center">
                    <img
                      src={use2}
                      alt="Use-tagline-generator2"
                      className="rounded-2xl"
                    />
                  </div>
                  <div className="w-full h-full flex justify-center items-center">
                    <div className="flex flex-col gap-[2%] justify-center items-center ms:gap-1 lg:gap-5 max-w-[80%]">
                      <p className="font-normal text-lg ms:text-xs sm:text-base md:text-lg lg:text-xl text-[#333333] text-center">
                        Come up with high-potential titles with the best tone of
                        voice for your audience.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-between items-center h-full w-full gap-8">
                  <div className="w-full h-full flex justify-center items-center">
                    <img
                      src={use3}
                      alt="Use-tagline-generator3"
                      className="rounded-2xl"
                    />
                  </div>
                  <div className="w-full h-full flex justify-center items-center">
                    <div className="flex flex-col gap-[2%] justify-center items-center ms:gap-1 lg:gap-5 max-w-[80%]">
                      <p className="font-normal text-lg ms:text-xs sm:text-base md:text-lg lg:text-xl text-[#333333] text-center">
                        Design and enrich your content plan, with diverse blog
                        titles and related content ideas.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ  */}
          <div className="py-8 ms:py-8 sm:py-10 md:py-14 lg:py-16 h-full flex flex-col items-center justify-center w-full">
            <div className="flex flex-col justify-center items-center gap-1 ms:gap-5 lg:gap-16 ">
              <div className="flex justify-center items-center">
                <h1 className="font-bold text-xl ms:text-xl sm:text-4xl md:text-4xl lg:text-4xl text-center text-black">
                  FAQ
                </h1>
              </div>

              <div className="grid grid-cols-1 grid-flow-rows auto-rows-max ms:grid-cols-1 md:grid-cols-2 gap-4 ms:gap-4 sm:gap-6 md:gap-8 lg:gap-10 w-full h-full max-w-6xl">
                <motion.div
                  initial={{ x: -300 }}
                  whileInView={{ x: 0 }}
                  whileHover={{
                    scale: 1.1,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: [0, 0.5, 0.1, 0.59],
                  }}
                  viewport={{ once: true }}
                  className="bg-white hover:scale-105 hover:shadow-xl transition-all ease-in-out duration-500 border-2 border-solid border-primary flex flex-col gap-3 rounded-2xl p-2 ms:p-5 sm:p-5 md:p-5 lg:p-6 overflow-hidden"
                >
                  <p className="font-bold text-xs ms:text-xs sm:text-base md:text-lg lg:text-2xl text-[#333333]">
                    How Does AI Title Generator Work?
                  </p>
                  <p className="font-normal text-xs ms:text-xs sm:text-base md:text-lg lg:text-xl text-[#333333]">
                    Our AI Title Generator uses advanced artificial intelligence
                    technology to suggest catchy and relevant titles for your
                    blog posts, articles, landing pages, and other content. In
                    addition, it provides related topics that you may want to
                    target.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ x: 300 }}
                  whileInView={{ x: 0 }}
                  whileHover={{
                    scale: 1.1,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: [0, 0.5, 0.1, 0.59],
                  }}
                  viewport={{ once: true }}
                  className="bg-white hover:scale-105 hover:shadow-xl transition-all ease-in-out duration-500 border-2 border-solid border-primary flex flex-col gap-3 rounded-2xl p-2 ms:p-5 sm:p-5 md:p-5 lg:p-6 overflow-hidden"
                >
                  <p className="font-bold text-xs ms:text-xs sm:text-base md:text-lg lg:text-2xl text-[#333333]">
                    Why Should I Use AI Title Generator?
                  </p>
                  <p className="font-normal text-xs ms:text-xs sm:text-base md:text-lg lg:text-xl text-[#333333]">
                    Get dozens of original title ideas with just one click using
                    our AI Title Generator. Speed up your brainstorming process,
                    come up with new blog post ideas, or create the perfect
                    headline for your existing project.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{
                    scale: 1.1,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: [0, 0.5, 0.1, 0.59],
                  }}
                  viewport={{ once: true }}
                  className="bg-white hover:scale-105 hover:shadow-xl transition-all ease-in-out duration-500 border-2 border-solid border-primary col-span-full flex flex-col gap-3 rounded-2xl p-2 ms:p-5 sm:p-5 md:p-5 lg:p-6 overflow-hidden"
                >
                  <p className="font-bold text-xs ms:text-xs sm:text-base md:text-lg lg:text-2xl text-[#333333]">
                    How Much Does AI Title Generator Cost?
                  </p>
                  <p className="font-normal text-xs ms:text-xs sm:text-base md:text-lg lg:text-xl text-[#333333]">
                    Although AI Title Generator is a paid service, you'll
                    receive a joining bonus of 1000 coins upon signing up for
                    the first time. After that, you can purchase it anytime and
                    generate unlimited titles to share with your teammates and
                    writers.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ x: -300 }}
                  whileInView={{ x: 0 }}
                  whileHover={{
                    scale: 1.1,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: [0, 0.5, 0.1, 0.59],
                  }}
                  viewport={{ once: true }}
                  className="bg-white hover:scale-105 hover:shadow-xl transition-all ease-in-out duration-500 border-2 border-solid border-primary flex flex-col gap-3 rounded-2xl p-2 ms:p-5 sm:p-5 md:p-5 lg:p-6 overflow-hidden"
                >
                  <p className="font-bold text-xs ms:text-xs sm:text-base md:text-lg lg:text-2xl text-[#333333]">
                    Who Owns the Generated Text?
                  </p>
                  <p className="font-normal text-xs ms:text-xs sm:text-base md:text-lg lg:text-xl text-[#333333]">
                    You do! You&apos;re free to use any title you generate in
                    your own work.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ x: 300 }}
                  whileInView={{ x: 0 }}
                  whileHover={{
                    scale: 1.1,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: [0, 0.5, 0.1, 0.59],
                  }}
                  viewport={{ once: true }}
                  className="bg-white hover:scale-105 hover:shadow-xl transition-all ease-in-out duration-500 border-2 border-solid border-primary flex flex-col gap-3 rounded-2xl p-2 ms:p-5 sm:p-5 md:p-5 lg:p-6 overflow-hidden"
                >
                  <p className="font-bold text-xs ms:text-xs sm:text-base md:text-lg lg:text-2xl text-[#333333]">
                    What Languages Are Supported?
                  </p>
                  <p className="font-normal text-xs ms:text-xs sm:text-base md:text-lg lg:text-xl text-[#333333]">
                    At present, AI Title Generator is available in English.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>

          {/* CONTACT US */}
          <div className="py-8 ms:py-8 sm:py-10 md:py-14 lg:py-16 h-full flex flex-col items-center justify-center w-full">
            <div className="flex flex-col justify-center items-center gap-1 ms:gap-5 lg:gap-10 w-full max-w-[90%] ms:max-w-[90%] md:max-w-[90%] lg:max-w-6xl h-full">
              <div className="flex justify-center items-center">
                <h1 className="font-bold text-xl ms:text-xl sm:text-4xl md:text-4xl lg:text-4xl text-center text-black">
                  Contact Us
                </h1>
              </div>

              <div className="flex flex-col-reverse md:flex-row-reverse justify-center items-center gap-10 w-full h-full sm:max-w-[95%]">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validation}
                  validateOnBlur={false}
                  validateOnChange={false}
                  onSubmit={handleGetInTouchSubmit}
                >
                  {({
                    handleSubmit,
                    errors,
                    touched,
                    handleChange,
                    setFieldValue,
                    values,
                  }) => (
                    <form className="w-full max-w-md" onSubmit={handleSubmit}>
                      <div className="w-full h-full flex flex-col gap-8 ms:gap-4 sm:gap-4 md:gap-8 lg:gap-8 justify-center items-start">
                        <h1 className="font-600 text-xl font-bold">
                          Let's Get In Touch
                        </h1>
                        <div className="h-1 w-10 bg-primary"></div>
                        <div className="flex flex-col gap-10 ms:gap-5 sm:gap-5 md:gap-10 lg:gap-8 items-start w-full">
                          <InputField
                            type="text"
                            id="name"
                            name="name"
                            inputstyle="w-full  text-textGray text-xs 2xl:text-xl outline-none py-[14px] 2xl:py-[15px] rounded-md bg-white border border-primaryBorder pl-3 2xl:pl-5 placeholder:text-textGray focus:border-primary"
                            borderstyle="w-full text-textGray text-xs 2xl:text-xl outline-none py-[14px] 2xl:py-[15px] rounded-2xl border border-red-500 pl-5 2xl:pl-6 placeholder:text-textGray focus:border-primary"
                            placeholder="What's your name, stranger?"
                          />
                          <InputField
                            type="text"
                            id="email"
                            name="email"
                            inputstyle="w-full text-textGray text-xs 2xl:text-xl outline-none py-[14px] 2xl:py-[15px] rounded-md border border-primaryBorder pl-3 2xl:pl-5 placeholder:text-textGray bg-white focus:border-primary"
                            borderstyle="w-full text-textGray text-xs 2xl:text-xl outline-none py-[14px] 2xl:py-[15px] rounded-2xl border border-red-500 pl-5 2xl:pl-6 placeholder:text-textGray focus:border-primary"
                            placeholder="Share your email address with us!"
                          />
                          <CustomTextArea
                            id="message"
                            name="message"
                            inputstyle="w-full h-full min-h-[150px] text-xs 2xl:text-xl p-3 2xl:pl-5  border-[1px] rounded-md border-solid border-primaryBorder resize-none focus:outline-none placeholder:text-textGray focus:border-primary text-textGray"
                            borderstyle="w-full h-full min-h-[150px] text-xs 2xl:text-xl p-3 2xl:pl-5  border-[1px] rounded-md border-solid border-primaryBorder resize-none focus:outline-none placeholder:text-textGray focus:border-primary text-textGray"
                            placeholder="What's on your mind?"
                          />
                        </div>
                        <div className="relative h-full w-full flex justify-center items-center">
                          <ReCAPTCHA
                            name="captcha"
                            id="captcha"
                            sitekey="6LcNZf4kAAAAAP_08qthiKFOd7JWz6IdPGjZzH-g"
                            onChange={(value: string) =>
                              setFieldValue('captcha', value)
                            }
                            onEmptied={() => setFieldValue('captcha', '')}
                            ref={captchaRef}
                            className="h-max w-full flex justify-center items-center"
                            onErrored={() => {
                              setError(true)
                              setValidation(
                                contactUsValidationWithoutCaptchaSchema
                              )
                            }}
                          />
                          {errors.captcha && touched.captcha && (
                            <div className="absolute error lg:mt-[2px] top-full left-0">
                              <p className="text-[11px] md:text-[12px] xl:text-sm 2xl:text-base  whitespace-nowrap text-red-500">
                                {errors.captcha}
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="py-3 ms:py-0 sm:py-0 md:py-3 lg:py-3 w-full flex justify-center items-center">
                          {values.name.trim().length < 1 ||
                          values.email.trim().length < 1 ||
                          values.message.trim().length < 1 ||
                          (!error && values.captcha.trim().length < 1) ? (
                            <CustomButton
                              type="submit"
                              disabled={
                                values.name.trim().length < 1 ||
                                values.email.trim().length < 1 ||
                                values.message.trim().length < 1 ||
                                (!error && values.captcha.trim().length < 1)
                              }
                              buttonStyle="w-full py-[6px] md:py-[10px] 2xl:py-[13px] text-base sm:text-sm lg:py-[12px] lg:text-[16px] 2xl:text-xl font-medium sm:font-medium rounded-md text-white bg-primary shadow-lg max-w-[300px] disabled:cursor-not-allowed disabled:opacity-70 disabled:bg-primary"
                              loaderSize={20}
                            >
                              Send
                            </CustomButton>
                          ) : (
                            <CustomButton
                              type="submit"
                              disabled={
                                values.name.trim().length < 1 ||
                                values.email.trim().length < 1 ||
                                values.message.trim().length < 1 ||
                                (!error && values.captcha.trim().length < 1) ||
                                isLoading
                              }
                              buttonStyle="w-full py-[6px] md:py-[10px] 2xl:py-[13px] text-base sm:text-sm lg:py-[12px] lg:text-[16px] 2xl:text-xl font-medium sm:font-medium rounded-md text-white bg-primary shadow-lg max-w-[300px] disabled:cursor-not-allowed disabled:opacity-70 disabled:bg-primary"
                              loaderSize={20}
                              showLoader
                            >
                              Send
                            </CustomButton>
                          )}
                        </div>
                      </div>
                    </form>
                  )}
                </Formik>
                <div className="h-full w-full flex flex-col justify-between items-center">
                  <div className="aspect-w-8 aspect-h-4 w-full h-full border-[3px] border-solid border-primary rounded-md">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3669.541138621801!2d72.53909061505688!3d23.113887518709067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9ddd5e24dcd1%3A0xdf5c3d5463cdece5!2sInfynno%20Solutions%20%7C%20Expert%20in%20Laravel%2C%20React%20and%20Node%20Apps!5e0!3m2!1sen!2sin!4v1679390031546!5m2!1sen!2sin"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="map"
                    />
                  </div>
                  <div className="flex flex-col gap-3 my-2 h-full w-full">
                    <p className="font-400 font-normal my-1 text-lg ms:text-xs sm:text-base md:text-lg lg:text-xl text-[#353535]">
                      Unlock exclusive technology-driven solutions with us. Our
                      top-tier IT software development services are tailored to
                      meet your needs, no matter where you are in the world.
                    </p>
                    <div className="flex flex-col gap-2 h-full w-full">
                      <div className="flex items-center gap-2 h-full w-full">
                        <FaMapMarkerAlt className="h-8 w-8 sm:h-6 sm:w-6 md:h-4 md:w-4 " />
                        <p className="font-400 text-xs text-[#353535]">
                          1208 Ganesh Glory, Nr. BSNL Office, Jagatpur Chenpur
                          Road, Gota, Sarkhej - Gandhinagar Highway, Ahmedabad -
                          382481 Gujarat, India
                        </p>
                      </div>
                      <a href="https://infynno.com/" target="_blank">
                        <div className="flex items-center gap-2 h-full w-full">
                          <FaGlobe className="h-4 w-4 " />
                          <p className="font-400 text-xs text-[#353535]">
                            infynno.com
                          </p>
                        </div>
                      </a>
                      <a href="mailto:sales@infynno.com">
                        <div className="flex items-center gap-2 h-full w-full">
                          <IoIosMail className="h-4 w-4 " />
                          <p className="font-400 text-xs text-[#353535]">
                            sales@infynno.com
                          </p>
                        </div>
                      </a>
                      <a href="tel:+918488838308">
                        <div className="flex items-center gap-2 h-full w-full">
                          <FaPhoneAlt className="h-4 w-4 " />
                          <p className="font-400 text-xs text-[#353535]">
                            +91 848-883-8308
                          </p>
                        </div>
                      </a>
                      <a href="skype:live.Infynno">
                        <div className="flex items-center gap-2 h-full w-full">
                          <FaSkype className="h-4 w-4 " />
                          <p className="font-400 text-xs text-[#353535]">
                            live.Infynno
                          </p>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative z-[10]">
          <FooterNew />
        </div>
      </div>
    </AuthMiddleware>
  )
}

export default HomePage
