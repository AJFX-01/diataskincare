import { useEffect, useState } from "react";
import Card from "../../../component/card/Card";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { database, storage } from "../../../firebase/firebase";
import styles from "./addProduct.module.scss";
import { toast } from "react-toastify";
import { addDoc, 
    collection, 
    doc, 
    setDoc,
    Timestamp
 } from "firebase/firestore";
import Loader from "../../../component/loader/loader";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectProducts } from "../../../redux/slice/productSlice";
import { FcNeutralDecision } from "react-icons/fc";
import { BsIntersect } from "react-icons/bs";


interface Product {
    id: string;
    name: string
}