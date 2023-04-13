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
import {
  generateHeadlineFetchAPi,
  reGenerateHeadlineFetchAPi,
  setReGenerateData,
} from '../../redux/slices/generateHeadlineSlice'
import logo from '../../assets/recycle.svg'
import { GiTwoCoins } from 'react-icons/gi'
import Cookies from 'js-cookie'
import RouteMiddleWare from '../../utils/RouteMiddleWare'
import { Nullable } from '../../utils/types/types'
import { AppDispatch, RootState } from '../../redux/store/store'

const Tool = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [count, setCount] = useState(0)
  const [hasArticle, setHasArticle] = useState('')
  const [hasSomethingTyped, setHasSomethingTyped] = useState('')
  const [latestCopied, setLatestCopied] = useState<{
    copiedId: Nullable<number>
  }>({
    copiedId: null,
  })
  const [tag, setTag] = useState<string[]>([])
  const [availableCoins, setAvailableCoins] = useState()
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
  } = useSelector((state: RootState) => ({
    generateHeadlineEffect: state.ButtonEffectSlice.generateHeadlineEffect,
    saveResult: state.ButtonEffectSlice.saveResult,
    reGenerate: state.ButtonEffectSlice.reGenerate,
    isLoading: state.GenerateHeadlineSlice.isLoading,
    isRegenerate: state.GenerateHeadlineSlice.isRegenerate,
    allTitles: state.GenerateHeadlineSlice.allTitles,
    specialTags: state.GenerateHeadlineSlice.specialTags,
    hasTitleTag: state.GenerateHeadlineSlice.hasTitleTag,
    reGenerateData: state.GenerateHeadlineSlice.reGenerateData,
    copyAllSpecialTags: state.GenerateHeadlineSlice.copyAllSpecialTags,
    token: state.LoginSlice.allData?.token?.access,
    isSuccess: state.LoginSlice.isSuccess,
    coins: state.LoginSlice.coins,
  }))

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [counter, setCounter] = useState([
    { countValue: 1, id: 1 },
    { countValue: 3, id: 2 },
    { countValue: 5, id: 3 },
    { countValue: 7, id: 4 },
    { countValue: 10, id: 5 },
  ])

  const [counterSelected, setCounterSelected] = useState<{
    selected: boolean
    id: Nullable<number>
  }>({
    selected: false,
    id: null,
  })
  const [copyAllId, setCopyAllId] = useState({
    id: specialTags?.length + allTitles?.length + 1,
  })
  // let specialTag = new Set(specialTags)
  useEffect(() => {
    allTitles &&
      specialTags &&
      setCopyAllId({ id: allTitles?.length + specialTags?.length + 1 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [copyAllId, latestCopied])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setHasArticle(e.target.value)

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

  const hasTypedSomething = (e: React.ChangeEvent<HTMLInputElement>) =>
    setHasSomethingTyped(e.target.value)

  useEffect(() => {}, [hasSomethingTyped])

  const coins = Cookies.get('coins')

  useEffect(() => {
    if (Cookies.get('coins')) {
      setAvailableCoins(Cookies.get('coins'))
      const coinsText = document.querySelector('#coins-text')
      coinsText?.classList?.add('animate-ping')
      setTimeout(() => {
        coinsText?.classList?.remove('animate-ping')
      }, 100)
    }
  }, [availableCoins, coins])

  return (
    <RouteMiddleWare>
      <div className="flex flex-col w-full">
        <div className="bg-primary flex justify-end">
          <div className="flex gap-6 bg-white rounded-t-xl px-5 py-1">
            <GiTwoCoins
              color="#FFD700"
              size={35}
              className={`${
                availableCoins && 'origin-center hover:rotate-12 cursor-pointer'
              }`}
            />
            <p
              id="coins-text"
              className={`font-semibold text-2xl text-primary`}
            >
              {availableCoins === 'undefined' ? 0 : availableCoins}
            </p>
          </div>
        </div>
        <div className="flex p-10 gap-8 rounded-b-xl rounded-tl-xl bg-white w-full">
          <div className="flex flex-col gap-3 w-full">
            <div className="flex flex-col">
              <div className="">
                <p className="font-bold text-lg text-[#4A5568]">
                  Add your article text below
                </p>
                <textarea
                  className="resize-none p-3 my-2 bg-[#EDF2F7] border-[1px] rounded-md border-solid border-[#f8f8f8] text-[16px] focus:outline-none focus:border-[1px] focus:border-solid focus:border-[#aab2b8] focus:rounded-md scrollbar-thumb-transparent scrollbar-track-transparent group-hover:scrollbar-thumb-[#c3c3c3] group-hover:scrollbar-track-[#ededed] scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-opacity-0.3 disabled:cursor-not-allowed"
                  rows={10}
                  cols={75}
                  disabled={isLoading}
                  id="paragraph"
                  name="paragraph"
                  // type="text"
                  value={hasArticle}
                  placeholder="Type in or copy and paste your text/article"
                  onChange={handleChange}
                />
              </div>
              <div className="mt-2">
                <p className="font-bold text-lg text-[#4A5568]">
                  Keywords to Include in Headline
                </p>
                <div className="my-2">
                  <CustomCreateTag
                    disabled={isLoading}
                    setHasSomethingTyped={setHasSomethingTyped}
                    onChange={hasTypedSomething}
                    tags={tag}
                    setTags={setTag}
                  />
                </div>
              </div>
              <div className="mt-4">
                <p className="font-bold text-lg text-[#4A5568]">
                  No of Headlines
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 my-2">
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
                            className={`${
                              counterSelected.id === id &&
                              data.countValue === count
                                ? 'bg-primary text-white font-bold'
                                : 'bg-[#EDF2F7] text-[#000000]'
                            } flex items-center justify-center w-11 h-11  rounded-md cursor-pointer disabled:cursor-not-allowed`}
                          >
                            {data.countValue}
                          </button>
                        </div>
                      ))}
                  </div>
                  <div className="w-full flex items-center justify-end">
                    <button
                      type="submit"
                      disabled={
                        hasArticle.trim() === '' ||
                        count === 0 ||
                        hasSomethingTyped.trim().length > 0 ||
                        isLoading
                      }
                      className={`${
                        generateHeadlineEffect && 'animate-wiggle'
                      } flex items-center justify-center px-6 py-3 rounded-md bg-primary text-[#E3E3E3] hover:text-white font-medium text-lg disabled:bg-[#2D3748] disabled:cursor-not-allowed whitespace-nowrap
                    ${isLoading ? 'disabled:px-20' : 'disabled:px-5'}`}
                      onClick={(e) => {
                        dispatch(setGenerateHeadlineEffect(true))
                        handleSubmit(e)
                        // setHasArticle(hasArticle)
                        // setEdit(false)
                      }}
                      onAnimationEnd={() => {
                        dispatch(setGenerateHeadlineEffect(false))
                      }}
                    >
                      {!isLoading ? (
                        'Generate Headlines'
                      ) : (
                        <ThreeDots
                          height="27"
                          width="47"
                          radius="9"
                          color="#fafafa"
                          ariaLabel="three-dots-loading"
                          wrapperStyle={{}}
                          // wrapperClassName=""
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
            {hasTitleTag !== null ? (
              allTitles?.length > 0 ||
              (allTitles !== null && specialTags?.length > 0) ||
              specialTags !== null ? (
                <div className="flex flex-col gap-5 w-full">
                  {allTitles?.length > 0 && (
                    <div className="flex flex-col gap-1 w-full group">
                      <p className="font-bold text-lg text-[#4A5568]">
                        Headlines
                      </p>
                      {allTitles?.length > 0 && (
                        <div className="border-[1px] border-solid border-[#EDF2F7] rounded-md p-2 max-h-[200px] scrollbar-thumb-transparent scrollbar-track-transparent group-hover:scrollbar-thumb-[#c3c3c3] group-hover:scrollbar-track-[#ededed] scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-opacity-0.3">
                          <div className="flex flex-col gap-2">
                            {allTitles &&
                              allTitles.map((title: string, id: number) => (
                                <div
                                  key={id}
                                  className="flex gap-5 items-start justify-between"
                                >
                                  <p className="font-medium text-base text-[#4A5568] max-w-[360px]">
                                    {title}
                                  </p>
                                  <button
                                    onClick={(e) => {
                                      navigator.clipboard.writeText(title)
                                      setLatestCopied({ copiedId: id })
                                      setCopyAllId({
                                        id:
                                          allTitles.length +
                                          specialTags.length +
                                          1,
                                      })
                                      toast.success('Title Copied!')
                                    }}
                                    type="button"
                                  >
                                    {latestCopied.copiedId === id ? (
                                      <p className="flex gap-1 items-center px-2 py-2 bg-primary rounded-md text-[14px] leading-[14px] text-white">
                                        <BsCheck2 />
                                        copied
                                      </p>
                                    ) : (
                                      <p className="flex gap-2 items-center px-3 py-2 bg-[#EDF2F7] rounded-md text-[14px] leading-[14px] text-[#4A5568]">
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
                  {/* {specialTags?.length > 0 || !specialTag.has("") && */}
                  <div className="flex flex-col gap-1 w-full">
                    <div className="flex items-center gap-3">
                      <p className="font-bold text-lg text-[#4A5568]">
                        Keywords
                      </p>
                      {specialTags?.length > 0 && (
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(copyAllSpecialTags)
                            setLatestCopied({
                              copiedId:
                                specialTags.length + allTitles.length + 1,
                            })
                            toast.success('All Tags Copied!')
                          }}
                          type="button"
                          className={`px-2 py-1.5  rounded-md text-base  ${
                            latestCopied.copiedId === copyAllId.id
                              ? 'bg-primary text-white'
                              : 'bg-[#EDF2F7] text-[#4A5568]'
                          }`}
                        >
                          Copy All
                        </button>
                      )}
                    </div>
                    <div className="py-1">
                      <div className="flex gap-2 flex-wrap">
                        {specialTags?.length > 0 &&
                          specialTags.map((tag: string, id: number) => (
                            <div key={id}>
                              <button
                                onClick={(e) => {
                                  navigator.clipboard.writeText(tag.trim())
                                  setLatestCopied({
                                    copiedId: id + allTitles.length,
                                  })
                                  setCopyAllId({
                                    id:
                                      allTitles.length + specialTags.length + 1,
                                  })
                                  toast.success('Tag Copied!')
                                }}
                                type="button"
                                className={`${
                                  latestCopied.copiedId ===
                                  id + allTitles.length
                                    ? 'bg-primary font-medium text-white'
                                    : 'bg-[#EDF2F7]'
                                } px-3 py-2 border-[1px] border-solid border-[#EDF2F7] rounded-md text-base text-[#4A5568]`}
                              >
                                {tag.trim()}
                              </button>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                  {/* } */}
                  <div className="flex py-3 gap-4 w-full">
                    <div>
                      <button
                        type="button"
                        className={`${
                          saveResult && 'animate-wiggle'
                        } flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-[#E3E3E3] hover:text-white font-medium text-lg disabled:bg-[#2D3748] disabled:cursor-not-allowed`}
                        onClick={(e) => {
                          dispatch(setSaveResult(true))
                        }}
                        onAnimationEnd={() => {
                          dispatch(setSaveResult(false))
                        }}
                      >
                        <FaBookmark size={20} /> Save Results
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        disabled={isRegenerate}
                        className={`${
                          reGenerate && 'animate-wiggle'
                        } flex gap-2 px-4 py-2 rounded-md bg-[#2D3748] text-[#E3E3E3] hover:text-white font-medium text-lg disabled:bg-[#2D3748] disabled:cursor-not-allowed`}
                        onClick={(e) => {
                          dispatch(setReGenerate(true))
                          dispatch(reGenerateHeadlineFetchAPi(reGenerateData))
                        }}
                        onAnimationEnd={() => {
                          dispatch(setReGenerate(false))
                        }}
                      >
                        {' '}
                        {isRegenerate ? (
                          <div className="flex items-center gap-2">
                            <img
                              src={logo}
                              alt="regenerating"
                              className="w-6 animate-spin"
                            />
                            Regenerating
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <img
                              src={logo}
                              alt="regenerate"
                              className="w-6 cursor-pointer"
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
                  <p className="font-medium text-base text-[#4A5568]">
                    Something went wrong please generate again
                  </p>
                </div>
              )
            ) : (
              <div className="flex h-full justify-center items-center px-4 w-full">
                <p className="font-medium text-base text-[#4A5568]">
                  Fill out the left form to generate content
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </RouteMiddleWare>
  )
}

export default Tool
