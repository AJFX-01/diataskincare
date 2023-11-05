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
    const [status, setStatus] = useState<string>("");
    const [notif, setNotif] = useState<string>("");
    const [disable, setDisable] = useState<boolean>(false);
    const [loading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();


    useEffect(() => {
        if (order !== null && order.orderNotifications !== null) {
            if (
                order.orderNotifications === "Your order has been changed to the status of DELIEVERED!" || 
                order.orderStatus === "Delivered"
            ) {
                setDisable(true);
            } else {
                setDisable(false);
            }
        }
    }, [order]);

    const editOrder = (e: React.FormEvent, id: string) => {
        e.preventDefault();
        setIsLoading(true);

        const orderConfig = {
            userID: order.userID,
            userEmail: order.userEmail,
            orderDate: order.orderDate,
            orderTime: order.ordertime,
            orderAmount: order.orderAmount,
            orderStatus: status,
            orderNotification: order.orderNotifications,
            cartItems: order.cartItem,
            createdAt: order.createdAt,
            editedAt: Timestamp.now().toDate(), 
        };

        try {
            setDoc(doc(database, "Orders" id), orderConfig);
        }
    }
    
    return ();
};

export default OrderStatus;
