import React,{useState} from 'react'
import AnimationLetter from './AnimationLetter';
import CustomForm from './CustomForm'

const HeaderNew = ({Tool,LogIn,SignIn}) => {


  return (
    <div className='relative'>
        <header className="bg-[#544BB9] pt-20 pb-[69px] relative after:content-[''] after:h-[150px] after:w-full after:absolute after:top-full after:bg-[#EDF2F7] after:-translate-y-full after:z-0">
            <div className='flex flex-col justify-center items-center'>
                <p className='font-bold text-6xl text-white'>AI Headline Generator</p>
                <p className='font-medium text-lg text-white'>Generate title ideas for your articles and blog posts</p>
              
            </div>
            <div className='mt-14'>
              <CustomForm Tool={Tool} LogIn={LogIn} SignIn={SignIn} />
            </div>
        </header>
    </div>
  )
}

export default HeaderNew