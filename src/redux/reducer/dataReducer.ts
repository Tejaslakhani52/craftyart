import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DataState {
  headerFooter: boolean;
  searchLoading: boolean;
}

const initialState: DataState = {
  headerFooter: false,
  searchLoading: false,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    headerFooter: (state, action: PayloadAction<boolean>) => {
      state.headerFooter = action.payload;
    },
    searchLoading: (state, action: PayloadAction<boolean>) => {
      state.searchLoading = action.payload;
    },
  },
});

export const { headerFooter, searchLoading } = dataSlice.actions;
export default dataSlice.reducer;
