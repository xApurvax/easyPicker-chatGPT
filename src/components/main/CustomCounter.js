import React, { useEffect, useRef, useState } from "react";
import { BiPlus, BiMinus } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { setDecrement, setIncrement } from "../../redux/slices/counterSlice";

const CustomCounter = () => {
  const [count, setCount] = useState(3);
  //   const dispatch = useDispatch();
  //   const { count } = useSelector((state) => ({
  //     count: state.counterSlice.count,
  //   }));

  const changeTimer = useRef(null);
  function timeoutClearUp() {
    // if (count <= 0 || count>=30) {
    clearInterval(changeTimer.current);
    //   changeTimer.current = null;
    // }
  }

  function increment() {
    // if(count<= 30){
    changeTimer.current = setInterval(() => {
      //   dispatch(setIncrement(1));
      if (count >= 30) return clearInterval(changeTimer.current);
      setCount((prev) => prev + 1);
    }, 100);
    // }
  }

  function decrement() {
    // if(count<= 30){
    changeTimer.current = setInterval(() => {
      if (count <= 3) return clearInterval(changeTimer.current);
      setCount((prev) => prev - 1);
      //   dispatch(setDecrement(1));
    }, 100);
    // }
  }

  useEffect(() => {
    if (count <= 3 || count >= 30) clearInterval(changeTimer.current);
  }, [count]);

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
              e.preventDefault();
              //   dispatch(setIncrement(1));
              setCount((prev) => prev + 1);
            }}
            onMouseLeave={timeoutClearUp}
            onMouseUp={timeoutClearUp}
            onMouseDown={increment}
            disabled={count >= 30}
          >
            <BiPlus />
          </button>
          <button
            className="text-[#252728] disabled:text-[#aab2b8]"
            onClick={(e) => {
              e.preventDefault();
              //   dispatch(setDecrement(1));
              setCount((prev) => prev - 1);
            }}
            onMouseLeave={timeoutClearUp}
            onMouseUp={timeoutClearUp}
            onMouseDown={decrement}
            disabled={count <= 3}
          >
            <BiMinus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomCounter;
