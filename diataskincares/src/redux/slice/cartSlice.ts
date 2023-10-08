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

const initialState: CartState = {
    cartItems:localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    savedItems:localStorage.getItem("savedItems") ? JSON.parse(localStorage.getItem("savedItems")) : [],
    cartTotalQuantity: 0,
    cartTotalAmounts: 0,
    previousURL: "",
}

const cartSlice = createSlice({
    name: "cart",
    
})