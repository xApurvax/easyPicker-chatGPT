import React from 'react'
import { IoIosClose } from 'react-icons/io';

const CustomCreateTag = ({tags,setTags,selectedTags,setHasSomethingTyped,...props}) => {
    const addTags = (event) => {
        event.preventDefault()
        if (event.key === "Enter" && event.target.value !== "" && event.target.value.trim() !== "") {
            setTags([...tags, event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1)]);
            // selectedTags([...tags, event.target.value]);
            event.target.value = "";
            setHasSomethingTyped("")
        }
    };
    const removeTags = (index) => {
        setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
    };

  return (
    <main className='w-full max-w-[700px]'>
    <div className={`flex ${tags.length > 0 && "gap-3"}`}> 
        <ul className='flex gap-2 flex-wrap'>
        {tags.map((tag, index) => (
            <li key={index} className="flex items-center p-2 gap-2
            text-[16px] ms:text-xs sm:text-base md:text-lg lg:text-lg rounded-md bg-[#f0f2f3]">
                <span>{tag}</span>
                <IoIosClose 
                // size={20} 
                onClick={() => removeTags(index)} />
            </li>
        ))}
        </ul>
        <div className='w-full'>
            {tags.length < 10 && 
            <input
            {...props}
            type="text"
            onKeyUp={(event) => {addTags(event)}}
            maxLength="15"
            placeholder="Type words and hit Enter ↵ to add"
            className='placeholder:text-[16px] ms:text-[10px] sm:text-base md:text-base lg:text-base
            placeholder:ms:text-[10px] placeholder:sm:text-base placeholder:md:text-base placeholder:lg:text-base p-2 border-[1px] rounded-md bg-[#EDF2F7] border-solid border-[#f8f8f8] text-[16px] focus:outline-none focus:border-[1px] focus:border-solid focus:border-[#aab2b8] focus:rounded-md w-full max-w-[170px] sm:max-w-[260px] disabled:cursor-not-allowed'
            />}
        </div>
    </div>
    </main>
  )
}

export default CustomCreateTag