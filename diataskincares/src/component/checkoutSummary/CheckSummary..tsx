import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  selectCartItems,
  selectCartTotalAmounts,
  selectCartTotalQuantity,
} from "../.././redux/slice/cartSlice";
import { selectDelieveryFee } from "../../redux/slice/orderSlice";
import Card from "../card/Card";
import styles from "./checkoutSummary.module.scss";


const CheckoutSummary: React.FC = () => {

    const cartItems = useSelector(selectCartItems);
    const cartTotalAmount = useSelector(selectCartTotalAmounts);
    const cartTotalQuantity = useSelector(selectCartTotalQuantity);
    const deliveryFee = useSelector(selectDelieveryFee);
    const subtotal = cartTotalAmount + deliveryFee;

    return(
        
    )
}