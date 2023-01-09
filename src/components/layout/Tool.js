import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { setGenerateHeadlineEffect,setSaveResult,setReGenerate } from "../../redux/slices/buttonEffectSlice";
import { ThreeDots } from 'react-loader-spinner'
import CustomCreateTag from "../main/CustomCreateTag";
import { FaBookmark } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import { FaRegCopy } from 'react-icons/fa';
import { BsCheck2 } from 'react-icons/bs';
import {generateHeadlineFetchAPi} from "../../redux/slices/generateHeadlineSlice";
import logo from "../../assets/recycle.svg";
import { Formik } from 'formik'
import InputField from "../form/InputField";
import CustomButton from "../form/CustomButton";
import { LoginValidationSchema } from '../../utils/FormValidations';
import { loginFetchAPi } from '../../redux/slices/auth/loginSlice';

const Tool = () => {

    const dispatch = useDispatch();
    const[count,setCount] = useState(0)
    const [hasArticle, setHasArticle] = useState("");
    const [latestCopied,setLatestCopied]=useState({
      copiedId:null,
      })
    const[tag,setTag] = useState([])
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
  
    const [counter,setCounter] = useState([
      {countValue : 1 ,id:1},
      {countValue : 3 ,id:2},
      {countValue : 5 ,id:3},
      {countValue : 7 ,id:4},
      {countValue : 10 ,id:5},
    ]);
  
    const [ counterSelected, setCounterSelected ] = useState({selected:false,id:null});
  
    const [copyAllId,setCopyAllId] = useState({id:specialTags?.length + allTitles?.length + 1})
    useEffect(() => {
      allTitles && specialTags && setCopyAllId({id:allTitles?.length + specialTags?.length +1})
    }, [copyAllId,latestCopied])
    
   
  
    const handleChange = (e) => {
      setHasArticle(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault()
      dispatch(generateHeadlineFetchAPi({
        heading_type: tag.join(","),
        paragraph : hasArticle,
        num_headers : count,
      }))
    };

  return (
    <div className='flex p-5 gap-8'>
        <div className='flex flex-col gap-3'>
        <div className='flex flex-col'>
            <div className=''>
            <p className='font-medium text-sm text-[#4A5568]'>Put your article text below</p>
            <textarea
                className="resize-none p-3 my-2 bg-[#EDF2F7] border-[1px] rounded-md border-solid border-[#f8f8f8] text-[14px] focus:outline-none focus:border-[1px] focus:border-solid focus:border-[#aab2b8] focus:rounded-md scrollbar-thumb-transparent scrollbar-track-transparent group-hover:scrollbar-thumb-[#c3c3c3] group-hover:scrollbar-track-[#ededed] scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-opacity-0.3 disabled:cursor-not-allowed"
                rows={10}
                cols={90}
                disabled={isLoading}
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
                <div className='my-2'>
                <CustomCreateTag  disabled = {isLoading} tags={tag} setTags={setTag}/>
                </div>
            </div>
            <div className=''>
                <p className='font-medium text-sm text-[#4A5568]'>No of Headlines</p>
                <div className='flex gap-2 my-2'>
                    {counter && counter.map((data,id) => (
                        <>
                            <button key={id} 
                                disabled={isLoading}
                                onClick={(e) => {
                                e.preventDefault()
                                setCount(data.countValue);
                                setCounterSelected({selected:true,id:id});
                            }} 
                                className={`${counterSelected.id == id && data.countValue == count ? "bg-[#544BB9] text-white font-bold":"bg-[#EDF2F7] text-[#000000]"} flex items-center justify-center w-11 h-11  rounded-md cursor-pointer disabled:cursor-not-allowed`}>
                                    {data.countValue}
                            </button>
                        </>
                    ))}
                </div>
            </div>
        </div>
        <div>
            <button 
            type='submit'
            disabled={hasArticle.trim() ==="" || count == 0 || isLoading}
            className={`${
                generateHeadlineEffect && "animate-wiggle"
                } flex items-center justify-center px-4 py-3 rounded-md bg-[#544BB9] text-[#E3E3E3] hover:text-white font-medium text-sm disabled:bg-[#2D3748] disabled:cursor-not-allowed w-1/4`}
                onClick={(e) => {
                dispatch(setGenerateHeadlineEffect(true));
                handleSubmit(e);
                // setHasArticle(hasArticle)
                // setEdit(false)
                }}
                onAnimationEnd={() => {
                dispatch(setGenerateHeadlineEffect(false));
                }}
            >{!isLoading ?
                "Generate Headlines" :
                <ThreeDots 
                height="20" 
                width="35" 
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
        {hasTitleTag !== null ?
        <div className='flex flex-col gap-5 w-full'>
            <div className='flex flex-col gap-1 w-full group'>
                <p className='font-500 text-sm text-[#4A5568]'>Headlines</p>
                <div className='border-[1px] border-solid border-[#EDF2F7] rounded-md p-2 max-h-[200px] scrollbar-thumb-transparent scrollbar-track-transparent group-hover:scrollbar-thumb-[#c3c3c3] group-hover:scrollbar-track-[#ededed] scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-opacity-0.3'>
                    <div className='flex flex-col gap-2'>
                        {allTitles && allTitles.map((title,id) => (
                    <div key={id} className='flex items-start justify-between'>
                        <p className='font-medium text-sm text-[#4A5568] max-w-[360px]'>{title}</p>
                        <button onClick={(e) => {  
                            navigator.clipboard.writeText(title);
                            setLatestCopied({copiedId: id});
                            setCopyAllId({id:allTitles.length + specialTags.length +1})
                            toast.success('Title Copied!')}} 
                            type='button'>
                                {latestCopied.copiedId == id ? 
                                <p className='flex gap-1 items-center w-16 px-2 py-2 bg-[#544BB9] rounded-md text-[12px] leading-[14px] text-white'><BsCheck2 />copied</p>
                                : 
                                <p className='flex gap-1 items-center w-16 px-2 py-2 bg-[#EDF2F7] rounded-md text-[12px] leading-[14px] text-[#4A5568]'><FaRegCopy />copy</p>
                                }
                            </button>
                    </div>))}
                </div>
            </div>
        </div>
        <div className='flex flex-col gap-1 w-full'>
            <div className='flex items-center gap-3'>
                <p className='font-500 text-sm text-[#4A5568]'>Keywords</p>
                <button onClick={() => {navigator.clipboard.writeText(copyAllSpecialTags);
                setLatestCopied({copiedId:specialTags.length + allTitles.length + 1});
                toast.success('All Tags Copied!')}} type='button' className={`px-2 py-1.5  rounded-md text-[12px] leading-[14px]  ${latestCopied.copiedId == copyAllId.id ? "bg-[#544BB9] text-white":"bg-[#EDF2F7] text-[#4A5568]" }`}>Copy All</button>
            </div>
            <div className='py-1'>  
                <div className='flex gap-2 flex-wrap'>
                    {specialTags && specialTags.map((tag,id)=>(
                    <button onClick={(e) => {  
                        navigator.clipboard.writeText(tag.trim());
                        setLatestCopied({copiedId:id + allTitles.length});
                        setCopyAllId({id:allTitles.length + specialTags.length +1})
                        toast.success('Tag Copied!') }} 
                        type='button' className={`${latestCopied.copiedId === id + allTitles.length ? "bg-[#544BB9] font-medium text-white":"bg-[#EDF2F7]"} px-3 py-2 border-[1px] border-solid border-[#EDF2F7] rounded-md text-xs text-[#4A5568]`}>{tag.trim()}</button>
                    ))} 
                </div>
            </div>
        </div>
        <div className='flex py-3 gap-4 w-full'>
            <div>
                <button
                    type='button'
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
                type='button'
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
        </div>:
         <div className='flex h-full justify-center items-center px-4'>
            <p className='font-medium text-base text-[#4A5568]'>Fill out the form to the left to generate content</p>
        </div>
        }
    </div>
  )
}

export default Tool