import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'
import ApiMiddleware from '../../utils/ApiMiddleware'
import { GiTwoCoins } from 'react-icons/gi'
import coins from '../../sound/coins.mp3'
import Cookies from 'js-cookie'
import {
  BOOKMARK_ADDED_SUCCESSFULLY,
  LIMIT_EXCEEDS_MESSAGE,
  NO_CREDIT_POINTS_MESSAGE,
  SOMETHING_WENT_WRONG,
} from '../../utils/constant'
import {
  GenerateHeadingPayload,
  SaveResultPayload,
} from '../../utils/types/types'
import React from 'react'

type StateType = {
  isLoading: boolean
  isRegenerate: boolean
  isSaved: boolean
  allTitles: string[]
  specialTags: string[]
  copyAllSpecialTags: string
  isFindUseSynonyms: boolean
  isIncPowerWords: boolean
  isMakeQuestion: boolean
  goBackToSettings: boolean
  hasTitleTag: string[]
  tag: string[]
  hasArticle: string
  hasSomethingTyped: string
  message: string
  saveTitles: string
  saveTags: string
  reGenerateData: {
    heading_type: string | null
    paragraph: string | null
    num_headers: number | null
    language: string | null
  }
  limitExceeds: boolean
}

const initialState: StateType = {
  isLoading: false,
  isRegenerate: false,
  isSaved: false,
  allTitles: [],
  specialTags: [],
  copyAllSpecialTags: '',
  isFindUseSynonyms: false,
  isIncPowerWords: true,
  isMakeQuestion: false,
  goBackToSettings: true,
  hasTitleTag: [],
  hasArticle: '',
  hasSomethingTyped: '',
  tag: [],
  message: '',
  saveTitles: '',
  saveTags: '',
  reGenerateData: {
    heading_type: null,
    paragraph: null,
    num_headers: null,
    language: null,
  },
  limitExceeds: false,
}

export const generateHeadlineFetchAPi = createAsyncThunk(
  'generateHeadlinePage/fetch',
  async (data: GenerateHeadingPayload, { rejectWithValue }) => {
    try {
      const paragraphDetails = await ApiMiddleware.post(
        '/api/generate/title/',
        { ...data }
      )
      return paragraphDetails
    } catch (error: any) {
      if (error.response.data.message !== NO_CREDIT_POINTS_MESSAGE) {
        toast.error(error.response.data.message)
      }
      if (!error.response) {
        throw rejectWithValue(error?.message || SOMETHING_WENT_WRONG)
      }
      throw rejectWithValue(error.response.data.message)
    }
  }
)

export const reGenerateHeadlineFetchAPi = createAsyncThunk(
  'regenerateHeadlinePage/fetch',
  async (data: GenerateHeadingPayload, { rejectWithValue }) => {
    try {
      const paragraphDetails = await ApiMiddleware.post(
        '/api/generate/title/',
        { ...data }
      )
      return paragraphDetails
    } catch (error: any) {
      if (error.response.data.message !== NO_CREDIT_POINTS_MESSAGE)
        toast.error(error.response.data.message)

      if (!error.response)
        throw rejectWithValue(error?.message || SOMETHING_WENT_WRONG)

      throw rejectWithValue(error.response.data.message)
    }
  }
)

export const saveResultsFetchAPi = createAsyncThunk(
  'saveResultsOfGeneratedHeadline/fetch',
  async (data: SaveResultPayload, { rejectWithValue }) => {
    try {
      const paragraphDetails = await ApiMiddleware.post('/api/save/results/', {
        ...data,
      })
      if (paragraphDetails.data.message === BOOKMARK_ADDED_SUCCESSFULLY) {
        toast.success(BOOKMARK_ADDED_SUCCESSFULLY as string)
      } else {
        toast.success(paragraphDetails.data.message)
      }
      return paragraphDetails
    } catch (error: any) {
      if (error.response.data.message !== NO_CREDIT_POINTS_MESSAGE) {
        toast.error(error.response.data.message)
      }
      if (!error.response) {
        throw rejectWithValue(error?.message || SOMETHING_WENT_WRONG)
      }
      throw rejectWithValue(error.response.data.message)
    }
  }
)

