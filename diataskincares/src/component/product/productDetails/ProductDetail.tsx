import React , { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import StarRatings from "react-star-rating";

import { ImEyePlus } from "react-icons/im";
import { TiCancel } from "react-icons/ti";
import { MdError } from "react-icons/md";
import styles from "./productDetails.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
  REMOVE_FROM_SAVED,
  SAVE_FOR_LATER,
  selectCartItems,
  selectSavedItems,
} from "../../../redux/slice/cartSlice";
// import useFetchDocuments from "../../../hooks/useFetchDocuments";
// import useFetchCollection from "../../../hooks/useFetchCollection";
import Card from "../../card/Card";
import CardSkeleton from "./CardSkeleton";