import { createSlice } from "@reduxjs/toolkit";
const AddToCartSlice = createSlice({
  name: "AddToCart",
  initialState: false,
  reducers: {
    increase: (quantity) => {
      return quantity + 1;
    },
    decrease: (quantity) => {
      return quantity - 1;
    },
  },
});
const { actions, reducer } = AddToCartSlice;
export const { increase, decrease } = actions;
export default reducer;
