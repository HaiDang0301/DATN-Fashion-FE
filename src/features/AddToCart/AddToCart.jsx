import { createSlice } from "@reduxjs/toolkit";
const AddToCartSlice = createSlice({
  name: "AddToCart",
  initialState: 0,
  reducers: {
    increase: (quantity) => {
      return quantity + 1;
    },
  },
});
const { actions, reducer } = AddToCartSlice;
export const { increase } = actions;
export default reducer;
