import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  setGenerateHeadlineEffect,
  setSaveResult,
  setReGenerate,
} from '../../redux/slices/buttonEffectSlice'
import { ThreeDots } from 'react-loader-spinner'
import CustomCreateTag from '../main/CustomCreateTag'
import { FaBookmark } from 'react-icons/fa'
import toast from 'react-hot-toast'
import { FaRegCopy } from 'react-icons/fa'
import { BsCheck2 } from 'react-icons/bs'
import { GiTwoCoins } from 'react-icons/gi'
import { AiOutlinePlus } from 'react-icons/ai'
import {
  generateHeadlineFetchAPi,
  reGenerateHeadlineFetchAPi,
  saveResultsFetchAPi,
  setReGenerateData,
} from '../../redux/slices/generateHeadlineSlice'
import logo from '../../assets/recycle.svg'
import fillOutLeft from '../../assets/fillout-left.png'
import Cookies from 'js-cookie'
import { setShowBuyPointsModal } from '../../redux/slices/pointsSlice'
import demo1 from '../../assets/Demo1-tagline-generator.png'
import classNames from 'classnames'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Nullable } from '../../utils/types/types'
import { AppDispatch, RootState } from '../../redux/store/store'
import { useLocation } from 'react-router-dom'

const Tool = ({ homepageTrial = false }) => {
  const dispatch = useDispatch<AppDispatch>()
  const [count, setCount] = useState(3)
  const [hasArticle, setHasArticle] = useState('')
  const [hasSomethingTyped, setHasSomethingTyped] = useState('')
  const [latestCopied, setLatestCopied] = useState<{
    copiedId: Nullable<number>
  }>({
    copiedId: null,
  })
  const [tag, setTag] = useState<string[]>([])
  const [availableCoins, setAvailableCoins] = useState()
  const location = useLocation();

  const {
    generateHeadlineEffect,
    isLoading,
    saveResult,
    reGenerate,
    allTitles,
    specialTags,
    hasTitleTag,
    copyAllSpecialTags,
    reGenerateData,
    isRegenerate,
    saveTags,
    saveTitles,
  } = useSelector((state: RootState) => ({
    generateHeadlineEffect: state.ButtonEffectSlice.generateHeadlineEffect,
    saveResult: state.ButtonEffectSlice.saveResult,
    reGenerate: state.ButtonEffectSlice.reGenerate,
    isLoading: state.GenerateHeadlineSlice.isLoading,
    isRegenerate: state.GenerateHeadlineSlice.isRegenerate,
    allTitles: state.GenerateHeadlineSlice.allTitles,
    specialTags: state.GenerateHeadlineSlice.specialTags,
    hasTitleTag: state.GenerateHeadlineSlice.hasTitleTag,
    saveTags: state.GenerateHeadlineSlice.saveTags,
    saveTitles: state.GenerateHeadlineSlice.saveTitles,
    reGenerateData: state.GenerateHeadlineSlice.reGenerateData,
    copyAllSpecialTags: state.GenerateHeadlineSlice.copyAllSpecialTags,
  }))
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [counter, setCounter] = useState([
    // { countValue: 1, id: 1 },
    { countValue: 3, id: 1 },
    { countValue: 5, id: 2 },
    { countValue: 7, id: 3 },
    { countValue: 10, id: 4 },
  ])

  const [counterSelected, setCounterSelected] = useState({
    selected: false,
    id: 0,
  })
  const [copyAllId, setCopyAllId] = useState<{ id: Nullable<number> }>({
    id: specialTags?.length + allTitles?.length + 1,
  });
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setHasArticle(e.target.value)

  const hasTypedSomething = (e: React.ChangeEvent<HTMLInputElement>) =>
    setHasSomethingTyped(e.target.value)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(
      generateHeadlineFetchAPi({
        heading_type: tag.join(','),
        paragraph: hasArticle,
        num_headers: count,
        language: 'english',
      })
    )
    dispatch(
      setReGenerateData({
        heading_type: tag.join(','),
        paragraph: hasArticle,
        num_headers: count,
        language: 'english',
      })
    )
  }

  const handleSaveResults = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(
      saveResultsFetchAPi({
        heading_type: tag.join(','),
        paragraph: hasArticle,
        num_headers: count,
        language: 'english',
        tag: saveTags,
        title: saveTitles,
      })
    )
  }

  useEffect(() => {
    allTitles?.length > 0 &&
      specialTags?.length > 0 &&
      setCopyAllId({ id: allTitles?.length + specialTags?.length + 1 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setAvailableCoins(Cookies.get('coins'))
  }, [availableCoins])

  useEffect(() => {
    document.title = 'Title Generator'
  }, [])

  return (
    <HelmetProvider>
      <Helmet>
        <title>AI Title Generator | Infynno</title>
        <meta
          name="description"
          content="Powerful Title Ideas to Elevate Your Blog and Captivate Your Readers 💡📝✨ - Get Inspired with Eye-Catching Article and Blog Post Title Ideas! 💡✍️ - Captivating Titles for Your Next Blog Post or Article 💻🔥"
        />
        <meta
          name="keywords"
          content="Generate Titles, Blogs, Posts ,Articles, AI, chatGPT"
        />
        <meta name="image" content={demo1} />
      </Helmet>
      <div
        className={classNames(
          'flex flex-col w-full justify-center items-center',
          homepageTrial && 'mt-5'
        )}
      >
        {location.pathname !== "/" &&
        <div className="flex justify-end gap-1 md:hidden w-full">
          <div
            className={classNames(
              'bg-primary flex justify-end items-end',
              homepageTrial && 'bg-secondaryYellow'
            )}
          >
            <div className="flex gap-2 ms:gap-2 sm:gap-3 md:gap-4 bg-white rounded-t-xl px-5 py-1 justify-end items-center">
              <GiTwoCoins
                color="#FFD700"
                // size={35}
                className={classNames(
                  availableCoins &&
                    'origin-center hover:rotate-12 text-[16px] ms:text-[16px] sm:text-[24px] md:text-[28px] lg:text-4xl cursor-pointer'
                )}
              />
              <button
                onClick={() => dispatch(setShowBuyPointsModal(true))}
                className="flex items-center justify-center"
              >
                <p
                  id="coins-text"
                  className="font-semibold text-xs ms:text-xs sm:text-base md:text-xl lg:text-2xl text-primary"
                >
                  {!availableCoins ? 0 : availableCoins}
                </p>
                <AiOutlinePlus
                  color="#000"
                  className="text-[16px] ms:text-[16px] sm:text-[20px] md:text-[20px] lg:text-2xl cursor-pointer"
                />
              </button>
            </div>
          </div>
        </div>}
        <div className="flex flex-col lg:flex-row p-4 ms:p-4 sm:p-6 md:p-8 lg:p-5 gap-8 md:rounded-xl lg:rounded-xl bg-white w-full ms:flex-col lg:max-w-[95%] mb-6">
          <div className="flex flex-col gap-3 w-full">
            <div className="flex flex-col">
              <div className="">
                <p className="font-bold text-base ms:text-base sm:text-lg md:text-xl lg:text-[12px] text-[#4A5568]">
                  Get Unique and Catchy Title Ideas by Entering Your Article
                  Text!" 💥📝💡
                </p>
                <div className="w-full">
                  <textarea
                    className="resize-none ms:resize-y p-3 my-2 lg:my-1 bg-[#EDF2F7] border-[1px] rounded-md border-solid border-[#aab2b8] text-xs ms:text-xs sm:text-base md:text-lg lg:text-xs min-h-[180px] w-full focus:outline-none focus:border-[1px] focus:border-solid focus:border-primary focus:rounded-md scrollbar-thumb-transparent scrollbar-track-transparent group-hover:scrollbar-thumb-[#c3c3c3] group-hover:scrollbar-track-[#ededed] scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-opacity-0.3 disabled:cursor-not-allowed "
                    rows={10}
                    cols={75}
                    disabled={isLoading}
                    id="paragraph"
                    name="paragraph"
                    value={hasArticle}
                    placeholder="Type in or copy and paste your text/article"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
              <div className="mt-2">
                <p className="font-bold text-base ms:text-base sm:text-lg md:text-xl lg:text-[12px] text-[#4A5568]">
                  Keywords to Include in Title
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
                <p className="font-bold text-base ms:text-base sm:text-lg md:text-xl lg:text-[12px] text-[#4A5568]">
                  No of Titles
                </p>
                {/* <div className="flex lg:flex-row justify-between items-center ms:items-start ms:gap-5 sm:flex-col"> */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between sm:items-center ms:flex-col ms:items-start">
                  <div className="flex gap-2 my-2 ">
                    {counter &&
                      counter.map((data, id) => (
                        <div key={id}>
                          <button
                            disabled={isLoading}
                            onClick={(e) => {
                              e.preventDefault()
                              setCount(data.countValue)
                              setCounterSelected({ selected: true, id: id })
                            }}
                            className={classNames(
                              'flex items-center justify-center w-7 h-7 ms:w-7 sm:w-8 md:w-10 lg:w-8 ms:h-7 sm:h-8 md:h-10 lg:h-8 rounded-md ms:rounded-sm md:rounded lg:rounded-md cursor-pointer disabled:cursor-not-allowed',
                              counterSelected.id === id &&
                                data.countValue === count
                                ? 'bg-primary text-white font-bold'
                                : 'bg-[#EDF2F7] text-[#000000]'
                            )}
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
                        hasArticle.trim() === '' ||
                        count === 0 ||
                        hasSomethingTyped.trim().length > 0 ||
                        isLoading
                      }
                      className={classNames(
                        'flex items-center justify-center px-2 py-2 ms:px-2 sm:px-3 md:px-4 lg:px-5 ms:py-2 sm:py-1.5 md:py-2 lg:py-2 rounded-md bg-primary text-[#E3E3E3] hover:text-white font-medium text-base ms:text-base sm:text-lg md:text-xl lg:text-base disabled:bg-primary disabled:opacity-[0.7] disabled:cursor-not-allowed whitespace-nowrap',
                        isLoading
                          ? 'disabled:px-20 ms:disabled:px-[55px] sm:disabled:px-[70px] md:disabled:px-20 lg:disabled:px-20'
                          : 'disabled:px-5 ms:disabled:px-2 sm:disabled:px-3 md:disabled:px-4 md:disabled:py-2 lg:disabled:px-6 lg:disabled:py-2',
                        generateHeadlineEffect && 'animate-wiggle'
                      )}
                      onClick={(e) => {
                        dispatch(setGenerateHeadlineEffect(true))
                        handleSubmit(e)
                      }}
                      onAnimationEnd={() =>
                        dispatch(setGenerateHeadlineEffect(false))
                      }
                    >
                      {!isLoading ? (
                        'Generate Titles'
                      ) : (
                        <ThreeDots
                          height="25"
                          width="25"
                          radius="9"
                          color="#fafafa"
                          ariaLabel="three-dots-loading"
                          wrapperStyle={{}}
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
            {(allTitles?.length > 0 || specialTags?.length > 0) &&
            hasTitleTag?.length > 0 ? (
              <div className="flex flex-col gap-5 w-full">
                {allTitles?.length > 0 &&
                  allTitles.filter(
                    (data: string) => data.trim().length > 0 && data !== '.'
                  ).length > 0 && (
                    <div className="flex flex-col gap-1 w-full group">
                      <p className="font-bold text-lg ms:text-base sm:text-lg md:text-xl lg:text-base text-[#4A5568]">
                        {allTitles?.length > 0 &&
                          allTitles.filter(
                            (data: string) =>
                              data.trim().length > 0 && data !== '.'
                          ).length}{' '}
                        {allTitles?.length === 1 ? 'Title' : 'Titles'} Generated
                      </p>
                      {allTitles?.length > 0 && (
                        <div className="max-h-[200px] scrollbar-thumb-[#c3c3c3] scrollbar-track-[#ededed] scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-opacity-0.3">
                          <div className="flex flex-col gap-2">
                            {allTitles &&
                              allTitles
                                .filter(
                                  (data: string) => data.trim().length > 0
                                )
                                .map((title: string, id: number) => (
                                  <div
                                    key={id}
                                    className="flex gap-5 w-full items-start justify-between border-[1px] border-solid border-[#EDF2F7] rounded-md p-2"
                                  >
                                    <p className="font-medium text-base ms:text-xs sm:text-sm md:text-base lg:text-sm text-[#4A5568]">
                                      {title.replace(
                                        new RegExp('\\d', 'gi'),
                                        ''
                                      )}
                                    </p>
                                    <button
                                      onClick={(e) => {
                                        navigator.clipboard.writeText(
                                          title.replace(
                                            new RegExp('\\d', 'gi'),
                                            ''
                                          )
                                        )
                                        setLatestCopied({ copiedId: id })
                                        setCopyAllId({
                                          id:
                                            allTitles.length +
                                            specialTags.length +
                                            1,
                                        })
                                        setTimeout(function () {
                                          setLatestCopied({ copiedId: null })
                                        }, 2000)
                                        toast.success('Title Copied!')
                                      }}
                                      type="button"
                                    >
                                      {latestCopied.copiedId === id ? (
                                        <p className="flex gap-1 items-center px-2 py-2 ms:px-1 sm:px-1 md:px-1 lg:px-1 ms:py-1 sm:py-1 md:py-1 lg:py-1 bg-primary rounded-md text-[14px] leading-[14px] ms:text-xs sm:text-sm md:text-base lg:text-sm text-white">
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
                {specialTags?.length > 0 &&
                  specialTags.filter(
                    (data: string) =>
                      data.trim().length > 0 &&
                      data !== '.' &&
                      !/\s/g.test(data)
                  ).length > 0 && (
                    <div className="flex flex-col gap-1 w-full">
                      <div className="flex items-center gap-3">
                        <p className="font-bold text-lg ms:text-base sm:text-lg md:text-xl lg:text-base text-[#4A5568]">
                          Keywords
                        </p>
                        {specialTags?.length > 1 && (
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(copyAllSpecialTags)
                              setLatestCopied({
                                copiedId:
                                  specialTags.length + allTitles.length + 1,
                              })
                              setTimeout(function () {
                                setLatestCopied({ copiedId: null })
                                setCopyAllId({ id: null })
                              }, 2000)
                              toast.success('All Tags Copied!')
                            }}
                            type="button"
                            className={classNames(
                              'px-2 py-1.5 ms:px-1.5 sm:px-1.5 md:px-1.5 lg:px-1.5 ms:py-1 sm:py-1 md:py-1 lg:py-1 rounded-md text-base ms:text-xs sm:text-sm md:text-base lg:text-sm',
                              latestCopied.copiedId === copyAllId.id
                                ? 'bg-violet-500 text-white'
                                : 'bg-[#EDF2F7] text-[#4A5568]'
                            )}
                          >
                            Copy All
                          </button>
                        )}
                      </div>
                      <div className="py-1">
                        <div className="flex gap-2 flex-wrap">
                          {specialTags?.length > 0 &&
                            specialTags
                              .filter(
                                (data: string) =>
                                  data.trim().length > 0 && data !== '.'
                              )
                              .map((tag: string, id: number) => (
                                <div key={id}>
                                  <button
                                    onClick={(e) => {
                                      navigator.clipboard.writeText(tag.trim())
                                      setLatestCopied({
                                        copiedId: id + allTitles.length,
                                      })
                                      setCopyAllId({
                                        id:
                                          allTitles.length +
                                          specialTags.length +
                                          1,
                                      })
                                      setTimeout(function () {
                                        setLatestCopied({ copiedId: null })
                                      }, 2000)
                                      toast.success('Tag Copied!')
                                    }}
                                    type="button"
                                    className={classNames(
                                      'px-3 py-2 ms:px-2 sm:px-2 md:px-3 lg:px-2 ms:py-1 sm:py-1 md:py-2 lg:py-1 border-[1px] border-solid border-[#EDF2F7] rounded-md text-base ms:text-xs sm:text-sm md:text-base lg:text-base text-[#4A5568]',
                                      latestCopied.copiedId ===
                                        id + allTitles.length
                                        ? 'bg-primary font-medium text-white'
                                        : 'bg-[#EDF2F7]'
                                    )}
                                  >
                                    {tag.trim()}
                                  </button>
                                </div>
                              ))}
                        </div>
                      </div>
                    </div>
                  )}
                <div className="flex py-3 gap-4 w-full">
                  <div>
                    <button
                      type="button"
                      className={classNames(
                        'flex items-center gap-2 px-4 py-2 ms:px-2 sm:px-2 md:px-4 lg:px-4 ms:py-1 sm:py-1 md:py-2 lg:py-2 rounded-md bg-primary text-[#E3E3E3] hover:text-white font-medium text-lg ms:text-xs sm:text-sm md:text-base lg:text-sm disabled:bg-[#2D3748] disabled:cursor-not-allowed whitespace-nowrap',
                        saveResult && 'animate-wiggle'
                      )}
                      onClick={(e) => {
                        dispatch(setSaveResult(true))
                        handleSaveResults(e)
                      }}
                      onAnimationEnd={() => {
                        dispatch(setSaveResult(false))
                      }}
                    >
                      <FaBookmark /> Add Bookmark
                    </button>
                  </div>
                  <div>
                    <button
                      type="button"
                      disabled={isRegenerate}
                      className={classNames(
                        'flex gap-2 px-4 py-2 ms:px-2 sm:px-2 md:px-4 lg:px-4 ms:py-1 sm:py-1 md:py-2 lg:py-[7px] rounded-md border-[1px] border-solid border-primary text-primary hover:text-primary font-medium text-lg disabled:cursor-not-allowed',
                        reGenerate && 'animate-wiggle'
                      )}
                      onClick={(e) => {
                        dispatch(setReGenerate(true))
                        dispatch(reGenerateHeadlineFetchAPi(reGenerateData))
                        // setLatestCopied({copiedId: null})
                        // setCopyAllId({
                        //   id: 0,
                        // })
                      }}
                      onAnimationEnd={() => {
                        dispatch(setReGenerate(false))
                      }}
                    >
                      {isRegenerate ? (
                        <div className="flex items-center gap-2 ms:text-xs sm:text-sm md:text-base lg:text-sm ">
                          <img
                            src={logo}
                            alt="regenerating"
                            className="w-6 ms:w-3 sm:w-3 md:w-6 lg:w-5 animate-spin"
                          />
                          Regenerating
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 ms:text-xs sm:text-sm md:text-base lg:text-sm ">
                          <img
                            src={logo}
                            alt="regenerate"
                            className="w-6 ms:w-3 sm:w-3 md:w-6 lg:w-5"
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
                  <div className="h-full w-full rounded-md select-none">
                    <img
                      src={fillOutLeft}
                      alt="generated data blur"
                      className="h-auto w-full"
                    />
                  </div>
                  <div className="absolute flex justify-center items-center h-full w-full pb-[20%]">
                    <p className="font-semibold text-base text-[#4A5568] whitespace-nowrap">
                      Fill out the left form to generate titles.
                    </p>
                  </div>
                </div>
                <p className="font-bold text-xs text-[#4A5568] ms:text-xs sm:text-base md:text-lg lg:text-lg sm:flex lg:hidden">
                  Fill out the above form to generate titles.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </HelmetProvider>
  )
}

export default Tool
