import { AnyAction, createSlice, ThunkAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
//Link Api Products
const PRODUCTS_URL = 'https://fakestoreapi.com/products';

//Type of product 
export type Product = {
    id: number;
    title: string;
    price: number;
    category: string,
    description: string,
    image: string,
    rating: {
        rate: number,
        count: number
    }
}

//Type of initial State Products
export type ProductState = {
    loading: boolean,
    error: {
        status: boolean,
        message: string
    },
    products: Product[]
}

//Initial State
const initialState: ProductState = {
    loading: true,
    error: {
        status: false,
        message: ""
    },
    products: []
}

export const apiReducers = createSlice({
    name: "products",
    initialState,
    reducers: {
        startLoading: (state) => {
        state.loading = true;
        state.products = [];
        },
        stopLoading: (state) => {
        state.loading = false;
        },
        saveData: (state, action) => {
        state.products = action.payload;
        },
        catchError: (state, action) => {
        state.error.status = true;
        state.error.message = action.payload;
        state.products = [];
        },
        cleanError: (state) => {
        state.error.status = false;
        state.error.message = "";
        },
    }
})

//Get Actions
const { startLoading, stopLoading, saveData, catchError, cleanError } = apiReducers.actions;

//Funzione che ci restituisce una funzione asincrona per prendere tutti i prodotti
//Tipi della funzione: 
// Promise<void> -> ritorno della funzione asincrona, che sarà void
//RootState -> Type of Store
//uknown -> tipo di input della funzione
//AnyAction -> Azione che viene inviata al dispatcher di redux
export const getAllProducts = ():ThunkAction<Promise<void>,RootState,unknown,AnyAction>  => async (dispatch) => {
    dispatch(startLoading());
    dispatch(cleanError());
    try {
        const response = await axios.get(PRODUCTS_URL);
        dispatch(saveData(response.data));
    } catch (error: any) {
        dispatch(catchError(error.errors));
    }
    dispatch(stopLoading());
}

//Export reducer for Store
const { reducer } = apiReducers;
export default reducer;