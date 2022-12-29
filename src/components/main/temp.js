import React from "react";
import { HiClipboardDocument } from "react-icons/hi2";

const Tool = () => {
  return (
    <div>
      <main className="flex justify-center">
        <div className="flex w-full max-w-7xl my-5">
          <div className="w-[50%] px-3 h-[calc(100vh-119px)] flex flex-col gap-3 justify-self-stretch items-stretch">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-[24px]">Article Text</p>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="">
                <p className="font-semibold text-[14px]">
                  Scan for Controversy & Emotion
                </p>
                <p className="text-[12px]">
                  Find controversial & emotional part based on your articale
                  text
                </p>
              </div>
              <div className="flex gap-1 px-2 py-2 bg-[#2e90fa] h-9 rounded-md cursor-pointer shadow-lg">
                <HiClipboardDocument size={18} fill="white" />
                <p className="text-white text-[12px] font-semibold">
                  Scan for Controversy & Emotion
                </p>
              </div>
            </div>
            <div className="flex-grow">
              <label className="font-semibold">
                Put your article text below
              </label>
              <textarea
                className="resize-none h-full w-full p-3"
                placeholder=""
              />
            </div>
          </div>
          <div className="w-[50%] px-3 bg-[#f6f8f9]">
            <div className="m-5 bg-white">p</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Tool;
