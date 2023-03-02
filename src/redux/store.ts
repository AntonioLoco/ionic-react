import { configureStore } from "@reduxjs/toolkit";

//Cart Reducer
import cartReducer from "./reducers/cartReducers";
import { CartState } from "./reducers/cartReducers";

//Product Reducer
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