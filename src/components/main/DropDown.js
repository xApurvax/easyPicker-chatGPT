import React, { useState } from 'react'
import { BiChevronDown } from 'react-icons/bi'
import { BsArrowRightShort } from 'react-icons/bs'
import { useSelector, useDispatch } from 'react-redux'
import { setAddToFocusEffect } from '../../redux/slices/buttonEffectSlice'
import classNames from 'classnames'

const DropDown = ({ data, setFocused }) => {
  const [dropDown, setDropDown] = useState(true)
  const dispatch = useDispatch()
  const { addToFocusEffect } = useSelector((state) => ({
    addToFocusEffect: state.buttonEffectSlice.addToFocusEffect,
  }))
  return (
    <div>
      <div className="flex items-center" onClick={() => setDropDown(!dropDown)}>
        <BiChevronDown
          className={classNames(
            'transition-all ease-in-out duration-500',
            dropDown ? 'rotate-rotate-180 fill-[#000000] ' : 'rotate-0'
          )}
          color="#000000"
          size={25}
        />
        1 controversy text found
      </div>
      {dropDown && (
        <div className="bg-[#f7f8f8] p-3 rounded-md my-3">
          <p className="font-normal text-[14px] text-[#252728]">{data}</p>
          <button
            className={classNames(
              'mt-2 flex bg-white rounded-md shadow-sm items-center justify-center text-[12px] px-2 py-1 border-[1px]  border-solid border-[#2e90fa] text-[#2E90FA]',
              addToFocusEffect && 'animate-wiggle'
            )}
            type="button"
            onClick={(e) => {
              dispatch(setAddToFocusEffect(true))
              setFocused(data)
            }}
            onAnimationEnd={() => {
              dispatch(setAddToFocusEffect(false))
            }}
          >
            Add to Headline Focus <BsArrowRightShort size={20} />
          </button>
        </div>
      )}
    </div>
  )
}

export default DropDown
