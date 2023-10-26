import { createSlice } from "@reduxjs/toolkit";
const ChangeCartSlice = createSlice({
  name: "ChangeCart",
  initialState: 999,
  reducers: {
    reducers: (products) => {
      return products - 1;
    },
  },
});
const { actions, reducer } = ChangeCartSlice;
export const { reducers } = actions;
export default reducer;
