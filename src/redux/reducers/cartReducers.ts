import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./apiReducers";

//Type of singleCart
type ProductCart = {
    product: Product,
    quantity: number
}

// Type of IntialCart
export type CartState = {
    cart: ProductCart[],
    totalPrice: number,
    totalProduct: number
}

//Initial Cart State
const initialState: CartState = {
    cart: [],
    totalPrice: 0,
    totalProduct: 0
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            let isPresent = false;
            state.cart.find((el) => {
                
                if(el.product.id === action.payload.product.id){
                    el.quantity += action.payload.quantity;
                    state.totalProduct += action.payload.quantity;
                    state.totalPrice += el.product.price;
                    isPresent = true;
                }
            })

            if(!isPresent){
                state.cart.push({product: action.payload.product, quantity: action.payload.quantity})
                state.totalProduct += action.payload.quantity;
                state.totalPrice += action.payload.product.price * action.payload.quantity;
            }
        },
        cleanCart: (state) => {
            state.cart = [];
            state.totalPrice = 0;
            state.totalProduct = 0;
        },
        deleteToCart: (state, action) => {
            const cart = state.cart.filter(el => {
                return el.product.id !== action.payload.product.id
            })
            state.totalPrice -= action.payload.product.price * action.payload.quantity;
            state.totalProduct -= action.payload.quantity;
            state.cart = cart;
        }
    }
})

//Export Action for Dispatch
export const {addToCart, cleanCart, deleteToCart} = cartSlice.actions


const { reducer } = cartSlice;
export default reducer;