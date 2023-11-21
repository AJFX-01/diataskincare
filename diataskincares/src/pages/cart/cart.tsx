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
  CartItem
} from "../../redux/slice/cartSlice";
import { FaTrashAlt } from "react-icons/fa";
import { MdError } from "react-icons/md";
import Card from "../../component/card/Card";
import styles from "./cart.module.scss";
import cartEmpty from "../../assets/cartempty.png";
import Notiflix from "notiflix";
import { selectIsLoggedIn } from "../../redux/slice/authSlice";
import useFetchCollection from "../../hooks/useFetchCollection";
import { createRegularExpressionLiteral } from "typescript";


const Cart: React.FC = () => {
    
    const cartItems : CartItem[] = useSelector(selectCartItems);
    const cartTotalAmount = useSelector(selectCartTotalAmounts);
    const cartTotalQuantity = useSelector(selectCartTotalQuantity);
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const navigate = useNavigate();
    const { data } = useFetchCollection("Products");
    const [error, setError] = useState<string | null>(null);


    const increaseCart = (cart : CartItem) => {
        if (cart.cartQuantity >= parseInt(cart.count)) {
           setError (
            `Sorry, this product currently has a total of ${createRegularExpressionLiteral.count} items avaliable`
           );
           window.setTimeout(() => setError(""), 7000);
           return; 
        }

        dispatch(ADD_TO_CART(cart));
    };
    
    const decreaseCart = (cart : CartItem) => {
        dispatch(DECREASE_CART(cart));
    }

    const removeFromCart = (cart : CartItem) => {
        
    }

    return ();
}