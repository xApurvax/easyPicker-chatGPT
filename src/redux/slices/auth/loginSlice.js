import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiMiddleware from "../../../utils/ApiMiddleware";
import Cookies from "js-cookie";
import toast, { Toaster } from 'react-hot-toast';

const initialState = {
  isSuccess: false,
  allData: {
    token: {
        access: Cookies.get('access_token'),
        refresh: Cookies.get('refresh_token'),
    },
  },
  
};

export const loginFetchAPi = createAsyncThunk(
  'login/fetch',
  async (data) => {
    try {
      const loginCredentials = await ApiMiddleware.post(
        '/auth/login/',
        {...data}
      );
      toast.success(loginCredentials.data.message)
      return loginCredentials;
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message)
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
        // setIsFindUseSynonyms: (state, action) => {
        //   state.isFindUseSynonyms = action.payload;
        // },
        // setIsIncPowerWords: (state, action) => {
        //   state.isIncPowerWords = action.payload;
        // },
        // setIsMakeQuestion: (state, action) => {
        //   state.isMakeQuestion = action.payload;
        // },
        // setGoBackToHeadlineSettings: (state, action) => {
        //   state.goBackToSettings = action.payload;
        // },
  },
  extraReducers: {
    [loginFetchAPi.pending]: (state, action) => {
      state.isSuccess = true;
    },
    [loginFetchAPi.fulfilled]: (state, action) => {
      state.isSuccess = false;
      state.allData = action.payload?.data?.result[0];
      Cookies.set("access_token", action.payload?.data?.result[0]?.token?.access);
      Cookies.set("refresh_token", action.payload?.data?.result[0]?.token?.refresh);
    },
    [loginFetchAPi.rejected]: (state, action) => {
      state.isSuccess = false;
    },
  },
});

// export const {  } = generateHeadlineSlice.actions;
export default loginSlice.reducer;