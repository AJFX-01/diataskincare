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
    
}