import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./reducers/cartReducers";
import { CartState } from "./reducers/cartReducers";

import apiReducer  from "./reducers/apiReducers";
import { ProductState } from "./reducers/apiReducers";

export type RootState = {
  products: ProductState,
  cart: CartState
}

export const store = configureStore({
  reducer: {
    products: apiReducer,
    cart: cartReducer
  },
});