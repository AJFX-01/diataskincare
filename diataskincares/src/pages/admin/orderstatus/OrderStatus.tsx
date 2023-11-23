import { doc, setDoc, Timestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { database } from "../../../firebase/firebase";
import Card from "../../../component/card/Card";
import Loader from "../../../component/loader/loader";
import styles from "./changeOrderStatus.module.scss";
import { BsInfoCircle } from "react-icons/bs";
import { Order } from "../../../redux/slice/orderSlice";




const OrderStatus: React.FC<{ order: Order; id: string }> = ({ order, id}) => {
    const [status, setStatus] = useState<string>("");
    const [notif, setNotif] = useState<string>("");
    const [disable, setDisable] = useState<boolean>(false);
    const [loading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();


    useEffect(() => {
        if (order !== null && order.orderNotification !== null) {
            if (
                order.orderNotification === "Your order has been changed to the status of DELIEVERED!" || 
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
            orderTime: order.orderTime,
            orderAmount: order.orderAmount,
            orderStatus: status,
            orderNotification: order.orderNotification,
            cartItems: order.cartItem,
            createdAt: order.createdAt,
            editedAt: Timestamp.now().toDate(), 
        };

        try {
            setDoc(doc(database, "Orders", id), orderConfig);

            setIsLoading(false);
            toast.success("Order status & notification changed successfully");
            navigate("/admin/orders");
        } catch (error : any) {
            setIsLoading(false);
            toast.error(error.message);
        }
    };
    
    return (
        <>
            {loading && <Loader />}

            <div className={styles.status}>
                <Card cardClass={styles.card}>
                    {disable ? (
                        <p className={styles["örder-alert"]}>
                            <BsInfoCircle size={13} />
                            &nbsp;  Product has been delivered, so you can't change its status.
                        </p>
                    ) : null}
                    {!disable ? (
                        <p className={styles["order-alert"]}>
                            <BsInfoCircle size={13} />
                            &nbsp; Only change status and notification to Delivered when you
                            have confirmed that the user has received this product.
                        </p>
                    ) : null}
                    <h4>Update Status</h4>
                    <form onSubmit={(e) => editOrder(e, id)}>
                        <span>
                            <select 
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                required
                                disabled={disable}
                            >
                                <option value="" disabled>
                                -- Choose one --
                                </option>
                                <option value="Order Placed...">Order Placed...</option>
                                <option value="Processing...">Processing...</option>
                                <option value="Shipped...">Shipped...</option>
                                <option value="Delivered">Delivered</option>
                            </select>
                        </span>
                        <br/>

                        <span>
                            <h4>
                                Update Notification
                                <br/>
                                <select 
                                    value={notif}
                                    onChange={(e) => setNotif(e.target.value)}
                                    required
                                    disabled={disable}
                                >
                                    <option value="" disabled>
                                    -- Choose one --
                                    </option>
                                    <option value="Your order has been Placed.....">
                                    Your order has been Placed.....
                                    </option>
                                    <option value="Your order has been changed to the status of PROCESSING...">
                                    Your order has been changed to the status of PROCESSING...
                                    </option>
                                    <option value="Your order has been changed to the status of SHIPPED...">
                                    Your order has been changed to the status of SHIPPED...
                                    </option>
                                    <option value="Your order has been changed to the status of DELIEVERED!">
                                    Your order has been changed to the status of DELIEVERED!
                                    </option> 
                                </select>
                            </h4>
                        </span>
                        <button  
                            type="submit" 
                            className="--btn --btn-primary"
                            disabled={disable}
                            style={{ opacity : disable ? 0.6 : 1}}>
                                Update Status & Notification
                        </button>
                    </form>
                </Card>
            </div>
        </>
    );
};

export default OrderStatus;
