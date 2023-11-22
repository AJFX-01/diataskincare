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

const Notifications: React.FC = () => {
    const { data, loading } = useFetchCollection("Orders");


    const notifs = useSelector(selectOrderHistory);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userID = useSelector(selectUserID);

    useEffect(() => {
        dispatch(STORE_ORDERS(data));

    }, [dispatch, data]);

    const filteredNotifs = notifs.filter((notif) => {
        notif.userID === userID 
    });

    return (
        <div className={`container ${styles.notif}`}>
            <div>
                <p 
                    onClick={() => navigate(-1)}
                    style={{ cursor: "pointer", marginBottom: "2rem" }}
                >
                    &larr; Go back
                </p>
            </div>
            {!loading && <h1>Notifications on the status of your order</h1>}
            <br/>
            {loading ? (
                <Loader />
            ) : (
                <div>
                    {filteredNotifs.length === 0 ? (
                        <div>
                            <h2>
                                Sorry, You have no orders, hence no notifications on order
                            </h2>
                        </div>
                    ) : (
                        <>
                            {filteredNotifs === "Empty" ? (
                                <>
                                    <h2>
                                        Your Order status is at the <i>'Placed Order'</i>Status,
                                        keep checking for changes 
                                    </h2>
                                </>
                            ) : (
                                <div>
                                    {filteredNotifs.map((notif) => {
                                        const { id, orderNotification, orderDate, userEmail } = notif;
                                        return (
                                            <div key>
                                        )
                                    }}
                                </div>
                            )}
                        </>
                    )}
            )}
        </div>
    )
}