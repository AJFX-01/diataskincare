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

