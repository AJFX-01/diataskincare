import { createSlice } from "@reduxjs/toolkit";

interface Order {
    orderAmount : number;
    orderStatus: string;
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


export const { STORE_ORDERS, CALCULATE_TOTAL_ORDER_AMOUNTS, STORE_ADDRESS, SAVE_SUCCESS_URL } = orderSlice.actions;
export const selectOrderHistory = (state : { orders: OrderState}) => state.orders.orderHistory;
export const selectAddress = (state : { orderes : OrderState }) => state.orderes.addressHistory;
export const selectTotal = (state : { orders : OrderState }) => state.orders.totalOrderAmount;
export const selectSucessUrl = (state : { orders : OrderState }) => state.orders.successURL;
export const selectDelievery = (state : { orders : OrderState }) => state.orders.deliveryFee;

export default orderSlice.reducer;

