import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import ApiMiddleware from '../../../utils/ApiMiddleware'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'
import cookies from 'js-cookie'
import { SOMETHING_WENT_WRONG } from '../../../utils/constant'
import { Nullable } from '../../../utils/types/types'

interface AllData {
  token: {
    access: Nullable<string> | undefined
    refresh: Nullable<string> | undefined
  }
}

interface LoginState {
  isSuccess: boolean
  allData: AllData
  coins: number
  logOutModal: boolean
}

interface LoginData {
  [key: string]: string
}

export const loginFetchAPi = createAsyncThunk(
  'login/fetch',
  async (data: LoginData, { rejectWithValue }) => {
    try {
      const loginCredentials = await ApiMiddleware.post('/api/auth/login/', {
        ...data,
      })
      toast.success(loginCredentials.data.message)
      return loginCredentials
    } catch (error: any) {
      if (!error.response) {
        toast.error(error?.message)
        throw rejectWithValue(error?.message || SOMETHING_WENT_WRONG)
      }
      throw rejectWithValue(error.response.data.message)
    }
  }
)

const initialState: LoginState = {
  isSuccess: false,
  allData: {
    token: {
      access: Cookies.get('access_token'),
      refresh: Cookies.get('refresh_token'),
    },
  },
  coins: 0,
  logOutModal: false,
}

const LoginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logOut: (state) => {
      state.allData = {
        token: {
          access: null,
          refresh: null,
        },
      }
      cookies.remove('access_token')
      cookies.remove('refresh_token')
      cookies.remove('coins')
      state.logOutModal = false
    },
    setLogOutModal: (state, action: PayloadAction<boolean>) => {
      state.logOutModal = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginFetchAPi.pending, (state) => {
        state.isSuccess = true
      })
      .addCase(loginFetchAPi.fulfilled, (state, { payload }) => {
        state.isSuccess = false
        if (payload?.data?.status_code === 200) {
          state.allData = payload?.data?.result[0]
          state.coins = payload?.data?.result[0]?.avaliable_credit
          Cookies.set('access_token', payload?.data?.result[0]?.token?.access)
          Cookies.set('refresh_token', payload?.data?.result[0]?.token?.refresh)
          Cookies.set('coins', payload?.data?.result[0]?.avaliable_credit)
        }
      })
      .addCase(loginFetchAPi.rejected, (state, { payload }: any) => {
        state.isSuccess = false
        toast.error(payload)
      })
  },
})

export const { logOut, setLogOutModal } = LoginSlice.actions
export default LoginSlice.reducer
