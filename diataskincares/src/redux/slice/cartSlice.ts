import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

interface Product {
    id: number;
    name: string;
    category: string;
    brand: string;
    Avaliability: string;
};

interface CartItem {
    cartQuantity: number
}

interface SavedItem extends Product {
    savedQuantity: number 
};

interface CartState {
    cartItems: CartItem[];
    savedItems: SavedItem[];
    cartTotalQuantity: number;
    cartTotalAmounts: number;
    previousURL: string;
};
const initialCartItems = localStorage.getItem("cartItems");
const initialSavedItems = localStorage.getItem("savedItems");

const initialState: CartState = {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(initialCartItems) : [],
    savedItems: localStorage.getItem("savedItems") ? JSON.parse(initialSavedItems) : [],
    cartTotalQuantity: 0,
    cartTotalAmounts: 0,
    previousURL: "",
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {

    }

})