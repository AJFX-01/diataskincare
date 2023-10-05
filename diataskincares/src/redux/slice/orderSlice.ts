import { createSlice } from "@reduxjs/toolkit";

interface Order {
    orderAmount : number;
};
interface OrderState {
    orderHistory : Order[];
    addressHistory : any[];
    totalOrderAmount : number | null;
    successURL : string;
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
            const totalAmount = subTotalArray.reduce((curr, init) => curr + init, 0);
            state.totalOrderAmount = totalAmount;
        },
        STORE_ADDRESS: (state, action : { payload : { addressHistory : any[] }}) => ({
            ...state,
            addressHistory : action.payload.addressHistory,
        }),
        SAVE_SUCCESS_URL: (state, action : { payload : { successURL : string}}) => ({
            ...state,
            successURL : action.payload.successURL
        }),
    }
})

