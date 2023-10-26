import { configureStore } from "@reduxjs/toolkit";
import AddToCart from "../../features/AddToCart/AddToCart";
import ChangeCart from "../../features/ChangeCart/ChangeCart";
const rootReducer = {
  increase: AddToCart,
  reducers: ChangeCart,
};
export const store = configureStore({
  reducer: rootReducer,
});
export default store;
