import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const CustomForm = ({ children }: Props): JSX.Element => {
  return (
    <div className="relative z-10 mx-auto max-w-6xl">
      <div className="flex w-full gap-8 items-center justify-center">
        {children}
      </div>
    </div>
  )
}

export default CustomForm
