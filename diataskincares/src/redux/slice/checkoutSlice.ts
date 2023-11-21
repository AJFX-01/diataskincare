import { createSlice } from "@reduxjs/toolkit";


export interface ShippingAddress {
    name: string,
    line1 : string,
    line2 : string, 
    city : string,
    state : string,
    postal_code : number,
    country : string,
    phone : string
}
export interface CheckoutState {
    shippingAddress : ShippingAddress;
};

export const initialState : CheckoutState = {
    shippingAddress : {
    name: "",
    line1 : "",
    line2 : "", 
    city : "",
    state : "",
    postal_code : 0,
    country : "",
    phone : ""
    }
};

const CheckoutSlice = createSlice({
    name : "checkout",
    initialState,
    reducers : {
        SAVE_SHIPPING_ADDRESSS: (state, action : {payload : { shippingAddress : ShippingAddress }}) => ({
            ...state,
            shippingAddress : action.payload.shippingAddress,
        }),
    }
})

export const { SAVE_SHIPPING_ADDRESSS } = CheckoutSlice.actions;

export const selectShippingAddress = (state : { checkout : CheckoutState }) => state.checkout.shippingAddress;

export default CheckoutSlice.reducer;