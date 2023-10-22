import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectUserID } from "../../redux/slice/authSlice";
import Card from "../card/Card";
import styles from "./reviewProducts.module.scss";
import StarsRating from "react-star-rate";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { database } from "../../firebase/firebase";
import { toast } from "react-toastify";
import useFetchDocument from "../../hooks/useFetchDocuments";
import spinnerImg from "../../assets/spinner.jpg";
import { useAuth } from "../../contexts/auth";



interface ReviewConfig {
    userID: string;
    name: string;
    productID: string;
    rate: number;
    review: string;
    reviewDate: string;
    createdAt: Date; 
}

const ReviewProducts: React.FC = () => {
    
}  