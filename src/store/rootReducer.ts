import { combineReducers } from "@reduxjs/toolkit";
import productSlice from "../Pages/ProductList/ProductSlice";
const reducer = combineReducers({
  products: productSlice,
  // Add other reducers as needed
});
export type RootState = ReturnType<typeof reducer>;
export default reducer;
