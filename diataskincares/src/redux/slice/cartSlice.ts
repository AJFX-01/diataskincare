import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import Item from "../../component/product/productItem/item";

interface Product {
    id: number;
    name: string;
    price: number;
    description : string;
    imageUrl : string;
};

interface CartItem extends Product{
    cartQuantity: number;
    
}

interface SavedItem extends Product {
    savedQuantity: number 
};

interface CartState {
    cartItems: CartItem[];
    savedItems: SavedItem[];
    cartTotalQuantity: number;
    cartTotalAmounts: number;
    cartCount: number;
    previousURL: string;
};
const initialCartItems = localStorage.getItem("cartItems");
const initialSavedItems = localStorage.getItem("savedItems");

const initialState: CartState = {
    cartItems:initialCartItems ? JSON.parse(initialCartItems) : [],
    savedItems: initialSavedItems ? JSON.parse(initialSavedItems) : [],
    cartTotalQuantity: 0,
    cartTotalAmounts: 0,
    cartCount: 0,
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
        SET_CART: (state, action : { payload : { cartCount : number }}) => {
            // const cartIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
            // state.cartCount[cartIndex].cartCount = action.payload;
            let tempProducts = { ...action.payload, cartCount: 1 }; 
            state.cartCount = tempProducts.cartCount;
        },
        REMOVE_FROM_CART: (state, action : { payload : Product }) => {
            const newCartItem = state.cartItems.filter((item) => item.id !== action.payload.id);
            state.cartItems = newCartItem;
            toast.info(`${action.payload.name} removed from your cart`, {
                position: "top-left",
                pauseOnFocusLoss: false,
        });
        localStorage.setItem("cartItem", JSON.stringify(state.cartItems));
       },
       CLEAR_CART: (state) => {
        state.cartItems = [];
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
       },
       CALCULATE_SUBTOTAL: (state) => {
        const subTotalArray: number[] = [];
        state.cartItems.map((item) => {
            const { price, cartQuantity } = item;
            const cartItemAmount = price * cartQuantity;
            return subTotalArray.push(cartItemAmount);
        });
        const totalAmount = subTotalArray.reduce((curr, init) => {
            return curr + init ;
        }, 0);
        state.cartTotalAmounts = totalAmount;             
       },
       CALCULATE_TOTAL_QUANTITY: (state) => {
        const totalQtyArray: number[] = [];
        state.cartItems.map((item) => {
            const { cartQuantity } = item;
            const quantity = cartQuantity;
            return totalQtyArray.push(quantity); 
        });
        const totalQty = totalQtyArray.reduce((curr, init) => {
            return curr + init; 
        }, 0);
        state.cartTotalQuantity = totalQty;
       },
       SAVE_URL: (state, action) => {
        state.previousURL = action.payload;
       },
       SAVE_FOR_LATER:(state, action) => {
        let tempProducts = { ...action.payload, savedQuantity: 1 };
        state.savedItems.push(tempProducts);
        localStorage.setItem("savedItems", JSON.stringify(state.savedItems))
       },
       REMOVE_FROM_SAVED:(state, action) => {
        const newsavedItems = state.savedItems.filter((item) => item.id !== action.payload.id);
        state.savedItems = newsavedItems;
        
        localStorage.setItem("savedItems", JSON.stringify(state.savedItems));
       }     
    },
});

export const {
    ADD_TO_CART,
    DECREASE_CART,
    SET_CART,
    REMOVE_FROM_CART,
    CLEAR_CART,
    CALCULATE_SUBTOTAL,
    CALCULATE_TOTAL_QUANTITY,
    SAVE_URL,
    SAVE_FOR_LATER,
    REMOVE_FROM_SAVED
     
} = cartSlice.actions;

export const selectCartItems = (state : { cart : CartState}) => state.cart.cartItems;
export const selectSavedItems = (state : { cart : CartState} ) => state.cart.savedItems;
export const selectCartCount = (state : { cart : CartState}) => state.cart.cartCount;
export const selectCartTotalQuantity = (state : { cart : CartState }) => state.cart.cartTotalQuantity;
export const selectCartTotalAmounts = (state : { cart : CartState }) => state.cart.cartTotalAmounts;
export const selectPreviousURL = (state : { cart : CartState }) => state.cart.previousURL;

export default cartSlice.reducer;

