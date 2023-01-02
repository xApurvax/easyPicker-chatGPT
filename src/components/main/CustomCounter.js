import React, { useEffect, useRef, useState } from "react";
import { BiPlus, BiMinus } from "react-icons/bi";

const CustomCounter = ({count,setCount}) => {


  const changeTimer = useRef(null);
  function timeoutClearUp() {
    clearInterval(changeTimer.current);
  }

  function increment() {
    // if(count<= 30){
    changeTimer.current = setInterval(() => {
      if (count >= 30) return clearInterval(changeTimer.current);
      setCount((prev) => prev + 1);
    }, 100);
  }

  function decrement() {
    changeTimer.current = setInterval(() => {
      if (count <= 3) return clearInterval(changeTimer.current);
      setCount((prev) => prev - 1);
    }, 100);
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
            className="border-b-[1px] border-solid border-[#f8f8f8] text-[#252728] disabled:text-[#aab2b8] disabled:cursor-not-allowed"
            onClick={(e) => {
              e.preventDefault();
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
            className="text-[#252728] disabled:text-[#aab2b8] disabled:cursor-not-allowed"
            onClick={(e) => {
              e.preventDefault();
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
