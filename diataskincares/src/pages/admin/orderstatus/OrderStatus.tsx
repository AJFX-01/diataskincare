import { doc, setDoc, Timestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { database } from "../../../firebase/firebase";
import Card from "../../../component/card/Card";
import Loader from "../../../component/loader/loader";
import styles from "./changeOrderStatus.module.scss";
import { BsInfoCircle } from "react-icons/bs";


interface Order {
    id: string;
    userID: string;
    userEmail: DOMStringList;
    orderDate: string;
    ordertime: string;
    orderAmount: number;
    orderStatus: string;
    orderNotifications: string;
    cartItem: {
        id: string;
        name: string;
        price: number;
        imageUrl: string;
        cartQuantity: number;
    }[];
    createdAt: Date;
}

const OrderStatus: React.FC<{ order: Order; id: string }> = ({ order, id}) => {
    const [status, setStatus] = useState<string>("")
    c

    return ();
};

export default OrderStatus;
