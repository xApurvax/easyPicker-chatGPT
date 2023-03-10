import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setGenerateHeadlineEffect,
  setSaveResult,
  setReGenerate,
} from "../../redux/slices/buttonEffectSlice";
import { ThreeDots } from "react-loader-spinner";
import CustomCreateTag from "../main/CustomCreateTag";
import { FaBookmark } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { FaRegCopy } from "react-icons/fa";
import { BsCheck2 } from "react-icons/bs";
import { GiTwoCoins } from "react-icons/gi";
import { AiOutlinePlus } from "react-icons/ai";
import {
  generateHeadlineFetchAPi,
  reGenerateHeadlineFetchAPi,
  saveResultsFetchAPi,
  setHasTitleTag,
  setReGenerateData,
} from "../../redux/slices/generateHeadlineSlice";
import logo from "../../assets/recycle.svg";
import fillOutLeft from "../../assets/fillout-left.png";
import Cookies from "js-cookie";
import { Formik } from "formik";
import InputField from "../form/InputField";
import CustomButton from "../form/CustomButton";
import { LoginValidationSchema } from "../../utils/FormValidations";
import { loginFetchAPi } from "../../redux/slices/auth/loginSlice";
import AuthMiddleware from "../../utils/AuthMiddleware";
import RouteMiddleWare from "../../utils/RouteMiddleWare";
import { Link, useNavigate } from "react-router-dom";
import { setShowBuyPointsModal } from "../../redux/slices/pointsSlice";
import { BuyPointsModal } from "../modal/BuyPointsModal";
import { profileDetailsFetchAPI } from "../../redux/slices/ProfileSlice";
import classNames from "classnames";

