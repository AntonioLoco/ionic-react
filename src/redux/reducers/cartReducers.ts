import { createSlice } from "@reduxjs/toolkit";
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

            //Find The Product
            state.cart.find((el) => {
                
                //If Product is alredy present
                if(el.product.id === action.payload.product.id){
                    //Increment quantity
                    el.quantity += action.payload.quantity;
                    //Increment total Product
                    state.totalProduct += action.payload.quantity;
                    //Increment total Price
                    state.totalPrice += el.product.price * action.payload.quantity;
                    isPresent = true;
                }
            })

            //If Product is not present
            if(!isPresent){
                //Add Product to array of products
                state.cart.push({product: action.payload.product, quantity: action.payload.quantity})
                //Increment total Product
                state.totalProduct += action.payload.quantity;
                //Increment total Price
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
            //Decrement total Price
            state.totalPrice -= action.payload.product.price * action.payload.quantity;
            //Decrement total Product
            state.totalProduct -= action.payload.quantity;
            //Set new cart without the product
            state.cart = cart;
        }
    }
})

//Export Action for Dispatch
export const {addToCart, cleanCart, deleteToCart} = cartSlice.actions

//Export reducer for Store
const { reducer } = cartSlice;
export default reducer;