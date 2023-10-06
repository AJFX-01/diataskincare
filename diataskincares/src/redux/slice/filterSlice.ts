import { createSlice } from "@reduxjs/toolkit";

interface Product {
    name : string;
    category : string;
    price: number;
    brand: string;
    Availiability : string;
}

interface FilterState {
    filteredProducts : Product[];
}

const initialState: FilterState = {
    filteredProducts: [],
};
