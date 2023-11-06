import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUsers, STORE_USERS } from "../../../redux/slice/authSlice";
import useFetchCollection from "../../../hooks/useFetchCollection";
import { doc, deleteDoc } from "firebase/firestore";
import { database } from "../../../firebase/firebase";
import { FaTrashAlt } from "react-icons/fa";
import styles from "./users.module.scss";
import Loader from "../../../component/loader/loader";
import Notiflix from "notiflix";
import { toast } from "react-toastify";


const User: React.FC = () => {


    return ();
} 


export default User;