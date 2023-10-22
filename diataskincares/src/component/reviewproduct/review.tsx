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
    const [rate, setRate] = useState<number>(0);
    const [review, setReview ] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [product, setProduct] = useState<any>(null);

    const { id } = useParams();
    const { user } = useAuth();
    const { document } = useFetchDocument("Products", id);
    const userID = useSelector(selectUserID);
    const navigate = useNavigate();

    useEffect(() => {
        setProduct(document);
    }, [document]);

    const submitReview = async (e: React.FormEvent) => {
        e.preventDefault();

        if (rate === 0) {
            setError("Please give a star rating, star rating cannot be blank.");
            window.setTimeout(() => setError(""), 5000);
            return;
        }
        if (review === "") {
            setError("You left the review blank, please enter something before submitting.");
            window.setTimeout(() => setError(""), 5000);
            return;
        }

        const today = new Date();
        const date = today.toDateString();
        const reviewConfig: ReviewConfig = {
            userID,
            name: user?.displayName,
            productID: id,
            rate,
            review,
            createdAt: Timestamp.now().toDate()

        };

        try {
            await addDoc(collection(database, "Reviews"), reviewConfig );
            toast.success("Your review has been submitted, thank you.");
            setRate(0);
            setReview("");
            navigate("/order-history");
        } catch (error) {
            toast.error(error.message);
        }
    }
}  