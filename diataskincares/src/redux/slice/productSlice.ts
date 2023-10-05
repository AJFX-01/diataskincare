import { createSlice } from '@reduxjs/toolkit';
import { type } from 'os';

type Product = {
    name: string;
    price: number;
    description : string;
    imageUrl: string;
};

type ProductState = {
    type: "product";
    products: Product[];
    minPrice: number | null;
    maxPrice: number | null;
};

const initialState : ProductState ={
    type: "product",
    products: [],
    minPrice: null,
    maxPrice: null,
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers : {
        STORE_PRODUCTS: ( state, action: { payload: { products : Product[] }}) => ({
            ...state,
            products : action.payload.products,
        }),
        GET_PRICE_RANGE: (state, action : {payload :{products : Product[]} }) => {
           if (action.payload.products.length === 0) return state;
           
           const priceArray: number[] = [];
           action.payload.products.forEach((product) => {
            priceArray.push(product.price);
           });
           const max = Math.max(...priceArray);
           const min = Math.min(...priceArray);

           return {...state, maxPrice : max, minPrice : min}
        },
    },
});

export default productSlice;