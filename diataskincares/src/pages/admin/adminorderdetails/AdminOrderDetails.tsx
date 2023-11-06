import React, { useEffect, useState } from "react";
import useFetchDocument from "../../../hooks/useFetchDocuments";
import styles from "./adminOrderDetails.module.scss";
import { Link, useParams } from "react-router-dom";
import OrderStatus, { Order } from "../orderstatus/OrderStatus";
import { useDispatch } from "react-redux";
import { Address, STORE_ADDRESS } from "../../../redux/slice/orderSlice";
import useFetchCollection from "../../../hooks/useFetchCollection";
import Card from "../../../component/card/Card";
import Loader from "../../../component/loader/loader";


  

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


        dispatch(STORE_ADDRESS({addressHistory: data}));
    }, [dispatch, data]);

    useEffect(() => { 
      if (document) {
        const order = document.data() as Order;
        setOrder(order);
      }
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
                 <b>Order Notification:</b> &nbsp; {order.orderNotifications}
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
                        <p>
                          <b>Phone Number: </b>
                          {filteredAddress.phone}
                        </p>
                        <p>
                          <b>Address 1: </b>
                          {filteredAddress.line1}
                        </p>
                        <p>
                          <b>Address 2: </b>
                          {filteredAddress.line2}
                        </p>
                        <p>
                          <b>Country: </b>
                          {filteredAddress.country}
                        </p>
                        <p>
                          <b>State: </b>
                          {filteredAddress.state}
                        </p>
                        <p>
                          <b>City: </b>
                          {filteredAddress.city}
                        </p>
                        <br/>
                      </div>
                    ) : (
                      <h4>
                        This order was made before the address functionality was added
                      </h4>
                    )}
                 </Card>
                ) : (
                  <h4>
                    This order was made before the address functionality was added.
                  </h4>
                )}
              </div>
            </div>
          </div>
          <br />

          <table>
            <thead>
              <tr>
                <th>S/N</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Toatal</th>
              </tr>
            </thead>
            <tbody>
              {order.cartItem.map((cart, index) => {
                const {id, name, price, imageUrl, cartQuantity } = cart;
                return (
                  <tr key={id}>
                    <td>
                      <b>{index + 1}</b>
                    </td>
                    <td>
                      <p>
                        <b>{name}</b>
                      </p>
                      <img src={imageUrl} alt={name} style={{ width: "100px"}} />
                    </td>
                    <td>NGM {new Intl.NumberFormat().format(price)} </td>
                    <td>{cartQuantity}</td>
                    <td>
                      NGN {new Intl.NumberFormat().format(price * cartQuantity)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <OrderStatus order={order} id={id ?? ""} />
        </div>
      </>
    );
  };


  export default OrderDetails;