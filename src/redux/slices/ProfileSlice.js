import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import ApiMiddleware from "../../utils/ApiMiddleware";

import Cookies from "js-cookie";

const initialState = {
  isLoading: false,
  isUpdating: false,
  message: "",
  profileDetails: [],
};

export const profileDetailsFetchAPI = createAsyncThunk(
  "profileDetailsFetch/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiMiddleware.get(`/api/auth/profile/`);
      return response;
    } catch (error) {
      if (error.response.data.message !== "You dont have any credit points") {
        toast.error(error.response.data.message);
      }
      if (!error.response) {
        throw rejectWithValue(error?.message || "Something went wrong");
      }
      throw rejectWithValue(error.response.data.message);
    }
  }
);

export const profileDetailsUpdateFetchAPI = createAsyncThunk(
  "profileDetailsUpdateFetch/fetch",
  async (data, { rejectWithValue }) => {
    try {
      const response = await ApiMiddleware.put(`/api/auth/register/`, data);
      return response;
    } catch (error) {
      if (error.response.data.message !== "You dont have any credit points") {
        toast.error(error.response.data.message);
      }
      if (!error.response) {
        throw rejectWithValue(error?.message || "Something went wrong");
      }
      throw rejectWithValue(error.response.data.message);
    }
  }
);

const ProfileSlice = createSlice({
  name: "profileDetailsSlice",
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
    // setReGenerateData: (state, action) => {
    //   state.reGenerateData = action.payload;
    // },
  },
  extraReducers: {
    [profileDetailsFetchAPI.pending]: (state, action) => {
      state.isLoading = true;
    },
    [profileDetailsFetchAPI.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.profileDetails = action?.payload?.data?.result[0]?.user[0];
      Cookies.set(
        "userDetails",
        JSON.stringify(action?.payload?.data?.result[0]?.user[0])
      );
    },
    [profileDetailsFetchAPI.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [profileDetailsUpdateFetchAPI.pending]: (state, action) => {
      state.isUpdating = true;
    },
    [profileDetailsUpdateFetchAPI.fulfilled]: (state, action) => {
      state.isUpdating = false;
      toast.success(action.payload?.data?.message);
      state.profileDetails = action.payload?.data?.result[0]?.profile;
    },
    [profileDetailsUpdateFetchAPI.rejected]: (state, action) => {
      state.isUpdating = false;
    },
  },
});

// export const { setIsFindUseSynonyms,setIsIncPowerWords,setIsMakeQuestion,setGoBackToHeadlineSettings,setReGenerateData } = ProfileSlice.actions;
export default ProfileSlice.reducer;
