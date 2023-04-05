import React from 'react'

const CustomForm = ({children}) => {

  return (
    <div className='relative z-10 mx-auto max-w-6xl'>
        <div className='flex w-full gap-8 items-center justify-center'>
            {children}
        </div>
    </div>
  )
}

export default CustomForm