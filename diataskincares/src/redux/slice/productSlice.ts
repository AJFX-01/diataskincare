import { createSlice } from '@reduxjs/toolkit';


export type Product = {
    id: string;
    name: string;
    price: string;
    description : string;
    imageUrl: string;
    brand: string;
    Avaliability : string;
    category: string;
    count: string;
};

type ProductState = {
    type: "product";
    products: Product[];
    minPrice: number;  
    maxPrice: number; 
};

const initialState : ProductState ={
    type: "product",
    products: [],
    minPrice: 1,
    maxPrice: 100000000000000,
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers : {
        STORE_PRODUCTS: ( state, action: { payload: { products : Product[] }}) => ({
            ...state,
            products : action.payload.products,
        }),
        GET_PRICE_RANGE: (state, action : {payload :{ products : Product[]} }) => {
           if (action.payload.products.length === 0) return state;
           
           const priceArray: number[] = [];
           action.payload.products.forEach((product) => {
            priceArray.push(parseInt(product.price));
           });
           const max = Math.max(...priceArray);
           const min = Math.min(...priceArray);

           return {...state, maxPrice : max, minPrice : min}
        },
    },
});

export const { STORE_PRODUCTS, GET_PRICE_RANGE } = productSlice.actions;
export const selectProducts = (state : {product : ProductState}) => state.product.products;
export const selectMinPrice = (state : {product : ProductState }) => state.product.minPrice;
export const selectMaxPrice = (state : { product : ProductState }) => state.product.maxPrice;
export default productSlice.reducer;