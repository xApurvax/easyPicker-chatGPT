import React, { useState } from 'react'
import { useField } from 'formik'
import classNames from 'classnames'
import { TextAreaProps } from '../../utils/types'


const CustomTextArea = ({
  inputstyle,
  placeholder,
  borderstyle,
  errorRight,
  iconAfter,
  iconBefore,
  lable,
  name,
  ...props
} : TextAreaProps) => {
  // eslint-disable-next-line no-unused-vars
  const [showPassword, setShowPassword] = useState<Boolean>(true)
  const [field, meta] = useField(name)

  return (
    <div className="relative w-full">
      <textarea
        {...field}
        {...props}
        placeholder={placeholder}
        className={classNames(
          { 'pl-[50px]': iconBefore },
          !meta.error && inputstyle,
          meta.error && borderstyle
        )}
        autoComplete="off"
      />

      {meta.touched && meta.error && (
        <div
          className={classNames('absolute error lg:mt-[2px]', {
            'right-0 xl:left-0': errorRight,
          })}
        >
          <p className="text-[11px] md:text-[12px] xl:text-sm 2xl:text-base  whitespace-nowrap text-red-500">
            {meta.error}
          </p>
        </div>
      )}
    </div>
  )
}

export default CustomTextArea
