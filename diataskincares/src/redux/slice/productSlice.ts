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
    
})