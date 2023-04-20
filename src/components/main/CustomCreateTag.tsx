import React from 'react'
import { IoIosClose } from 'react-icons/io'
import classNames from 'classnames'
import {
  setHasSomethingTyped,
  setTag,
} from '../../redux/slices/generateHeadlineSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store/store'
import { useSelector } from 'react-redux'

interface CustomCreateTagProps {
  // tag: string[]
  // setTag: React.Dispatch<React.SetStateAction<string[] | []>>
  disabled?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const CustomCreateTag: React.FC<CustomCreateTagProps> = ({
  // tag,
  // setTag,
  disabled = false,
  ...props
}) => {
  const dispatch = useDispatch<AppDispatch>()
  const { tag } = useSelector((state: RootState) => ({
    tag: state.GenerateHeadlineSlice.tag,
  }))
  const addTags = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault()
    const eventTarget = event.target as HTMLInputElement
    if (
      event.key === 'Enter' &&
      eventTarget.value !== '' &&
      eventTarget.value.trim() !== ''
    ) {
      dispatch(
        setTag([
          ...tag,
          eventTarget.value.charAt(0).toUpperCase() +
            eventTarget.value.slice(1),
        ])
      )
      eventTarget.value = ''
      setHasSomethingTyped && dispatch(setHasSomethingTyped(''))
    }
  }
  const removeTags = (index: number) => {
    dispatch(
      setTag([
        ...tag.filter((tag: string, tagIndex: number) => tagIndex !== index),
      ])
    )
  }

  return (
    <main className="w-full max-w-[700px]">
      <div className={classNames('flex flex-col', tag.length > 0 && 'gap-3')}>
        <ul className="flex gap-2 flex-wrap">
          {tag.map((tag: string, index: number) => (
            <li
              key={index}
              className="flex items-center p-2 gap-2
            text-xs ms:text-xs sm:text-base md:text-lg lg:text-xs rounded-md bg-[#f0f2f3]"
            >
              <span>{tag}</span>
              <IoIosClose
                onClick={() => removeTags(index)}
                className="cursor-pointer text-xs ms:text-xs sm:text-base md:text-lg lg:text-lg"
              />
            </li>
          ))}
        </ul>
        <div className="w-full">
          {tag.length < 10 && (
            <input
              {...props}
              type="text"
              onKeyUp={(event) => addTags(event)}
              maxLength={15}
              placeholder="Type word and hit Enter ↵ to add"
              className="placeholder:text-[10px] ms:text-[10px] sm:text-base md:text-base lg:text-base
            placeholder:ms:text-[10px] placeholder:sm:text-base placeholder:md:text-base placeholder:lg:text-xs lg:max-w-[200px] p-2 lg:py-1.5 border-[1px] rounded-md bg-secondary border-solid border-primaryBorder text-[16px] focus:outline-none focus:border-[1px] focus:border-solid focus:border-primary focus:rounded-md w-full max-w-[170px] sm:max-w-[260px] disabled:cursor-not-allowed "
            />
          )}
        </div>
      </div>
    </main>
  )
}

export default CustomCreateTag
