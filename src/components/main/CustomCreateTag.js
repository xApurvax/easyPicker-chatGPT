import React from 'react'
import { IoIosClose } from 'react-icons/io'
import classNames from 'classnames'

const CustomCreateTag = ({
  tags,
  setTags,
  selectedTags,
  setHasSomethingTyped,
  ...props
}) => {
  const addTags = (event) => {
    event.preventDefault()
    if (
      event.key === 'Enter' &&
      event.target.value !== '' &&
      event.target.value.trim() !== ''
    ) {
      setTags([
        ...tags,
        event.target.value.charAt(0).toUpperCase() +
          event.target.value.slice(1),
      ])
      // selectedTags([...tags, event.target.value]);
      event.target.value = ''
      setHasSomethingTyped('')
    }
  }
  const removeTags = (index) => {
    setTags([...tags.filter((tag) => tags.indexOf(tag) !== index)])
  }

  return (
    <main className="w-full max-w-[700px]">
      <div className={classNames('flex flex-col', tags.length > 0 && 'gap-3')}>
        <ul className="flex gap-2 flex-wrap">
          {tags.map((tag, index) => (
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
          {tags.length < 10 && (
            <input
              {...props}
              type="text"
              onKeyUp={(event) => {
                addTags(event)
              }}
              maxLength="15"
              placeholder="Type word and hit Enter ↵ to add"
              className="placeholder:text-[10px] ms:text-[10px] sm:text-base md:text-base lg:text-base
            placeholder:ms:text-[10px] placeholder:sm:text-base placeholder:md:text-base placeholder:lg:text-xs lg:max-w-[200px] p-2 lg:py-1.5 border-[1px] rounded-md bg-[#EDF2F7] border-solid border-[#aab2b8] text-[16px] focus:outline-none focus:border-[1px] focus:border-solid focus:border-[#544BB9] focus:rounded-md w-full max-w-[170px] sm:max-w-[260px] disabled:cursor-not-allowed "
            />
          )}
        </div>
      </div>
    </main>
  )
}

export default CustomCreateTag
