import React from 'react'
import { IoIosClose } from 'react-icons/io';

const CustomCreateTag = ({tags,setTags,selectedTags,showError,setShowError}) => {
    const addTags = (event) => {
        if (event.key === "Enter" && event.target.value !== "" && event.target.value.trim() !== "") {
            setTags([...tags, event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1)]);
            // selectedTags([...tags, event.target.value]);
            event.target.value = "";
        }
    };
    const removeTags = (index) => {
        setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
    };

  return (
    <main className='w-full max-w-[700px]'>
    <div className='flex gap-3'> 
        <ul className='flex gap-2 flex-wrap'>
        {tags.map((tag, index) => (
            <li key={index} className="flex items-center  p-0.5 px-2 rounded-md bg-[#f0f2f3]">
                <span>{tag}</span>
                <IoIosClose size={20} onClick={() => removeTags(index)} />
            </li>
        ))}
        </ul>
        <div className='w-full'>
            {tags.length < 10 && 
            <input
            type="text"
            onKeyUp={(event) => {addTags(event)}}
            maxLength="15"
            placeholder="Type words and hit Enter ↵ to add"
            className='placeholder:text-[12px] p-1 border-[1px] rounded-md border-solid border-[#f8f8f8] text-[14px] focus:outline-none focus:border-[1px] focus:border-solid focus:border-[#aab2b8] focus:rounded-md w-full max-w-[200px]'
            />}
            {/* {showError && tags.length <=0 && 
            <p className='text-xs text-[#f70000]'>Please enter at least one word</p>} */}
        </div>
    </div>
    </main>
  )
}

export default CustomCreateTag