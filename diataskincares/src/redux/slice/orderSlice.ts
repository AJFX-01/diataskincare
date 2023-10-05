import { createSlice } from "@reduxjs/toolkit";

interface Order {
    orderAmount : number;
};
interface OrderState {
    orderHistory : [];
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

