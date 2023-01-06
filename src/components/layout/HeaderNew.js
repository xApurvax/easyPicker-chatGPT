import React,{useState} from 'react'
import AnimationLetter from './AnimationLetter';
import CustomForm from './CustomForm'

const HeaderNew = () => {

  // const[letterClass,setLetterClass] = useState("text-animate");
  // const headArr = ['A','I',' ','H','e','a','d','l','i','n','e']
  // const titleArr = ['G','e','n','e','r','a','t','e',' ','t','i','t','l','e',' ','i','d','e','a','s',' ','f','o','r',' ','y','o','u','r',' ','a','r','t','i','c','l','e','s',' ','a','n','d',' ','b','l','o','g',' ','p','o','s','t','s']

  return (
    <div className='relative'>
        <header className="bg-[#544BB9] pt-20 pb-[69px] relative after:content-[''] after:h-[150px] after:w-full after:absolute after:top-full after:bg-[#EDF2F7] after:-translate-y-full after:z-0">
            <div className='flex flex-col justify-center items-center'>
                <p className='font-bold text-6xl text-white'>AI Headline Generator</p>
                <p className='font-medium text-lg text-white'>Generate title ideas for your articles and blog posts</p>
                {/* <AnimationLetter letterClass={letterClass} strArr={headArr} idx={1} />
                <AnimationLetter letterClass={letterClass} strArr={titleArr} idx={15} /> */}
            </div>
            <div className='mt-14'>
              <CustomForm />
            </div>
        </header>
        {/* <div className='absolute top-36 mx-40 -z-1 flex justify-center items-center'>
            <CustomForm />
        </div> */}
    </div>
  )
}

export default HeaderNew