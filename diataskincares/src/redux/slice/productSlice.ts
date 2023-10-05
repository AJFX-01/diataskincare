import { createSlice } from '@reduxjs/toolkit';

// type Product = {
//     name: string;
//     price: number;
//     description : string;
//     imageUrl: string;
// };

type ProductState = {
    products: []
    minPrice: number | null;
    maxPrice: number | null;
};

const initialState : ProductState ={
    products: [],
    minPrice: null,
    maxPrice: null,
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers : {
        STORE_PRODUCTS: ( state, action: { payload: { products : Product[] }}) => {
            state.products = action.payload.products;
        }.
        GET_PRICE_RANGE: (state, action {payload :{products : Product[]} }) => {
           const priceArray: number[] = [];
           action.payload.products.forEach((product) => {
            priceArray.push(product.price);
           });
           const max = Math.max(...priceArray);
            
        }
    }
})