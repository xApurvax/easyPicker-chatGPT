import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { setGenerateHeadlineEffect,setSaveResult,setReGenerate } from "../../redux/slices/buttonEffectSlice";
import { ThreeDots } from 'react-loader-spinner'
import CustomCreateTag from "../main/CustomCreateTag";
import { FaBookmark } from 'react-icons/fa';
import { GrPowerCycle } from 'react-icons/gr';
import logo from "../../assets/recycle.svg";

const CustomForm = () => {
  const dispatch = useDispatch();
  const[count,setCount] = useState(1)
  const [hasArticle, setHasArticle] = useState("");
  const[tag,setTag] = useState([])
  const { generateHeadlineEffect,isLoading,saveResult,reGenerate } = useSelector((state) => ({
    generateHeadlineEffect: state.buttonEffectSlice.generateHeadlineEffect,
    saveResult: state.buttonEffectSlice.saveResult,
    reGenerate: state.buttonEffectSlice.reGenerate,
    isLoading: state.generateHeadlineSlice.isLoading,

  }));
  const [counter,setCounter] = useState([
    {countValue : 3 ,id:1},
    {countValue : 5 ,id:2},
    {countValue : 10 ,id:3},
    {countValue : 15 ,id:4},
    {countValue : 20 ,id:5},
  ]);

  const [ counterSelected, setCounterSelected ] = useState({selected:false,id:null});


  const handleChange = (e) => {
    setHasArticle(e.target.value);
  };

 

  return (
    <div className='bg-white relative z-10 rounded-xl mx-auto max-w-6xl'>
        <div className='flex p-5 gap-8'>
            <div className='flex flex-col gap-3'>
                <div className='flex flex-col'>
                    <div className=''>
                    <p className='font-medium text-sm text-[#4A5568]'>Put your article text below</p>
                    <textarea
                        className="resize-none p-3 my-2 bg-[#EDF2F7] border-[1px] rounded-md border-solid border-[#f8f8f8] text-[14px] focus:outline-none focus:border-[1px] focus:border-solid focus:border-[#aab2b8] focus:rounded-md scrollbar-thumb-transparent scrollbar-track-transparent group-hover:scrollbar-thumb-[#c3c3c3] group-hover:scrollbar-track-[#ededed] scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-opacity-0.3"
                        rows={10}
                        cols={90}
                        id="paragraph"
                        name="paragraph"
                        type="text"
                        value={hasArticle}
                        placeholder="Type in or copy and paste your text/articale"
                        onChange={(e) => {
                        handleChange(e);
                        }}
                    />
                    </div>
                    <div className=''>
                        <p className='font-medium text-sm text-[#4A5568]'>Keywords to Include in Headline</p>
                        {/* <input className='w-full p-2 my-2 bg-[#EDF2F7] border-[1px] rounded-md border-solid border-[#f8f8f8] text-[14px] focus:outline-none focus:border-[1px] focus:border-solid focus:border-[#aab2b8] focus:rounded-md' /> */}
                        <div className='my-2'>
                        <CustomCreateTag tags={tag} setTags={setTag}/>
                        </div>
                    </div>
                    <div className=''>
                        <p className='font-medium text-sm text-[#4A5568]'>No of Headlines</p>
                        <div className='flex gap-2 my-2'>
                            {/* <div className="flex items-center justify-center h-10 w-12 border-[1px] rounded-md border-solid border-[#DADADA] bg-[#EDF2F7]">
                            <p className="font-[600] text-[16px] leading-[24px] text-[#252728] w-5">
                                    {count}
                                    </p>
                                    <div className="flex flex-col border-l-[1px] border-solid border-[#DADADA]">
                                    <button
                                        className="border-b-[1px] border-solid border-[#DADADA] text-[#252728] disabled:text-[#aab2b8] disabled:cursor-not-allowed"
                                        onClick={(e) => {
                                        e.preventDefault();
                                        setCount((prev) => prev + 1);
                                        }}
                                        onMouseLeave={timeoutClearUp}
                                        onMouseUp={timeoutClearUp}
                                        onMouseDown={increment}
                                        disabled={count >= 30}
                                    >
                                        <BiPlus />
                                    </button>
                                    <button
                                        className="text-[#252728] disabled:text-[#aab2b8] disabled:cursor-not-allowed"
                                        onClick={(e) => {
                                        e.preventDefault();
                                        setCount((prev) => prev - 1);
                                        }}
                                        onMouseLeave={timeoutClearUp}
                                        onMouseUp={timeoutClearUp}
                                        onMouseDown={decrement}
                                        disabled={count <= 1}
                                    >
                                        <BiMinus />
                                    </button>
                                    </div>
                            </div> */}
                            {counter && counter.map((data,id) => (
                                <>
                                    <div key={id} onClick={(e) => {
                                        e.preventDefault()
                                        setCount(data.countValue);
                                        setCounterSelected({selected:true,id:id});
                                    }} 
                                        className={`${counterSelected.id == id && data.countValue == count ? "bg-[#544BB9] text-white font-bold":"bg-[#EDF2F7] text-[#000000]"} flex items-center justify-center w-11 h-11  rounded-md cursor-pointer`}>
                                            {data.countValue}
                                    </div>
                                </>
                            ))}
                        </div>
                    </div>
                </div>
                <div>
                    <button 
                    disabled={!hasArticle || count == 1 || isLoading}
                    className={`${
                        generateHeadlineEffect && "animate-wiggle"
                        } flex px-4 py-3 rounded-md bg-[#544BB9] text-[#E3E3E3] hover:text-white font-medium text-sm disabled:bg-[#2D3748] disabled:cursor-not-allowed`}
                        onClick={(e) => {
                        dispatch(setGenerateHeadlineEffect(true));
                        // setHasArticle(hasArticle)
                        // setEdit(false)
                        }}
                        onAnimationEnd={() => {
                        dispatch(setGenerateHeadlineEffect(false));
                        }}
                    >{!isLoading ?
                        "Generate Headlines" :
                        <ThreeDots 
                          height="40" 
                          width="40" 
                          radius="9"
                          color="#fafafa" 
                          ariaLabel="three-dots-loading"
                          wrapperStyle={{}}
                          wrapperClassName=""
                          visible={true}
                          /> 
                          }</button>
                </div>
            </div>
            <div className='flex justify-center items-start'>
                {/* <div className='flex justify-center items-center px-4'>
                    <p className='font-medium text-base text-[#4A5568]'>Fill out the form to the left to generate content</p>
                </div> */}
                <div className='flex flex-col gap-5'>
                    <div className='flex flex-col gap-1'>
                        <p className='font-500 text-sm text-[#4A5568]'>Headlines</p>
                        <div className='border-[1px] border-solid border-[#EDF2F7] rounded-md p-2'>
                            <div className='flex flex-col gap-2'>
                                <div className='flex items-start justify-between'>
                                    <p className='font-medium text-sm text-[#4A5568]'>10 Awesome Tools for Taming GitHub Pull Requests for Taming GitHub Pull Requests</p>
                                    <button type='button' className='px-3 py-2 bg-[#EDF2F7] rounded-md text-[12px] leading-[14px] text-[#4A5568]'>Copy</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <div className='flex items-center gap-3'>
                            <p className='font-500 text-sm text-[#4A5568]'>Keywords</p>
                            <button type='button' className='px-2 py-1.5 bg-[#EDF2F7] rounded-md text-[12px] leading-[14px] text-[#4A5568]'>Copy All</button>
                        </div>
                        <div className='py-1'>
                            <div className='flex gap-2'>
                                <button type='button' className='px-3 py-2 border-[1px] border-solid border-[#EDF2F7] rounded-md text-xs text-[#4A5568]'>GitHub</button> 
                                <button type='button' className='px-3 py-2 border-[1px] border-solid border-[#EDF2F7] rounded-md text-xs text-[#4A5568]'>ChatGPT</button> 
                            </div>
                        </div>
                    </div>
                    <div className='flex py-3 gap-4'>
                        <div>
                            <button
                             className={`${
                                saveResult && "animate-wiggle"
                                } flex gap-2 px-4 py-2 rounded-md bg-[#544BB9] text-[#E3E3E3] hover:text-white font-medium text-sm disabled:bg-[#2D3748] disabled:cursor-not-allowed`}
                                onClick={(e) => {
                                    dispatch(setSaveResult(true));
                                }}
                                onAnimationEnd={() => {
                                    dispatch(setSaveResult(false));
                                }}
                                ><FaBookmark size={18} /> Save Results</button>
                        </div>
                        <div>
                            <button 
                            className={`${
                                reGenerate && "animate-wiggle"
                                } flex gap-2 px-4 py-2 rounded-md bg-[#2D3748] text-[#E3E3E3] hover:text-white font-medium text-sm disabled:bg-[#544BB9] disabled:cursor-not-allowed`}
                                onClick={(e) => {
                                    dispatch(setReGenerate(true));
                                }}
                                onAnimationEnd={() => {
                                    dispatch(setReGenerate(false));
                                }}
                                > 
                                <img src={logo} alt="logo" className="w-5 cursor-pointer" />
                                    Regenerate</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CustomForm