const GenerateHeadlineSlice = createSlice({
  name: 'generateHeadline',
  initialState,
  reducers: {
    setIsFindUseSynonyms: (state, action) => {
      state.isFindUseSynonyms = action.payload
    },
    setIsIncPowerWords: (state, action) => {
      state.isIncPowerWords = action.payload
    },
    setIsMakeQuestion: (state, action) => {
      state.isMakeQuestion = action.payload
    },
    setGoBackToHeadlineSettings: (state, action) => {
      state.goBackToSettings = action.payload
    },
    setReGenerateData: (state, action) => {
      state.reGenerateData = action.payload
    },
    setHasTitleTag: (state, action) => {
      state.hasTitleTag = action.payload
    },
    setHasArticle: (state, action) => {
      state.hasArticle = action.payload
    },
    setHasSomethingTyped: (state, action) => {
      state.hasSomethingTyped = action.payload
    },
    setTag: (state, action) => {
      state.tag = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(generateHeadlineFetchAPi.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(
      generateHeadlineFetchAPi.fulfilled,
      (state, { payload }) => {
        state.isLoading = false
        state.goBackToSettings = false
        state.allTitles = payload?.data?.result[0]['title']
        state.saveTitles = payload?.data?.result[0]['title'].join()
        state.specialTags = payload?.data?.result[0]['tags']?.trim()?.split(',')
        state.copyAllSpecialTags = payload?.data?.result[0]['tags']
        state.saveTags = payload?.data?.result[0]['tags']
        Cookies.set('coins', payload?.data?.result[0]['remaining_credit'])
        state.hasTitleTag = payload?.data?.result
        if (payload?.data?.result.length === 0) {
          toast.error('Something went wrong!')
        }
      }
    )
    builder.addCase(generateHeadlineFetchAPi.rejected, (state, { payload }) => {
      if (typeof payload === 'string' && payload === NO_CREDIT_POINTS_MESSAGE) {
        toast(payload, {
          icon: (
            <GiTwoCoins color="#FFD700" size={25} className="animate-pulse" />
          ),
        })
        const audio = new Audio(coins)
        audio.play()
      }
      if (payload === LIMIT_EXCEEDS_MESSAGE) state.limitExceeds = true

      state.isLoading = false
    })
    builder.addCase(reGenerateHeadlineFetchAPi.pending, (state) => {
      state.isRegenerate = true
    })
    builder.addCase(
      reGenerateHeadlineFetchAPi.fulfilled,
      (state, { payload }) => {
        state.isRegenerate = false
        state.goBackToSettings = false
        state.allTitles = payload?.data?.result[0]['title']
        state.specialTags = payload?.data?.result[0]['tags']?.split(',')
        state.saveTitles = payload?.data?.result[0]['title'].join()
        state.copyAllSpecialTags = payload?.data?.result[0]['tags']
        state.saveTags = payload?.data?.result[0]['tags']
        Cookies.set('coins', payload?.data?.result[0]['remaining_credit'])
        state.hasTitleTag = payload?.data?.result
        if (payload?.data?.result.length === 0)
          toast.error('Something went wrong!')
      }
    )
    builder.addCase(
      reGenerateHeadlineFetchAPi.rejected,
      (state, { payload }) => {
        state.isRegenerate = false
        if (
          typeof payload === 'string' &&
          payload === NO_CREDIT_POINTS_MESSAGE
        ) {
          toast(payload, {
            icon: (
              <GiTwoCoins color="#FFD700" size={35} className="animate-pulse" />
            ),
          })
          const audio = new Audio(coins)
          audio.play()
        }
      }
    )
    builder.addCase(saveResultsFetchAPi.pending, (state, action) => {
      state.isSaved = true
    })
    builder.addCase(saveResultsFetchAPi.fulfilled, (state, { payload }) => {
      const { data } = payload || {}
      state.isSaved = false
      state.goBackToSettings = false
      state.allTitles = data?.result[0]['title']
      state.saveTitles = data?.result[0]['title'].join()
      state.specialTags = data?.result[0]['tags']?.split(',')
      state.copyAllSpecialTags = data?.result[0]['tags']
      state.saveTags = data?.result[0]['tags']
      Cookies.set('coins', data?.result[0]['remaining_credit'])
      state.hasTitleTag = data?.result
      toast.success(data?.message)
      if (data?.result.length === 0) {
        toast.error('Something went wrong!')
      }
    })
    builder.addCase(saveResultsFetchAPi.rejected, (state, { payload }) => {
      state.isSaved = false
      if (typeof payload === 'string' && payload === NO_CREDIT_POINTS_MESSAGE) {
        toast(payload, {
          icon: (
            <GiTwoCoins color="#FFD700" size={35} className="animate-pulse" />
          ),
        })
        const audio = new Audio(coins)
        audio.play()
      } else toast.error(payload as string)
    })
  },
})

export const {
  setIsFindUseSynonyms,
  setIsIncPowerWords,
  setIsMakeQuestion,
  setGoBackToHeadlineSettings,
  setReGenerateData,
  setHasTitleTag,
  setHasArticle,
  setHasSomethingTyped,
  setTag,
} = GenerateHeadlineSlice.actions
export default GenerateHeadlineSlice.reducer
