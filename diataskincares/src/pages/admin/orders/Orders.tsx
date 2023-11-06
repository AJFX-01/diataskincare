import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../../component/loader/loader";
import useFetchCollection from "../../../hooks/useFetchCollection";
import {
  selectOrderHistory,
  STORE_ORDERS,
} from "../../../redux/slice/orderSlice";
import styles from "./orders.module.scss";