const Tool = () => {
  const dispatch = useDispatch();
  const timerRef = useRef(null);
  const [count, setCount] = useState(3);
  const [hasArticle, setHasArticle] = useState("");
  const [hasSomethingTyped, setHasSomethingTyped] = useState("");
  const [latestCopied, setLatestCopied] = useState({
    copiedId: null,
  });
  const [tag, setTag] = useState([]);
  const [availableCoins, setAvailableCoins] = useState();
  const {
    generateHeadlineEffect,
    isLoading,
    saveResult,
    reGenerate,
    allTitles,
    specialTags,
    hasTitleTag,
    copyAllSpecialTags,
    token,
    isSuccess,
    coins,
    reGenerateData,
    isRegenerate,
    message,
    saveTags,
    saveTitles,
  } = useSelector((state) => ({
    generateHeadlineEffect: state.buttonEffectSlice.generateHeadlineEffect,
    saveResult: state.buttonEffectSlice.saveResult,
    reGenerate: state.buttonEffectSlice.reGenerate,
    isLoading: state.generateHeadlineSlice.isLoading,
    isRegenerate: state.generateHeadlineSlice.isRegenerate,
    allTitles: state.generateHeadlineSlice.allTitles,
    specialTags: state.generateHeadlineSlice.specialTags,
    hasTitleTag: state.generateHeadlineSlice.hasTitleTag,
    saveTags: state.generateHeadlineSlice.saveTags,
    saveTitles: state.generateHeadlineSlice.saveTitles,
    reGenerateData: state.generateHeadlineSlice.reGenerateData,
    copyAllSpecialTags: state.generateHeadlineSlice.copyAllSpecialTags,
    message: state.generateHeadlineSlice.message,
    token: state.loginSlice.allData?.token?.access,
    isSuccess: state.loginSlice.isSuccess,
    coins: state.loginSlice.coins,
  }));
  const navigate = useNavigate()
  const [counter, setCounter] = useState([
    // { countValue: 1, id: 1 },
    { countValue: 3, id: 1 },
    { countValue: 5, id: 2 },
    { countValue: 7, id: 3 },
    { countValue: 10, id: 4 },
  ]);

  const [counterSelected, setCounterSelected] = useState({
    selected: false,
    id: 0,
  });
  const [copyAllId, setCopyAllId] = useState({
    id: specialTags?.length + allTitles?.length + 1,
  });
  
  const handleChange = (e) => {
    setHasArticle(e.target.value);
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      generateHeadlineFetchAPi({
        heading_type: tag.join(","),
        paragraph: hasArticle,
        num_headers: count,
        language: "english",
      })
    );
    dispatch(
      setReGenerateData({
        heading_type: tag.join(","),
        paragraph: hasArticle,
        num_headers: count,
        language: "english",
      })
    );
  };

  const handleSaveResults = (e) => {
    e.preventDefault();
    dispatch(
      saveResultsFetchAPi({
        heading_type: tag.join(","),
        paragraph: hasArticle,
        num_headers: count,
        language: "english",
        tag:saveTags,
        title:saveTitles,
      })
    );
  };

  const hasTypedSomething = (e) => {
    setHasSomethingTyped(e.target.value);
  };

  useEffect(() => {
    allTitles?.length > 0 &&
      specialTags?.length > 0  &&
      setCopyAllId({ id: allTitles?.length + specialTags?.length + 1 });
  }, [copyAllId, latestCopied]);

  useEffect(() => {}, [hasSomethingTyped]);

  useEffect(() => {
    setAvailableCoins(Cookies.get("coins"));
  }, [availableCoins])


  useEffect(() => {
    dispatch(profileDetailsFetchAPI())
}, [])

  useEffect(() => {
    document.title = "Tagline Generator"
  }, [])

  return (
    <RouteMiddleWare>
    <div className="flex flex-col w-full justify-center items-center">
      <div className="flex justify-end gap-1 md:hidden w-full">
      <div className="bg-[#544BB9] flex justify-end items-end">
        <div className="flex gap-6 ms:gap-2 sm:gap-3 md:gap-4 bg-white rounded-t-xl px-5 py-1 justify-end items-end">
          <GiTwoCoins
            color="#FFD700"
            // size={35}
            className={classNames(
              availableCoins && "origin-center hover:rotate-12 text-2xl ms:text-[16px] sm:text-[24px] md:text-[28px] lg:text-4xl cursor-pointer")}
          />
          <button onClick={() =>{ dispatch(setShowBuyPointsModal(true))}} className="flex items-center justify-center">
          <AiOutlinePlus color="#000" className="text-2xl ms:text-[16px] sm:text-[20px] md:text-[20px] lg:text-2xl cursor-pointer" />
          <p
            id="coins-text"
            className="font-semibold text-2xl ms:text-xs sm:text-base md:text-xl lg:text-2xl text-[#544BB9]"
          >
            {!availableCoins ? 0 : availableCoins}
          </p>
          </button>
        </div>
      </div>
      </div>
      <div className="flex lg:flex-row p-10 ms:p-4 sm:p-6 md:p-8 lg:p-5 gap-8 md:rounded-xl lg:rounded-xl bg-white w-full ms:flex-col lg:max-w-[95%]">
        <div className="flex flex-col gap-3 w-full">
          <div className="flex flex-col">
            <div className="">
              <p className="font-bold text-lg ms:text-base sm:text-lg md:text-xl lg:text-[12px] text-[#4A5568]">
              Get Unique and Catchy Title Ideas by Entering Your Article Text!" 💥📝💡
              </p>
              <div className="w-full">
              <textarea
                className="resize-none ms:resize-y p-3 my-2 lg:my-1 bg-[#EDF2F7] border-[1px] rounded-md border-solid border-[#aab2b8] text-[16px] ms:text-xs sm:text-base md:text-lg lg:text-xs min-h-[180px] w-full focus:outline-none focus:border-[1px] focus:border-solid focus:border-[#aab2b8] focus:rounded-md scrollbar-thumb-transparent scrollbar-track-transparent group-hover:scrollbar-thumb-[#c3c3c3] group-hover:scrollbar-track-[#ededed] scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-opacity-0.3 disabled:cursor-not-allowed"
                rows={10}
                cols={75}
                disabled={isLoading}
                id="paragraph"
                name="paragraph"
                type="text"
                value={hasArticle}
                placeholder="Type in or copy and paste your text/article"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              </div>
            </div>
            <div className="mt-2">
              <p className="font-bold text-lg ms:text-base sm:text-lg md:text-xl lg:text-[12px] text-[#4A5568]">
                Keywords to Include in Headline
              </p>
              <div className="my-2">
                <CustomCreateTag
                  disabled={isLoading}
                  setHasSomethingTyped={setHasSomethingTyped}
                  onChange={(e) => hasTypedSomething(e)}
                  tags={tag}
                  setTags={setTag}
                />
              </div>
            </div>
            <div className="mt-4">
              <p className="font-bold text-lg ms:text-base sm:text-lg md:text-xl lg:text-[12px] text-[#4A5568]">
                No of Headlines
              </p>
              {/* <div className="flex lg:flex-row justify-between items-center ms:items-start ms:gap-5 sm:flex-col"> */}
              <div className="flex sm:flex-row gap-4 justify-between sm:items-center ms:flex-col ms:items-start">
                <div className="flex gap-2 my-2 ">
                  {counter &&
                    counter.map((data, id) => (
                      <div key={id}>
                        <button
                          disabled={isLoading}
                          onClick={(e) => {
                            e.preventDefault();
                            setCount(data.countValue);
                            setCounterSelected({ selected: true, id: id });
                          }}
                          className={classNames(
                            "flex items-center justify-center w-11 h-11 ms:w-7 sm:w-8 md:w-10 lg:w-8 ms:h-7 sm:h-8 md:h-10 lg:h-8 rounded-md ms:rounded-sm md:rounded lg:rounded-md cursor-pointer disabled:cursor-not-allowed",
                            counterSelected.id == id && data.countValue == count ? "bg-[#544BB9] text-white font-bold" : "bg-[#EDF2F7] text-[#000000]")}
                        >
                          {data.countValue}
                        </button>
                      </div>
                    ))}
                </div>
                <div className="w-full flex items-center justify-end ms:justify-end">
                  <button
                    type="submit"
                    disabled={
                      hasArticle.trim() === "" ||
                      count == 0 ||
                      hasSomethingTyped.trim().length > 0 ||
                      isLoading
                    }
                    className={classNames(
                      "flex items-center justify-center px-6 py-3 ms:px-2 sm:px-3 md:px-4 lg:px-5 ms:py-2 sm:py-1.5 md:py-2 lg:py-2 rounded-md bg-[#544BB9] text-[#E3E3E3] hover:text-white font-medium text-lg ms:text-base sm:text-lg md:text-xl lg:text-base disabled:bg-[#544BB9] disabled:opacity-[0.7] disabled:cursor-not-allowed whitespace-nowrap",
                      isLoading ? "disabled:px-20 ms:disabled:px-[55px] sm:disabled:px-[70px] md:disabled:px-20 lg:disabled:px-20" : "disabled:px-5 ms:disabled:px-2 sm:disabled:px-3 md:disabled:px-4 md:disabled:py-2 lg:disabled:px-5 lg:disabled:py-2",
                      generateHeadlineEffect && "animate-wiggle")}
                      onClick={(e) => {
                        dispatch(setGenerateHeadlineEffect(true));
                        handleSubmit(e);
                        // setHasArticle(hasArticle)
                        // setEdit(false)
                      }}
                      onAnimationEnd={() => {
                        dispatch(setGenerateHeadlineEffect(false));
                      }}
                  >
                    {!isLoading ? (
                      "Generate Headlines"
                    ) : (
                      <ThreeDots
                        height="25"
                        width="25"
                        radius="9"
                        color="#fafafa"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={true}
                      />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          {/* {message === "You dont have any credit points" ?  (
            <div className="flex h-full justify-center items-center px-4 w-full">
              <p className="font-medium text-base text-[#4A5568]">
                {message}
              </p>
            </div>
          )
        :
        (
          (allTitles?.length > 0 || allTitles !== null ) && 
          (specialTags?.length > 0 || specialTags !== null) &&
          (hasTitleTag?.length > 0 || hasTitleTag !== null) */}
          {(allTitles?.length > 0 || specialTags?.length > 0) &&
          (hasTitleTag?.length > 0)
          ? (
            <div className="flex flex-col gap-5 w-full">
              {allTitles?.length > 0 && allTitles.filter((data) => { return data.trim().length > 0 && data !== "."}).length > 0 && (
                <div className="flex flex-col gap-1 w-full group">
                  <p className="font-bold text-lg ms:text-base sm:text-lg md:text-xl lg:text-base text-[#4A5568]">
                    Headlines
                  </p>
                  {allTitles?.length > 0 && (
                    <div className="max-h-[200px] scrollbar-thumb-transparent scrollbar-track-transparent group-hover:scrollbar-thumb-[#c3c3c3] group-hover:scrollbar-track-[#ededed] scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-opacity-0.3">
                      <div className="flex flex-col gap-2">
                        {allTitles &&
                          allTitles.filter((data) => { return data.trim().length > 0}).map((title, id) => (
                            <div
                              key={id}
                              className="flex gap-5 w-full items-start justify-between border-[1px] border-solid border-[#EDF2F7] rounded-md p-2"
                            >
                              <p className="font-medium text-base ms:text-xs sm:text-sm md:text-base lg:text-sm text-[#4A5568]">
                                {title}
                              </p>
                              <button
                                onClick={(e) => {
                                  navigator.clipboard.writeText(title);
                                  setLatestCopied({ copiedId: id });
                                  setCopyAllId({
                                    id:
                                    allTitles.length +
                                    specialTags.length +
                                    1,
                                  });
                                  setTimeout(function(){
                                    setLatestCopied({ copiedId: null });
                                    setCopyAllId({ id: null,});
                                  },2000);
                                  toast.success("Title Copied!");
                                }}
                                type="button"
                              >
                                {latestCopied.copiedId === id ? (
                                  <p className="flex gap-1 items-center px-2 py-2 ms:px-1 sm:px-1 md:px-1 lg:px-1 ms:py-1 sm:py-1 md:py-1 lg:py-1 bg-[#544BB9] rounded-md text-[14px] leading-[14px] ms:text-xs sm:text-sm md:text-base lg:text-sm text-white">
                                    <BsCheck2 />
                                    copied
                                  </p>
                                ) : (
                                  <p className="flex gap-2 items-center px-3 py-2 ms:px-2 sm:px-2 md:px-2 lg:px-2 ms:py-1 sm:py-1 md:py-1 lg:py-1 bg-[#EDF2F7] rounded-md text-[14px] leading-[14px] ms:text-xs sm:text-sm md:text-base lg:text-sm text-[#4A5568]">
                                    <FaRegCopy />
                                    copy
                                  </p>
                                )}
                              </button>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              {specialTags?.length > 0 && specialTags.filter((data) => { return data.trim().length > 0 && data !== "."}).length > 0 &&
              <div className="flex flex-col gap-1 w-full">
                <div className="flex items-center gap-3">
                  <p className="font-bold text-lg ms:text-base sm:text-lg md:text-xl lg:text-base text-[#4A5568]">Keywords</p>
                  {specialTags?.length > 1 && (
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(copyAllSpecialTags);
                        setLatestCopied({
                          copiedId: specialTags.length + allTitles.length + 1,
                        });
                        setTimeout(function(){
                          setLatestCopied({ copiedId: null });
                          setCopyAllId({ id: null,});
                        },2000);
                        toast.success("All Tags Copied!");
                      }}
                      type="button"
                      className={classNames(
                        "px-2 py-1.5 ms:px-1.5 sm:px-1.5 md:px-1.5 lg:px-1.5 ms:py-1 sm:py-1 md:py-1 lg:py-1 rounded-md text-base ms:text-xs sm:text-sm md:text-base lg:text-sm",
                        latestCopied.copiedId === copyAllId.id ?
                        "bg-violet-500 text-white" :
                        "bg-[#EDF2F7] text-[#4A5568]")}
                      >
                      Copy All
                    </button>
                  )}
                </div>
                <div className="py-1">
                  <div className="flex gap-2 flex-wrap">
                    {specialTags?.length > 0 &&
                      specialTags.filter((data) => { return data.trim().length > 0 && data !== "."}).map((tag, id) => (
                        <div key={id}>
                          <button
                            onClick={(e) => {
                              navigator.clipboard.writeText(tag.trim());
                              setLatestCopied({
                                copiedId: id + allTitles.length,
                              });
                              setCopyAllId({
                                id: allTitles.length + specialTags.length + 1,
                              });
                              setTimeout(function(){
                                setLatestCopied({ copiedId: null });
                                setCopyAllId({ id: null,});
                              },2000);
                              toast.success("Tag Copied!");
                            }}
                            type="button"
                            className={classNames(
                              "px-3 py-2 ms:px-2 sm:px-2 md:px-3 lg:px-2 ms:py-1 sm:py-1 md:py-2 lg:py-1 border-[1px] border-solid border-[#EDF2F7] rounded-md text-base ms:text-xs sm:text-sm md:text-base lg:text-base text-[#4A5568]",
                              latestCopied.copiedId === copyAllId.id ?
                              "bg-[#544BB9] font-medium text-white" :
                              "bg-[#EDF2F7]")}
                          >
                            {tag.trim()}
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              }
              <div className="flex py-3 gap-4 w-full">
                <div>
                  <button
                    type="button"
                    className={classNames(
                      "flex items-center gap-2 px-4 py-2 ms:px-2 sm:px-2 md:px-4 lg:px-4 ms:py-1 sm:py-1 md:py-2 lg:py-2 rounded-md bg-[#544BB9] text-[#E3E3E3] hover:text-white font-medium text-lg ms:text-xs sm:text-sm md:text-base lg:text-sm disabled:bg-[#2D3748] disabled:cursor-not-allowed whitespace-nowrap",
                      saveResult && 
                      "animate-wiggle")}
                    onClick={(e) => {
                      dispatch(setSaveResult(true));
                      handleSaveResults(e)
                    }}
                    onAnimationEnd={() => {
                      dispatch(setSaveResult(false));
                    }}
                  >
                    <FaBookmark 
                    // size={20}
                     /> Save Results
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    disabled={isRegenerate}
                    className={classNames(
                      "flex gap-2 px-4 py-2 ms:px-2 sm:px-2 md:px-4 lg:px-4 ms:py-1 sm:py-1 md:py-2 lg:py-[7px] rounded-md border-[1px] border-solid border-[#544BB9] text-[#544BB9] hover:text-[#544BB9] font-medium text-lg disabled:cursor-not-allowed",
                      reGenerate && "animate-wiggle")}
                    onClick={(e) => {
                      dispatch(setReGenerate(true));
                      dispatch(reGenerateHeadlineFetchAPi(reGenerateData));
                      setCounterSelected({
                        selected: false,
                        id: 0,
                      })
                      setLatestCopied({copiedId: null})
                      setCopyAllId({
                        id: null,
                      })
                    }}
                    onAnimationEnd={() => {
                      dispatch(setReGenerate(false));
                    }}
                  >
                    {isRegenerate ? (
                      <div className="flex items-center gap-2 ms:text-xs sm:text-sm md:text-base lg:text-sm">
                        <img
                          src={logo}
                          alt="logo"
                          className="w-6 ms:w-3 sm:w-3 md:w-6 lg:w-5 animate-spin"
                        />
                        Regenerating
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 ms:text-xs sm:text-sm md:text-base lg:text-sm">
                        <img
                          src={logo}
                          alt="logo"
                          className="w-6 ms:w-3 sm:w-3 md:w-6 lg:w-5 cursor-pointer"
                        />
                        Regenerate
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-full justify-center items-center px-4 w-full">
              <div className="hidden lg:flex relative">
                <img src={fillOutLeft} alt="generated data blur" className="h-full w-full rounded-md" />
                <div className="absolute flex justify-center items-center h-full w-full pb-[20%]">
                <p className="font-semibold text-base text-[#4A5568] whitespace-nowrap">Fill out the left form to generate titles.</p>
                </div>
              </div>
              <p className="font-bold text-base text-[#4A5568] ms:text-xs sm:text-base md:text-lg lg:text-lg sm:flex lg:hidden">
                Fill out the above form to generate titles.
              </p>
            </div>
          )
        }
        </div>
      </div>
    </div>
    {/* // <BuyPointsModal /> */}
    </RouteMiddleWare>
  );
};

export default Tool;
