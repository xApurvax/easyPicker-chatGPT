import React from 'react'
import { BiPlus, BiMinus } from 'react-icons/bi'
import { useSelector, useDispatch } from 'react-redux'
import { setDecrement, setIncrement } from '../../redux/slices/counterSlice'

const CustomCounter = () => {
  // const [count,setCount] = useState(0)
  const dispatch = useDispatch()
  const { count } = useSelector((state) => ({
    count: state.counterSlice.count,
  }))
  return (
    <div>
      <div className="flex items-center justify-center h-9 w-12 border-[1px] rounded-md border-solid border-[#f8f8f8]">
        <p className="font-[600] text-[16px] leading-[24px] text-[#252728] w-5">
          {count}
        </p>
        <div className="flex flex-col border-l-[1px] border-solid border-[#f8f8f8]">
          <button
            className="border-b-[1px] border-solid border-[#f8f8f8] text-[#252728] disabled:text-[#aab2b8]"
            onClick={(e) => {
              e.preventDefault()
              dispatch(setIncrement(1))
            }}
            disabled={count === 30}
          >
            <BiPlus />
          </button>
          <button
            className="text-[#252728] disabled:text-[#aab2b8]"
            onClick={(e) => {
              e.preventDefault()
              dispatch(setDecrement(1))
            }}
            disabled={count === 1}
          >
            <BiMinus />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CustomCounter
