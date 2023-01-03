import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  allTitles: null,
  specialTags:null,
  isFindUseSynonyms: false,
  isIncPowerWords: true,
  isMakeQuestion: false,
  goBackToSettings: true,
  selectedLanguage: null,
};

export const generateHeadlineFetchAPi = createAsyncThunk(
  "generateHeadlinePage/fetch",
  async (data) => {
    try {
      const paragraphDetails = await axios.post(
        "https://dipika.pythonanywhere.com/",
        data,
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
    setSelectedLanguage: (state, action) => {
      state.selectedLanguage = action.payload;
    },
  },
  extraReducers: {
    [generateHeadlineFetchAPi.pending]: (state, action) => {
      state.isLoading = true;
    },
    [generateHeadlineFetchAPi.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.goBackToSettings = true;
      state.allTitles = action.payload?.data?.titles;
      state.specialTags = action.payload?.data?.words;
    },
    [generateHeadlineFetchAPi.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const {
  setIsFindUseSynonyms,
  setIsIncPowerWords,
  setIsMakeQuestion,
  setGoBackToHeadlineSettings,
  setSelectedLanguage
} = generateHeadlineSlice.actions;
export default generateHeadlineSlice.reducer;
