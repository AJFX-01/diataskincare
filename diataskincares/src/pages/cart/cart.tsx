import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  selectCartTotalAmounts,
  selectCartTotalQuantity,
  selectCartItems,
  ADD_TO_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  SAVE_URL,
} from "../../redux/slice/cartSlice";
import { FaTrashAlt } from "react-icons/fa";
import { MdError } from "react-icons/md";
import Card from "../../components/card/Card";
import styles from "./cart.module.scss";
import cartEmpty from "../../assets/cartempty.png";
import Notiflix from "notiflix";
import { selectIsLoggedIn } from "../../redux/slice/authSlice";
import useFetchCollection from "../../hooks/useFetchCollection";


