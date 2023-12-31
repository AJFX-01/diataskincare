import { configureStore, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import productReducer from "./slice/productSlice";
import filterReducer from "./slice/filterSlice";
import checkoutReducer from "./slice/checkoutSlice";
import orderReducer from "./slice/orderSlice";
import cartReducer from "./slice/cartSlice";


const rootReducer = combineReducers({
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
    filter: filterReducer,
    checkout: checkoutReducer,
    orders: orderReducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: false,
    }),
});


export default store;






