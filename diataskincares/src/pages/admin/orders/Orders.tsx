import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../../component/loader/loader";
import useFetchCollection from "../../../hooks/useFetchCollection";
import {
    Order,
  selectOrderHistory,
  STORE_ORDERS,
} from "../../../redux/slice/orderSlice";
import styles from "./orders.module.scss";


const Orders: React.FC = () => {
    const {data, loading }= useFetchCollection("Orders");
    const orders : Order[] = useSelector(selectOrderHistory);
    const dispatch = useDispatch();
    const navigate = useNavigate()


    useEffect(() => {

        const orders = data.map(doc => ({ id: doc.id, ...doc.data() }));

        dispatch(STORE_ORDERS({
            orderHistory: orders
        }))
    }, [dispatch, data]);


    const handleClick =(id: string) => {
        navigate(`/admin/order-details/${id}`);
    };

    if (loading) {
        return <Loader />; 
    }
    if (orders.length === 0) {
        return <p>No orders found.</p>
    }


    return (
        <section>
            <div className={`container ${styles.order}`}>
                <h2>All Orders</h2>
                <p>
                    Open an order to <b>change order status</b>
                </p>
                <br/>
                <>
                   <div className={styles.table}>
                    <table>
                        <thead>
                            <tr>
                                <th>S/N</th>
                                <th>Date</th>
                                <th>Order ID</th>
                                <th>Order Amount</th>
                                <th>Order Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => {
                                const { id, orderDate, orderTime, orderAmount, orderStatus } = order;
                                return (
                                    <tr key={id} onClick={() => handleClick(id)}>
                                        <td>{ index + 1 }</td>
                                        <td>
                                            {orderDate} at {orderTime}
                                        </td>
                                        <td>{id}</td>
                                        <td>NGN { new Intl.NumberFormat().format(orderAmount)}</td>
                                        <td>
                                            <p className={
                                                orderStatus != "Delivered"
                                                    ? `${styles.pending}`
                                                    : `${styles.delivered}`
                                            }
                                            >
                                                {orderStatus}
                                            </p>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                  </div> 
                </>
            </div>
        </section>
    );
};

export default Orders;