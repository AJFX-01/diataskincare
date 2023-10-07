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

const filterSlice = createSlice({
    name : "filter",
    initialState,
    reducers : {
        FILTER_BY_SEARCH: (state, action: { payload: { products: Product[]; search: string}} ) => {
            const { products, search } = action.payload;
            
            const tempProducts = products.filter(
                (product) => 
                    product.name.toLowerCase().includes(search.toLowerCase()) || 
                    product.category.toLowerCase().includes(search.toLowerCase())
            );
            state.filteredProducts = tempProducts;
        },
        SORT_PRODUCTS: (state, action: { payload: { products: Product[]; sort: string }}) => {
            const { products, sort } = action.payload;

            let tempProducts: Product[] = [];

            switch (sort) {
                case "latest":
                    tempProducts = products;
                    break;
                case "lowest-price":
                    tempProducts = products.slice().sort((a, b) => a.price - b.price);
                    break;
                case "highest_price":
                    tempProducts = products.slice().sort((a, b) => b.price - a.price);
                    break;
                case "a-z":
                    tempProducts = products.slice().sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case "z-a":
                    tempProducts = products.slice().sort((a, b) => b.name.localeCompare(a.name));
                    break;
                case "In - Stock":
                    tempProducts = products.filter((product) => product.Availiability === "In-stock");
                    break;
                case "Out of Stock":
                    tempProducts = products.filter((product) => product.Availiability === "Out of stock");
                default:
                    tempProducts = products;
                    break;
            }
        }
    }
})
