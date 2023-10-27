import { createSlice } from "@reduxjs/toolkit";
const AddToCartSlice = createSlice({
  name: "AddToCart",
  initialState: false,
  reducers: {
    resetCart: (status) => {
      return !status;
    },
  },
});
const { actions, reducer } = AddToCartSlice;
export const { resetCart } = actions;
export default reducer;
