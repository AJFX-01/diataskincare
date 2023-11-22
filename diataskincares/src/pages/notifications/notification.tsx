import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../component/card/Card";
import Loader from "../../component/loader/loader";
import useFetchCollection from "../../hooks/useFetchCollection";
import { selectUserID } from "../../redux/slice/authSlice";
import { selectOrderHistory, STORE_ORDERS } from "../../redux/slice/orderSlice";
import { RiSearchEyeLine } from "react-icons/ri";
import styles from "./notifications.module.scss";


