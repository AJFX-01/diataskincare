import React, { useEffect } from "react";
import styles from "./orderHistory.module.scss";
import { TbBasketOff } from "react-icons/tb";
import useFetchCollection from "../../hooks/useFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import { Order, STORE_ORDERS } from "../../redux/slice/orderSlice";
import { selectOrderHistory } from "../../redux/slice/orderSlice";
import { selectUserID } from "../../redux/slice/authSlice";
import Loader from "../../component/loader/loader";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../component/card/Card";
import { Product } from "../../redux/slice/productSlice";


const OrderHistory : React.FC = () => {


    const {data, loading} = useFetchCollection("Orders");
    const orders : Order[] = useSelector(selectOrderHistory);
    const userID = useSelector(selectUserID);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const products  = useFetchCollection("Products");

    const filteredOrders = orders.filter((order) => order.userID === userID);


    useEffect(() => {
        dispatch(STORE_ORDERS(data))
    }, [dispatch, data])

    const handleClick = (id : string) => {
        navigate(`/order-details/${id}`);
    }


    return(
        <section className={styles.sec}>
            <div className={`container ${styles.order}`}>
                <div>
                    <p 
                        onClick={() => navigate(-1)}
                        style={{
                            cursor: "pointer",
                            marginBottom: "2rem"
                        }}
                    >
                        &larr; Go back
                    </p>
                </div>
                {filteredOrders.length ? <h2>Your Order History</h2> : null}
                <p>
                    <b>
                        {filteredOrders.length ? "Open an order to leave a review" : null}
                    </b>
                </p>
                <br />
                <>
                    {loading ? (
                        <Loader />
                    ) : (
                        <div className={styles.table}>
                            {filteredOrders.length === 0 ? (
                                <>
                                    <div className={styles.empty}>
                                        <TbBasketOff className={styles["basket-empty"]} />
                                        <br />
                                        <h2>You have no orders yet.</h2>
                                    </div> 
                                    <>
                                     <h3>
                                        <b>Recommended for you</b>
                                     </h3>
                                     <div className={styles.related}>
                                        {products.data?.slice(0, 6).map((product) => {
                                            const { id, name, imageUrl, price } = product;
                                            return(
                                                <Link key={id} to={`/product-details/${id}`}>
                                                    <Card>
                                                        <div className={styles.details}>
                                                            <img src={imageUrl} alt={name} />
                                                            <p>{name}</p>
                                                            <p>
                                                                NGN {new Intl.NumberFormat().format(price)}
                                                            </p>
                                                        </div>
                                                    </Card>
                                                </Link>
                                            );
                                        })}
                                     </div>
                                    </>
                                </>
                            ) :(
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
                                        {filteredOrders.map((order, index) => {
                                            const {
                                                id,
                                                orderDate,
                                                orderTime,
                                                orderAmount,
                                                orderStatus
                                            } = order;
                                            return (
                                                <tr key={id} onClick={() => handleClick(id)}>
                                                   <td>{index + 1}</td>
                                                   <td>
                                                        {orderDate} at {orderTime}
                                                    </td> 
                                                    <td>{id}</td>
                                                    <td>
                                                        NGN {new Intl.NumberFormat().format(orderAmount)}
                                                    </td>
                                                    <td>
                                                        <p 
                                                            className={
                                                                orderStatus === "Delivered"
                                                                    ? `${styles.pending}`
                                                                    : `${styles.delievered}`
                                                            }>
                                                            {orderStatus}
                                                        </p>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            ) }
                        </div>
                    )}
                </>
            </div>
        </section>
    )
};  

export default OrderHistory;
