import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DataState {
  headerFooter: boolean;
  searchLoading: boolean;
  headerShowing: boolean;
}

const initialState: DataState = {
  headerFooter: false,
  searchLoading: false,
  headerShowing: true,
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
    headerShowing: (state, action: PayloadAction<boolean>) => {
      state.headerShowing = action.payload;
    },
  },
});

export const { headerFooter, searchLoading, headerShowing } = dataSlice.actions;
export default dataSlice.reducer;
