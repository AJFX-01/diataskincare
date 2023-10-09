import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import Item from "../../component/product/productItem/item";

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
    cartItems:initialCartItems ? JSON.parse(initialCartItems) : [],
    savedItems: initialSavedItems ? JSON.parse(initialSavedItems) : [],
    cartTotalQuantity: 0,
    cartTotalAmounts: 0,
    previousURL: "",
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        ADD_TO_CART: ( state, action : { payload : Product}) => {
            const productIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.id);

                if (productIndex >= 0 ) {
                   state.cartItems[productIndex].cartQuantity += 1; 
                } else {
                    let tempProduct: CartItem = { ...action.payload, cartQuantity: 1 };
                    state.cartItems.push(tempProduct);
                }
                localStorage.setItem("cartItem", JSON.stringify(state.cartItems));

        }, 
        DECREASE_CART: ( state, action : { payload : Product}) => {
            const productIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
            if (state.cartItems[productIndex].cartQuantity > 1) {
                state.cartItems[productIndex].cartQuantity -= 1;
            } else if (state.cartItems[productIndex].cartQuantity === 1) {
                const newCartItem = state.cartItems.filter((item) => item.id !== action.payload.id );
         
                state.cartItems = newCartItem;
                toast.info(`${action.payload.name} removed from your cart`,
                {
                    position: "top-left",
                    pauseOnFocusLoss: false,
                });
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        SET_CART: (state, action : {payload })
    }

})