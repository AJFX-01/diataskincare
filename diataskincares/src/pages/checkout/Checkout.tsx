import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import checkoutImg from "../../assets/checkout.webp";
import {
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  selectCartItems,
  selectCartTotalAmounts,
  CLEAR_CART,
  CartItem,
} from "../../redux/slice/cartSlice";
import { selectEmail } from "../../redux/slice/authSlice";
import { selectShippingAddress } from "../../redux/slice/checkoutSlice";
import { toast } from "react-toastify";
import { selectUserID, selectUserName } from "../../redux/slice/authSlice";
import PaystackPop from "@paystack/inline-js";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { database } from "../../firebase/firebase";

import styles from "./checkoutDetails.module.scss";
import { useNavigate } from "react-router-dom";
import CheckoutSummary from "../../component/checkoutSummary/CheckoutSummary";
import Card from "../../component/card/Card";
import "./checkoutDetails.module.scss";
import { SAVE_SUCCESS_URL, selectDelieveryFee } from "../../redux/slice/orderSlice";



const Checkout : React.FC = () => {

    const navigate = useNavigate();
    const cartItems : CartItem[] = useSelector(selectCartItems)
    const totalAmount = useSelector(selectCartTotalAmounts);
    const customerEmail = useSelector(selectEmail);
    const cartTotalAmount = useSelector(selectCartTotalAmounts);


    const name = useSelector(selectUserName);
    const userID = useSelector(selectUserID);
    const userEmail = useSelector(selectEmail);

    const shippingAddress = useSelector(selectShippingAddress);
    const delieveryFee = useSelector(selectDelieveryFee);
    const subtotal = totalAmount + delieveryFee;


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(CALCULATE_SUBTOTAL());
        dispatch(CALCULATE_TOTAL_QUANTITY());
    }, [dispatch, cartItems]);

    const saveOrder = () => {
        const today = new Date();
        const date = today.toDateString();
        const time = today.toLocaleDateString();
        const addressConfig = {
            userID,
            userEmail,
            city: shippingAddress.city,
            country: shippingAddress.country,
            line1: shippingAddress.line1,
            line2: shippingAddress.line2,
            name: shippingAddress.name,
            phone: shippingAddress.phone,
            state: shippingAddress.state,
            postal_code: shippingAddress.state,
            date,
            time,
            cartItems,
            createdAt: Timestamp.now().toDate()
        };
    }

    return ()
}

export default Checkout;