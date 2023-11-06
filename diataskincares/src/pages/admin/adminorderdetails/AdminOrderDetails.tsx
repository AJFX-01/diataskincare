import React, { useEffect, useState } from "react";
import useFetchDocument from "../../../hooks/useFetchDocuments";
import styles from "./adminOrderDetails.module.scss";
import { Link, useParams } from "react-router-dom";
import OrderStatus from "../orderstatus/OrderStatus";
import { useDispatch } from "react-redux";
import { STORE_ADDRESS } from "../../../redux/slice/orderSlice";
import useFetchCollection from "../../../hooks/useFetchCollection";
import Card from "../../../component/card/Card";
import Loader from "../../../component/loader/loader";



interface Order {
    id: string;
    orderAmount: number;
    orderStatus: string;
    orderNotification: string;
    userEmail: string;
    cartItems: {
      id: string;
      name: string;
      price: number;
      imageUrl: string;
      cartQuantity: number;
    }[];
  }

  

  const OrderDetails: React.FC = () => {
    const [order, setOrder] = useState<Order | null>(null);
    const { id } = useParams();
    const { document } = useFetchDocument("Orders", id ?? "");
    const dispatch = useDispatch();
    const { data } = useFetchCollection("Shipping-Address");
    const filteredAddress = data.find(
        (address) => address.userEmail === order?.userEmail
    );

    useEffect(() => {


        dispatch(STORE_ADDRESS(data));
    }, [dispatch, data]);

    useEffect(() => {
        setOrder(document);
    }, [document]);

    if (!order) {
      return <Loader />
    }

    return (
      <>
        <div className={styles.table}>
          <div>
            <Link to="/admin/orders">&larr; Back To Orders</Link>
          </div>
          <br />
          <div className={styles.flex}>
            <Card cardClass={styles.card}>
              <h3 style={{ textDecoration : "underline"}}>Order Details</h3>
              <>
                <p>
                  <b>Order Amount:</b> &nbsp;NGN(" ")
                  {new Intl.NumberFormat().format(order.orderAmount)}
                </p>
                <p className={
                    order.orderStatus === "Delivered"
                      ? `${styles.delievered}`
                      : `${styles.pending}`
                  }
                >
                 <b>Order Status:</b> &nbso;{order.orderStatus}
                 <br/>
                 <b>Order Notification:</b> &nbsp; {order.orderNotification}
                 <br/>
                 <b>Order Placed:</b> &nbsp; {order.userEmail}
                 <br/>
                 { filteredAddress && (
                    <> 
                      <b>Time of Order: </b> &nbsp;{filteredAddress.time}
                      <br />
                      <br>Date of Order</br> &nbsp;{filteredAddress.date}
                    </>
                 )} 
                </p>
                <br />
              </>
            </Card>

            <div>
              <div>
                {filteredAddress ? (
                  <Card cardClass={styles.card}>
                    <h3 style={{ textDecoration : "underline"}}>
                      Customer Details
                    </h3>
                    { filteredAddress ? (
                      <div>
                        <p>
                          <b>Name: </b>
                          {filteredAddress.name}
                        </p>
                      </div>
                    )}
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  };


  export default OrderDetails;