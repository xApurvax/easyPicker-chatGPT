import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'
import ApiMiddleware from '../../utils/ApiMiddleware'
import { GiTwoCoins } from 'react-icons/gi'
import coins from '../../sound/coins.mp3'
import Cookies from 'js-cookie'

const initialState = {
  isLoading: false,
  isRegenerate: false,
  isSaved: false,
  allTitles: [],
  specialTags: [],
  copyAllSpecialTags: null,
  isFindUseSynonyms: false,
  isIncPowerWords: true,
  isMakeQuestion: false,
  goBackToSettings: true,
  hasTitleTag: [],
  message: '',
  saveTitles: '',
  saveTags: '',
  reGenerateData: {
    heading_type: null,
    paragraph: null,
    num_headers: null,
    language: null,
  },
}

export const generateHeadlineFetchAPi = createAsyncThunk(
  'generateHeadlinePage/fetch',
  async (data, { rejectWithValue }) => {
    try {
      const paragraphDetails = await ApiMiddleware.post(
        '/api/generate/title/',
        { ...data }
      )
      return paragraphDetails
    } catch (error) {
      if (error.response.data.message !== 'You dont have any credit points') {
        toast.error(error.response.data.message)
      }
      if (!error.response) {
        throw rejectWithValue(error?.message || 'Something went wrong')
      }
      throw rejectWithValue(error.response.data.message)
    }
  }
)

export const reGenerateHeadlineFetchAPi = createAsyncThunk(
  'regenerateHeadlinePage/fetch',
  async (data, { rejectWithValue }) => {
    try {
      const paragraphDetails = await ApiMiddleware.post(
        '/api/generate/title/',
        { ...data }
      )
      return paragraphDetails
    } catch (error) {
      if (error.response.data.message !== 'You dont have any credit points') {
        toast.error(error.response.data.message)
      }
      if (!error.response) {
        throw rejectWithValue(error?.message || 'Something went wrong')
      }
      throw rejectWithValue(error.response.data.message)
    }
  }
)

export const saveResultsFetchAPi = createAsyncThunk(
  'saveResultsOfGeneratedHeadline/fetch',
  async (data, { rejectWithValue }) => {
    try {
      const paragraphDetails = await ApiMiddleware.post('/api/save/results/', {
        ...data,
      })
      if (paragraphDetails.data.message === 'Added to Bookmarks successfully') {
        toast.success('Added to bookmarks successfully')
      } else {
        toast.success(paragraphDetails.data.message)
      }
      return paragraphDetails
    } catch (error) {
      if (error.response.data.message !== 'You dont have any credit points') {
        toast.error(error.response.data.message)
      }
      if (!error.response) {
        throw rejectWithValue(error?.message || 'Something went wrong')
      }
      throw rejectWithValue(error.response.data.message)
    }
  }
)

const generateHeadlineSlice = createSlice({
  name: 'GenerateHeadline',
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
  },
  extraReducers: {
    [generateHeadlineFetchAPi.pending]: (state, action) => {
      state.isLoading = true
    },
    [generateHeadlineFetchAPi.fulfilled]: (state, action) => {
      state.isLoading = false
      state.goBackToSettings = false
      state.allTitles = action.payload?.data?.result[0]['title']
      state.saveTitles = action.payload?.data?.result[0]['title'].join()
      state.specialTags = action.payload?.data?.result[0]['tags']
        ?.trim()
        ?.split(',')
      state.copyAllSpecialTags = action.payload?.data?.result[0]['tags']
      state.saveTags = action.payload?.data?.result[0]['tags']
      Cookies.set('coins', action.payload?.data?.result[0]['remaining_credit'])
      state.hasTitleTag = action.payload?.data?.result
      if (action.payload?.data?.result.length === 0) {
        toast.error('Something went wrong!')
      }
    },
    [generateHeadlineFetchAPi.rejected]: (state, action) => {
      if (action.payload === 'You dont have any credit points') {
        state.message = action.payload
        toast(action?.payload, {
          icon: (
            <GiTwoCoins color="#FFD700" size={35} className="animate-pulse" />
          ),
        })
        const audio = new Audio(coins)
        audio.play()
      }
      state.isLoading = false
    },
    [reGenerateHeadlineFetchAPi.pending]: (state, action) => {
      state.isRegenerate = true
    },
    [reGenerateHeadlineFetchAPi.fulfilled]: (state, action) => {
      state.isRegenerate = false
      state.goBackToSettings = false
      state.allTitles = action.payload?.data?.result[0]['title']
      state.specialTags = action.payload?.data?.result[0]['tags']?.split(',')
      state.saveTitles = action.payload?.data?.result[0]['title'].join()
      state.copyAllSpecialTags = action.payload?.data?.result[0]['tags']
      state.saveTags = action.payload?.data?.result[0]['tags']
      Cookies.set('coins', action.payload?.data?.result[0]['remaining_credit'])
      state.hasTitleTag = action.payload?.data?.result
      if (action.payload?.data?.result.length === 0)
        toast.error('Something went wrong!')
    },
    [reGenerateHeadlineFetchAPi.rejected]: (state, action) => {
      state.isRegenerate = false
      if (action.payload === 'You dont have any credit points') {
        state.message = action.payload
        toast(action?.payload, {
          icon: (
            <GiTwoCoins color="#FFD700" size={35} className="animate-pulse" />
          ),
        })
        const audio = new Audio(coins)
        audio.play()
      }
    },
    [saveResultsFetchAPi.pending]: (state, action) => {
      state.isSaved = true
    },
    [saveResultsFetchAPi.fulfilled]: (state, action) => {
      state.isSaved = false
      // if(action?.payload?.data?.status_code === 200) {
      state.goBackToSettings = false
      state.allTitles = action.payload?.data?.result[0]['title']
      state.saveTitles = action.payload?.data?.result[0]['title'].join()
      state.specialTags = action.payload?.data?.result[0]['tags']?.split(',')
      state.copyAllSpecialTags = action.payload?.data?.result[0]['tags']
      state.saveTags = action.payload?.data?.result[0]['tags']
      Cookies.set('coins', action.payload?.data?.result[0]['remaining_credit'])
      state.hasTitleTag = action.payload?.data?.result
      toast.success(action?.payload?.data?.message)
      if (action.payload?.data?.result.length === 0) {
        toast.error('Something went wrong!')
      }
      // }
    },
    [saveResultsFetchAPi.rejected]: (state, action) => {
      state.isSaved = false
      if (action.payload === 'You dont have any credit points') {
        state.message = action.payload
        toast(action?.payload, {
          icon: (
            <GiTwoCoins color="#FFD700" size={35} className="animate-pulse" />
          ),
        })
        const audio = new Audio(coins)
        audio.play()
      } else {
        toast.error(action?.payload)
      }
    },
  },
})

export const {
  setIsFindUseSynonyms,
  setIsIncPowerWords,
  setIsMakeQuestion,
  setGoBackToHeadlineSettings,
  setReGenerateData,
  setHasTitleTag,
} = generateHeadlineSlice.actions
export default generateHeadlineSlice.reducer
