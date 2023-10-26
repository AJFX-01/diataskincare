import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import styles from "./checkoutForm.module.scss";
import Card from "../card/Card";
import CheckoutSummary from "../checkoutSummary/CheckoutSummary";
import spinnerImg from "../../assets/spinner.jpg";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { selectEmail, selectUserID } from "../../redux/slice/authSlice";
import {
  CLEAR_CART,
  selectCartItems,
  selectCartTotalAmounts,
} from "../../redux/slice/cartSlice";
import { selectShippingAddress } from "../../redux/slice/checkoutSlice";
import { useNavigate } from "react-router-dom";
import { database } from "../../firebase/firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";


const CheckoutForm : React.FC = () => {

    const [message, setMessage] = useState<string  | null>(null);
    const [isLoading,setIsLoading ] = useState<boolean>(false);
    const stripe = useStripe();
    const elements = useElements();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userID = useSelector(selectUserID);
    const userEmail = useSelector(selectEmail);
    const cartItems = useSelector(selectCartItems);
    const cartTotalAmount = useSelector(selectCartTotalAmounts);
    const shippingAddress = useSelector(selectShippingAddress);

    return()

}

export default CheckoutForm;