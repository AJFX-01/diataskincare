import { createSlice } from "@reduxjs/toolkit";

interface Product {
    name : string;
    id: number;
    category : string;
    price: number;
    brand: string;
    description : string;
    imageUrl : string;
    Avaliability : string;
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
                    tempProducts = products.filter((product) => product.Avaliability === "In-stock");
                    break;
                case "Out of Stock":
                    tempProducts = products.filter((product) => product.Avaliability === "Out of stock");
                    break;
                default:
                    tempProducts = products;
                    break;
            }
            state.filteredProducts = tempProducts;
        },
        FILTER_BY_BRAND: (state, action: { payload: { products : Product[]; brand : string}}) => {
            const { products, brand } = action.payload;

            let tempProducts: Product[] = [];

            if (brand === "All") {
                tempProducts = products;
            } else {
                tempProducts = products.filter((product) => product.brand === brand);
            }

            state.filteredProducts = tempProducts;
        },
        FILTER_BY_CATEGORY: (state, action : { payload: { products : Product[]; category: string}}) => {
            const { products, category } = action.payload;

            let tempProducts: Product[] = [];

            if (category === "All") {
                tempProducts = products;
            } else {
                tempProducts = products.filter((product) => product.category === category);
            }

            state.filteredProducts = tempProducts;
        },

        FILTER_BY_PRICE: (state, action : { payload : { products : Product[]; price : number }}) => {
            const { products, price } = action.payload;

            let tempProducts: Product[] = [];

            tempProducts = products.filter((product) => product.price <= price);

            state.filteredProducts = tempProducts;
        },
    },
});

export const { FILTER_BY_BRAND,
    FILTER_BY_CATEGORY,
    FILTER_BY_PRICE,
    FILTER_BY_SEARCH,
    SORT_PRODUCTS
} = filterSlice.actions;

export const selectFilterdProducts = (state: {filter :FilterState } ) => state.filter.filteredProducts;

export default filterSlice.reducer;
