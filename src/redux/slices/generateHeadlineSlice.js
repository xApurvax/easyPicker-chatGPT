import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiMiddleware from "../../utils/ApiMiddleware";

const initialState = {
  isLoading: false,
  allTitles:null,
  specialTags:null,
  copyAllSpecialTags:null,
  isFindUseSynonyms: false,
  isIncPowerWords: true,
  isMakeQuestion: false,
  goBackToSettings: true,
  hasTitleTag : null
};

export const generateHeadlineFetchAPi = createAsyncThunk(
  'generateHeadlinePage/fetch',
  async (data) => {
    try {
      const paragraphDetails = await ApiMiddleware.post(
        '/',
        {...data}
      );
      return paragraphDetails;
    } catch (error) {
      console.log(error.response.data.message);
    }
  }
);

const generateHeadlineSlice = createSlice({
  name: "GenerateHeadline",
  initialState,
  reducers: {
    setIsFindUseSynonyms: (state, action) => {
      state.isFindUseSynonyms = action.payload;
    },
    setIsIncPowerWords: (state, action) => {
      state.isIncPowerWords = action.payload;
    },
    setIsMakeQuestion: (state, action) => {
      state.isMakeQuestion = action.payload;
    },
    setGoBackToHeadlineSettings: (state, action) => {
      state.goBackToSettings = action.payload;
    },
  },
  extraReducers: {
    [generateHeadlineFetchAPi.pending]: (state, action) => {
      state.isLoading = true;
    },
    [generateHeadlineFetchAPi.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.goBackToSettings = false;
      state.allTitles = action.payload?.data?.result[0]["title"];
      state.specialTags = action.payload?.data?.result[0]["tags"]?.split(",");
      state.copyAllSpecialTags = action.payload?.data?.result[0]["tags"];
      state.hasTitleTag = action.payload?.data?.result;
    },
    [generateHeadlineFetchAPi.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const { setIsFindUseSynonyms,setIsIncPowerWords,setIsMakeQuestion,setGoBackToHeadlineSettings } = generateHeadlineSlice.actions;
export default generateHeadlineSlice.reducer;