import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiMiddleware from "../../../utils/ApiMiddleware";
import Cookies from "js-cookie";
import toast, { Toaster } from 'react-hot-toast';

const initialState = {
  isRegisterLoading: false,
  allData: {
    token: {
        access: Cookies.get('access_token'),
        refresh: Cookies.get('refresh_token'),
    },}
  }

export const registerFetchAPi = createAsyncThunk(
  'register/fetch',
  async (data) => {
    try {
      const registerUser = await ApiMiddleware.post(
        '/auth/register/',
        {...data}
      );
      // toast.success(registerUser.data.message)
      return registerUser;
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message)
      
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
  },
  extraReducers: {
    [registerFetchAPi.pending]: (state, action) => {
      state.isRegisterLoading = true;
    },
    [registerFetchAPi.fulfilled]: (state, {payload}) => {
      state.isRegisterLoading = false;
      state.message = payload;
      if(payload?.data?.status_code === 200) {
        toast.success(payload?.data?.message)
      }else{
        // console.log(payload)
        // toast.error(payload?.data?.message)
      }
      state.allData = payload?.data?.result[0];
      Cookies.set("access_token", payload?.data?.result[0]?.token?.access);
      Cookies.set("refresh_token", payload?.data?.result[0]?.token?.refresh);
    },
    [registerFetchAPi.rejected]: (state, {payload}) => {
      state.isRegisterLoading = false;
      // console.log(payload)
      // toast.error(payload?.data?.message)
    },
  },
});

// export const {  } = generateHeadlineSlice.actions;
export default registerSlice.reducer;