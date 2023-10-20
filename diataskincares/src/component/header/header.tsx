import React, { useEffect, useState } from "react"
import { NavLink, useNavigate,  Link } from "react-router-dom"
import {
    RiMenuAddLine,
    RiShoppingCartLine,
    VscEyeClosed,
  } from "react-icons/all";
import styles from "./header.module.scss";
import { useAuth } from "../../contexts/auth";
import { auth } from "../../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_ACTIVE_USER,
  REMOVE_ACTIVE_USER,
} from "../../redux/slice/authSlice";
import { onAuthStateChanged } from "firebase/auth";
import ShowOnLogin from "../hiddenLinks/HiddenIiNK";
import ShowOnLogout from "../hiddenLinks/ShowOnLogout";
import AdminOnlyLink from "../adminOnlyRoute/AdminOnlyLink";
import {
  CALCULATE_TOTAL_QUANTITY,
  selectCartTotalQuantity,
  selectSavedItems,
} from "../../redux/slice/cartSlice";


  