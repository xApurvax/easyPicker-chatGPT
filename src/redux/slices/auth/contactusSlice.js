import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiMiddleware from "../../../utils/ApiMiddleware";
import Cookies from "js-cookie";
import toast from 'react-hot-toast';
import { Navigate } from "react-router-dom";

const initialState = {
  isLoading: false,
};

export const ContactUsFetchAPi = createAsyncThunk(
  'contactUs/fetch',
  async (data, {rejectWithValue}) => {
    try {
      const response = await ApiMiddleware.post(
        '/api/contactus/',
        {...data}
      );
      toast.success(response.data.message)
      return response;
    } catch (error) {
      // // console.log(error.response.data.message);
      // toast.error(error.response.data.message)
      if (!error.response) {
        // // console.log(error,"ttttttttttttttttt")
        toast.error(error?.message)
        throw rejectWithValue(error);
      }
      throw rejectWithValue(error.response.data.message);
    }
  }
);

const contactusSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
  },
  extraReducers: {
    [ContactUsFetchAPi.pending]: (state, action) => {
      state.isLoading = true;
    },
    [ContactUsFetchAPi.fulfilled]: (state,{payload}) => {
      state.isLoading = false;
      if(payload?.data?.status_code === 200) {
    //   state.allData = payload?.data?.result[0];
    //   state.coins = payload?.data?.result[0]?.avaliable_credit;
    //   Cookies.set("access_token", payload?.data?.result[0]?.token?.access);
    //   Cookies.set("refresh_token", payload?.data?.result[0]?.token?.refresh);
    //   Cookies.set("coins", payload?.data?.result[0]?.avaliable_credit);
      }
    },
    [ContactUsFetchAPi.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action?.payload);
    },
  },
});

// export const { logOut,setLogOutModal } = contactusSlice.actions;
export default contactusSlice.reducer;