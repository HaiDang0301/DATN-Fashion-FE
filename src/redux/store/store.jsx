import { configureStore } from "@reduxjs/toolkit";
import AddToCart from "../../features/AddToCart/AddToCart";
const rootReducer = {
  increase: AddToCart,
};
export const store = configureStore({
  reducer: rootReducer,
});
export default store;
