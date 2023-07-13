import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DataState {
  templatesData: any[];
}

const initialState: DataState = {
  templatesData: [],
};

const dataSlice = createSlice({
  name: "templatesData",
  initialState,
  reducers: {
    templatesData: (state, action: PayloadAction<any>) => {
      state.templatesData = action.payload;
    },
  },
});

export const { templatesData } = dataSlice.actions;
export default dataSlice.reducer;
