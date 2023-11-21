import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import checkoutImg from "../../assets/checkout.webp";
import {
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  selectCartItems,
  selectCartTotalAmounts,
  CLEAR_CART,
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
import CheckoutSummary from "../../components/checkoutSummary/CheckoutSummary";
import Card from "../../components/card/Card";
import "./checkoutDetails.module.scss";
import { SAVE_SUCCESS_URL, selectDelieveryFee } from "../../redux/slice/orderSlice";