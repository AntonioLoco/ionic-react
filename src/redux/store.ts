import { configureStore } from "@reduxjs/toolkit";

//Cart Reducer and Type
import cartReducer from "./reducers/cartReducers";
import { CartState } from "./reducers/cartReducers";

//Product Reducer and Type
import apiReducer  from "./reducers/apiReducers";
import { ProductState } from "./reducers/apiReducers";

//Type of Store
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