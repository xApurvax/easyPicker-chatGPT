import React, { useState } from 'react'
import { useEffect } from 'react'
import AuthMiddleware from '../../utils/AuthMiddleware'
import FooterNew from './FooterNew'
import NavbarNewA from './NavBarNewA'
import { dynamicHeadline } from "../../utils/Data";
import demo1 from "../../assets/Demo1-tagline-generator.png";
import use1 from "../../assets/use-title-generator-1.svg";
import use2 from "../../assets/use-title-generator-2.svg";
import use3 from "../../assets/use-title-generator-3.svg";

let COUNT = 0;
const HomePage = () => {
  const [heading, setHeading] = useState(dynamicHeadline[0]);

  const handleHeading = () => {
    setHeading(dynamicHeadline[COUNT]);
    if (COUNT >= dynamicHeadline.length - 1) COUNT = 0;
    else COUNT++;
  };
  useEffect(() => {
    setInterval(handleHeading, 10000);
  }, []);

    useEffect(() => {
        document.title = "How it works | Tagline Generator"
      }, [])

  return (
    <AuthMiddleware>
    <div className='flex flex-col'>
      <div className='sticky top-0 w-full z-[20]'>  
      <NavbarNewA />
      </div>  
      <div className="flex flex-col justify-center items-center h-full w-full">
        <div className="bg-[#544BB9] py-8 ms:py-8 sm:py-10 md:py-14 lg:py-20 h-full flex flex-col items-center justify-center w-full">
          <div className="flex flex-col justify-center items-center gap-1 ms:gap-3 lg:gap-5 ">
            <div  className="flex flex-col justify-center items-center ms:gap-1 max-w-[40%] ms:max-w-[60%] lg:max-w-[40%]">
              <p className="font-bold text-2xl ms:text-2xl sm:text-4xl md:text-4xl lg:text-4xl text-[#ffe84d]">
                Title Generator
              </p>
              <p className="font-bold text-xl ms:text-xl sm:text-3xl md:text-3xl lg:text-3xl text-white">
                Powered by AI
              </p>
            </div>
            <p
              className="font-medium text-lg ms:text-xs sm:text-base md:text-lg text-white text-center max-w-[80%] ms:max-w-[80%] lg:max-w-[50%]"
            >
              {/* {heading} */}
              For your blog or post, do you need compelling headlines? To receive a tonne of useful suggestions for a successful content strategy, use this tool to generate innovative title ideas.
            </p>
          </div>
        </div>
        <div className='h-full w-full'>
        <div className="bg-white py-8 ms:py-8 sm:py-10 md:py-14 lg:py-20 h-full flex flex-col items-center justify-center w-full">
          <div className="flex flex-col gap-3 justify-center items-center ms:gap-3 lg:gap-5">
            <p className="font-bold text-xl ms:text-xl sm:text-3xl md:text-3xl lg:text-4xl text-center text-black max-w-[60%] ms:max-w-[80%] lg:max-w-[60%]">
            What Can You Do with AI Title Generator?
            </p>
            <p
              className="font-medium text-xs ms:text-xs sm:text-base md:text-lg text-black text-center"
            >
              AI Title Generator is catchy title maker, developed by <b className='text-[#544BB9]'><a href='https://infynno.com/' target="_blank">Infynno</a></b>, to help you unleash your creativity.
            </p>
          </div>
        </div>
        </div>
        <div className='flex flex-col justify-center items-center w-full h-full gap-14 ms:gap-5 sm:gap-8 md:gap-10 lg:gap-14'>
          <div className='py-4 ms:p-4 md:py-12 md:px-10 lg:py-12 lg:px-0 flex ms:flex-col md:flex-row bg-[#544BB9] max-w-7xl justify-center items-start gap-3 ms:gap-3 md:gap-0 w-full rounded-2xl'>
              <div className='w-full h-full flex justify-center items-center'>
                  <img src={demo1} alt="Demo-tagline-generator" className=' rounded-2xl' />
              </div>
              <div className='w-full h-full flex justify-center items-center'>
                <div className="flex flex-col gap-[2%] justify-center items-center ms:items-start ms:justify-start md:items-center md:justify-center ms:gap-3 lg:gap-5 max-w-[80%] ms:max-w-[95%] lg:max-w-[80%]">
              <p className="font-bold text-xl ms:text-xl sm:text-3xl md:text-3xl lg:text-4xl text-white">
              Create the Perfect Title for Your New Blog Post
              </p>
              <p
                className="font-normal text-lg ms:text-xs sm:text-base md:text-lg lg:text-2xl text-white"
              >
                ⮩ Create a large number of pertinent title recommendations with only one click to acquire fresh blog post ideas.
              </p>
              <p
                className="font-normal text-lg ms:text-xs sm:text-base md:text-lg lg:text-2xl text-white"
              >
                ⮩ In order to position your material for success, add certain words that will appear in your title.
              </p>
              <p
                className="font-normal text-lg ms:text-xs sm:text-base md:text-lg lg:text-2xl text-white"
              >
                ⮩ Use generated titles for higher social media engagement.
              </p>
                </div>
              </div>
          </div>
          <div className='py-4 ms:p-4 md:py-12 md:px-10 lg:py-12 lg:px-0 flex ms:flex-col-reverse md:flex-row bg-[#ffe84d] max-w-7xl justify-start items-start gap-3 ms:gap-3 md:gap-0 w-full rounded-2xl'>
              <div className='w-full h-full flex justify-center items-center'>
                <div className="flex flex-col gap-[2%] justify-center items-center ms:items-start ms:justify-start md:items-center md:justify-center ms:gap-3 lg:gap-5 max-w-[80%] ms:max-w-[95%] lg:max-w-[80%]">
                  <p className="font-bold text-6xl ms:text-2xl sm:text-3xl md:text-3xl lg:text-4xl text-white">
                  Elevate Your Content with Catchy, Diverse Headlines
                  </p>
                  <p
                    className="font-normal text-lg ms:text-xs sm:text-base md:text-lg lg:text-2xl text-white"
                  >
                    ⮩ Use AI to set your content up for success with creative, attention-grabbing blog post titles.
                  </p>
                  <p
                    className="font-normal text-lg ms:text-xs sm:text-base md:text-lg lg:text-2xl text-white"
                  >
                    ⮩ If you like the produced titles and wish to save them for future use, simply click on save results. You may then examine prior results and copy them later.
                  </p>
                  <p
                    className="font-normal text-lg ms:text-xs sm:text-base md:text-lg lg:text-2xl text-white"
                  >
                    ⮩ If you want to produced titles with same input and and wish to regenerate again than we have that option too.
                  </p>
                </div>
              </div>
              <div className='w-full h-full flex justify-center items-center'>
                  <img src={demo1} alt="Demo-tagline-generator" className=' rounded-2xl' />
              </div>
          </div>
          <div className='py-4 ms:p-4 md:py-12 md:px-10 lg:py-12 lg:px-0 flex ms:flex-col md:flex-row bg-[#544BB9] max-w-7xl justify-center items-start gap-3 ms:gap-3 md:gap-0 w-full rounded-2xl'>
              <div className='w-full h-full flex justify-center items-center'>
                  <img src={demo1} alt="Demo-tagline-generator" className=' rounded-2xl' />
              </div>
              <div className='w-full h-full flex justify-center items-center'>
                <div className="flex flex-col gap-[2%] justify-center items-center ms:items-start ms:justify-start md:items-center md:justify-center ms:gap-3 lg:gap-5 max-w-[80%] ms:max-w-[95%] lg:max-w-[80%]">
              <p className="font-bold text-6xl ms:text-2xl sm:text-3xl md:text-3xl lg:text-4xl text-white">
                Generate New Ideas for Your Content Calendar
              </p>
              <p
                className="font-normal text-lg ms:text-xs sm:text-base md:text-lg lg:text-2xl text-white"
              >
               ⮩ Enter a topic you’d like to cover, and get suggestions for original articles that include How-To, Guides, Listicles, and more
              </p>
                </div>
              </div>
          </div>
        </div>
        <div className='w-full h-full mt-14 ms:mt-6 sm:mt-10 md:mt-12 lg:mt-14 bg-[#ffe84d]'>
          <div className='flex flex-col py-12 ms:py-4 sm:py-6 md:py-8 lg:py-12 justify-center items-center'>
            <div className="flex justify-center items-center">
              <p className="font-bold text-6xl ms:text-2xl sm:text-3xl md:text-3xl lg:text-4xl text-center text-black max-w-[80%]">
              What Can You Do with AI Title Generator?
              </p>
            </div>
            <div className='flex ms:flex-col md:flex-row ms:gap-5 md:gap-0 max-w-7xl py-10 ms:py-4 sm:py-6 md:py-8 lg:py-10'>
              <div className='flex flex-col justify-between items-center h-full w-full gap-8'>
                <div className='w-full h-full flex justify-center items-center'>
                    <img src={use1} alt="Demo-tagline-generator" className=' rounded-2xl' />
                </div>
                <div className='w-full h-full flex justify-center items-center'>
                  <div className="flex flex-col gap-[2%] justify-center items-center ms:gap-3 lg:gap-5 max-w-[80%]">
                    <p
                      className="font-normal text-lg ms:text-xs sm:text-base md:text-lg lg:text-2xl text-[#333333] text-center"
                    >
                      Lead more eyes to your content with high-quality headlines.
                    </p>
                  </div>
              </div>
              </div>
              <div className='flex flex-col justify-between items-center h-full w-full gap-8'>
                <div className='w-full h-full flex justify-center items-center'>
                    <img src={use2} alt="Demo-tagline-generator" className=' rounded-2xl' />
                </div>
                <div className='w-full h-full flex justify-center items-center'>
                  <div className="flex flex-col gap-[2%] justify-center items-center ms:gap-1 lg:gap-5 max-w-[80%]">
                    <p
                      className="font-normal text-lg ms:text-xs sm:text-base md:text-lg lg:text-2xl text-[#333333] text-center"
                    >
                      Come up with high-potential headlines with the best tone of voice for your audience.
                    </p>
                  </div>
              </div>
              </div>
              <div className='flex flex-col justify-between items-center h-full w-full gap-8'>
                <div className='w-full h-full flex justify-center items-center'>
                    <img src={use3} alt="Demo-tagline-generator" className=' rounded-2xl' />
                </div>
                <div className='w-full h-full flex justify-center items-center'>
                  <div className="flex flex-col gap-[2%] justify-center items-center ms:gap-1 lg:gap-5 max-w-[80%]">
                    <p
                      className="font-normal text-lg ms:text-xs sm:text-base md:text-lg lg:text-2xl text-[#333333] text-center"
                    >
                     Design and enrich your content plan, with diverse blog titles and related content ideas.
                    </p>
                  </div>
              </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#ede0ff] py-16 ms:py-8 sm:py-10 md:py-14 lg:py-16 h-full flex flex-col items-center justify-center w-full">
          <div className="flex flex-col justify-center items-center gap-1 ms:gap-5 lg:gap-16 ">
            <div className="flex justify-center items-center">
              <p className="font-bold text-xl ms:text-xl sm:text-4xl md:text-4xl lg:text-4xl text-center text-black">
                  FAQ
              </p>
            </div>
            <div className='grid grid-cols-3 grid-flow-rows auto-rows-max ms:grid-cols-1 md:grid-cols-2 gap-4 ms:gap-4 sm:gap-6 md:gap-8 lg:gap-10 w-full h-full max-w-6xl'>
                <div className='bg-white flex flex-col gap-3 rounded-2xl p-2 ms:p-5 sm:p-5 md:p-5 lg:p-6 overflow-hidden'>
                  <p className='font-bold text-lg ms:text-xs sm:text-base md:text-lg lg:text-2xl text-[#333333]'>How Does AI Title Generator Work?</p>
                  <p className='font-normal text-lg ms:text-xs sm:text-base md:text-lg lg:text-2xl text-[#333333]'>AI Title Generator is powered by AI. It uses artificial intelligence to suggest catchy, relevant titles for your blog posts, articles, landing pages, or other content. It also suggests related topics you might want to target.</p>
                </div>
                <div className='bg-white flex flex-col gap-3 rounded-2xl p-2 ms:p-5 sm:p-5 md:p-5 lg:p-6 overflow-hidden'>
                  <p className='font-bold text-lg ms:text-xs sm:text-base md:text-lg lg:text-2xl text-[#333333]'>Why Should I Use AI Title Generator?</p>
                  <p className='font-normal text-lg ms:text-xs sm:text-base md:text-lg lg:text-2xl text-[#333333]'>AI Title Generator suggest dozens of original titles in just a click. Speed up your brainstorming process, generate new blog post ideas, or create the perfect headline for an existing project.</p>
                </div>
                <div className='bg-white col-span-full flex flex-col gap-3 rounded-2xl p-2 ms:p-5 sm:p-5 md:p-5 lg:p-6 overflow-hidden'>
                  <p className='font-bold text-lg ms:text-xs sm:text-base md:text-lg lg:text-2xl text-[#333333]'>How Much Does AI Title Generator Cost?</p>
                  <p className='font-normal text-lg ms:text-xs sm:text-base md:text-lg lg:text-2xl text-[#333333]'>AI Title Generator is paid to use, but will get 100 coins as joining bonus on first sign up, then after you can buy it any time and generate as many titles as you want, and share them with your teammates and writers.</p>
                </div>
                <div className='bg-white flex flex-col gap-3 rounded-2xl p-2 ms:p-5 sm:p-5 md:p-5 lg:p-6 overflow-hidden'>
                  <p className='font-bold text-lg ms:text-xs sm:text-base md:text-lg lg:text-2xl text-[#333333]'>Who Owns the Generated Text?</p>
                  <p className='font-normal text-lg ms:text-xs sm:text-base md:text-lg lg:text-2xl text-[#333333]'>You do! You’re free to use any title you generate in your own work.</p>
                </div>
                <div className='bg-white flex flex-col gap-3 rounded-2xl p-2 ms:p-5 sm:p-5 md:p-5 lg:p-6 overflow-hidden'>
                  <p className='font-bold text-lg ms:text-xs sm:text-base md:text-lg lg:text-2xl text-[#333333]'>What Languages Are Supported?</p>
                  <p className='font-normal text-lg ms:text-xs sm:text-base md:text-lg lg:text-2xl text-[#333333]'>Currently, AI Title Generator is available in English.</p>
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