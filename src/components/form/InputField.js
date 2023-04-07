import React, { useState } from 'react'
import { useField } from 'formik'
import classNames from 'classnames'
import { BsEye, BsEyeSlash } from 'react-icons/bs'

const InputField = ({
  inputstyle,
  placeholder,
  borderstyle,
  errorRight,
  iconAfter,
  iconBefore,
  lable,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(true)
  const [field, meta] = useField(props)

  return (
    <div className="relative w-full">
      {iconBefore ? (
        <div className="absolute cursor-pointer top-1/2 h-max -translate-y-1/2 left-5 text-white">
          <>{iconBefore} </>
        </div>
      ) : null}
      <input
        {...field}
        {...props}
        placeholder={placeholder}
        className={classNames(
          { 'pl-[50px]': iconBefore },
          { [inputstyle]: !meta.error },
          { [borderstyle]: meta.error }
        )}
        autoComplete="off"
        type={
          props?.type === 'password'
            ? showPassword
              ? 'password'
              : 'text'
            : props.type || 'text'
        }
      />
      {props.type === 'password' ? (
        <div
          className="absolute top-4 2xl:top-[24px] right-5 cursor-pointer select-none text-textGray"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <BsEyeSlash size={20} /> : <BsEye size={20} />}
        </div>
      ) : iconAfter ? (
        <div className="absolute cursor-pointer top-1/2 h-max -translate-y-1/2 right-5 text-white">
          <>{iconAfter} </>
        </div>
      ) : null}
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

export default InputField
