import React, { useRef, MouseEvent } from 'react'

interface CustomTooltipProps {
  children: React.ReactNode
  tooltip: string
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ children, tooltip }) => {
  const tooltipRef = useRef<HTMLSpanElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      onMouseEnter={(event: MouseEvent<HTMLDivElement>) => {
        if (!tooltipRef.current || !containerRef.current) return
        const { left } = containerRef.current.getBoundingClientRect()
        tooltipRef.current.style.left = event.clientX - left + 'px'
      }}
      className="group relative inline-block"
    >
      {children}
      <span
        ref={tooltipRef}
        className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition bg-white border-[1px] border-solid border-[#aab2b8] rounded-sm py-0.5 px-1 absolute -top-2 left-6 mt-2 w-max h-max break-words max-w-[145px]"
      >
        <p className="font-normal text-[10px] text-[#252728]">{tooltip}</p>
      </span>
    </div>
  )
}

export default CustomTooltip
