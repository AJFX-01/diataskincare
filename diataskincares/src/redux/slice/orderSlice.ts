import { createSlice } from "@reduxjs/toolkit";

interface Order {
    orderAmount : number;
};
interface OrderState {
    orderHistory : Order[];
    addressHistory : any[];
    totalOrderAmount : null;
    successURL : "";
    deliveryFee : 3000
};

const initialState : OrderState = {
    orderHistory : [],
    addressHistory : [],
    totalOrderAmount : null,
    successURL : "",
    deliveryFee : 3000,
};

const orderSlice = createSlice({
    name : "orders",
    initialState,
    reducers: {
        STORE_ORDERS: (state, action : { payload : { orderHistory : Order[]}} ) => ({
            ...state,
            orderHistory : action.payload.orderHistory,
        }),
        CALCULATE_TOTAL_ORDER_AMOUNTS: (state) => {
            const subTotalArray : number[] = state.orderHistory.map((item) => item.orderAmount);
            
        }
    }
})

