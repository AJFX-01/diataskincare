import React, { useEffect } from "react";
import InfoBox from "../../../component/infobox/Infobox";
import spinnerImg from "../../../assets/spinner.jpg";
import styles from "./home.module.scss";
import { TbCurrencyNaira } from "react-icons/tb";
import { BsCart4 } from "react-icons/bs";
import { FaCartArrowDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProducts,
  STORE_PRODUCTS,
} from "../../../redux/slice/productSlice";
import {
  CALCULATE_TOTAL_ORDER_AMOUNTS,
  selectOrderHistory,
  selectTotal,
  STORE_ORDERS,
} from "../../../redux/slice/orderSlice";
import useFetchCollection from "../../../hooks/useFetchCollection";
import Chart from "../../../component/chart/chart";

// Icons

const earningIcon = <TbCurrencyNaira size={30} color="#c07d53" />;
const productIcon = <BsCart4 size={30} color="#000" />;
const ordersIcon = <FaCartArrowDown size={30} color="#3c4448"/>;



const Home = () => {
    const product = useSelector(selectProducts);

    const order = useSelector(selectOrderHistory);
    const totalProducts = useSelector(selectTotal);

    // doing this to save the info in redux and fetch it here directy
    
    const dbProducts = useFetchCollection("Products");
    const { data } = useFetchCollection("Orders");

    const dispatch = useDispatch();

}