import React, { useRef } from 'react'

const CustomTooltip = ({children,tooltip,width}) => {
const tooltipRef = useRef();
const containerRef = useRef();
console.log(width,"sssssss")
  return (
    <div
    ref={containerRef}
     onMouseEnter={(clientX) => {
        if(!tooltipRef.current || !containerRef.current) return;
        const {left} =containerRef.current.getBoundingClientRect()
        tooltipRef.current.style.left = clientX - left + "px";
        }} 
     className='group relative inline-block'>
        {children}
        <span ref={tooltipRef} 
        className={`${
          width 
        } invisible group-hover:visible opacity-0 group-hover:opacity-100 transition bg-white border-[1px] border-solid border-[#aab2b8] rounded-sm py-0.5 px-1 absolute -top-2 left-6 mt-2 w-max h-max break-words`}
        >
            <p className='font-normal text-[10px] text-[#252728]'>{tooltip}</p>
        </span>
    </div>
  )
}

export default CustomTooltip