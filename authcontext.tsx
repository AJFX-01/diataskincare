// import React, { useEffect, useState } from "react";
// import useFetchDocument from "../../../hooks/useFetchDocuments";
// import styles from "./adminOrderDetails.module.scss";
// import { Link, useParams } from "react-router-dom";
// import ChangeOrderStatus from "../changeOrderStatus/ChangeOrderStatus";
// import { useDispatch } from "react-redux";
// import { STORE_ADDRESS } from "../../../redux/slice/orderSlice";
// import useFetchCollection from "../../../hooks/useFetchCollection";
// import Card from "../../../components/card/Card";
// import Loader from "../../../components/loader/Loader";

// interface Order {
//   id: string;
//   orderAmount: number;
//   orderStatus: string;
//   orderNotification: string;
//   userEmail: string;
//   cartItems: {
//     id: string;
//     name: string;
//     price: number;
//     imageUrl: string;
//     cartQuantity: number;
//   }[];
// }

// const OrderDetails: React.FC = () => {
//   const [order, setOrder] = useState<Order | null>(null);
//   const { id } = useParams<{ id: string }>();
//   const { document } = useFetchDocument("Orders", id);
//   const dispatch = useDispatch();
//   const { data } = useFetchCollection("Shipping-Address");
//   const filteredAddress = data.find(
//     (address) => address.userEmail === order?.userEmail
//   );

//   useEffect(() => {
//     dispatch(STORE_ADDRESS(data));
//   }, [dispatch, data]);

//   useEffect(() => {
//     setOrder(document);
//   }, [document]);

//   if (!order) {
//     return <Loader />;
//   }

//   return (
//     <>
//       <div className={styles.table}>
//         <div>
//           <Link to="/admin/orders">&larr; Back To Orders</Link>
//         </div>
//         <br />
//         <div className={styles.flex}>
//           <Card cardClass={styles.card}>
//             <h3 style={{ textDecoration: "underline" }}>Order Details</h3>
//             <>
//               <p>
//                 <b>Order ID:</b> &nbsp;{order.id}
//               </p>
//               <p>
//                 <b>Order Amount:</b> &nbsp;NGN{" "}
//                 {new Intl.NumberFormat().format(order.orderAmount)}
//               </p>
//               <p
//                 className={
//                   order.orderStatus === "Delivered"
//                     ? `${styles.delievered}`
//                     : `${styles.pending}`
//                 }
//               >
//                 <b>Order Status:</b> &nbsp;{order.orderStatus}
//                 <br />
//                 <b>Order Notification:</b> {order.orderNotification}
//                 <br />
//                 <b>Order placed by:</b> &nbsp;{order.userEmail}
//                 <br />
//                 {filteredAddress && (
//                   <>
//                     <b>Time Of Order: </b> &nbsp;{filteredAddress.time}
//                     <br />
//                     <b>Date Of Order: </b> &nbsp; {filteredAddress.date}
//                   </>
//                 )}
//               </p>
//               <br />
//             </>
//           </Card>

//           <div>
//             <div>
//               {filteredAddress ? (
//                 <Card cardClass={styles.card}>
//                   <h3 style={{ textDecoration: "underline" }}>
//                     Customer Details
//                   </h3>
//                   {filteredAddress ? (
//                     <div>
//                       <p>
//                         <b>Name: </b>
//                         {filteredAddress.name}
//                       </p>
//                       <p>
//                         <b>Phone Number: </b>
//                         {filteredAddress.phone}
//                       </p>
                     
//                       <p>
//                         <b>Address 1: </b>
//                         {filteredAddress.line1}
//                       </p>
//                       <p>
//                         <b>Address 2: </b>
//                         {filteredAddress.line2}
//                       </p>
//                       <p>
//                         <b>Country: </b>
//                         {filteredAddress.country}
//                       </p>
//                       <p>
//                         <b>State: </b>
//                         {filteredAddress.state}
//                       </p>
//                       <p>
//                         <b>City: </b>
//                         {filteredAddress.city}
//                       </p>

//                       <br />
//                     </div>
//                   ) : (
//                     <h4>
//                       This order was made before the address functionality was
//                       added.
//                     </h4>
//                   )}
//                 </Card>
//               ) : (
//                 <h4>
//                   This order was made before the address functionality was
//                   added.
//                 </h4>
//               )}
//             </div>
//           </div>
//         </div>
//         <br />

//         <table>
//           <thead>
//             <tr>
//               <th>S/N</th>
//               <th>Product</th>
//               <th>Price</th>
//               <th>Quantity</th>
//               <th>Total</th>
//             </tr>
//           </thead>
//           <tbody>
//             {order.cartItems.map((cart, index) => {
//               const { id, name, price, imageUrl, cartQuantity } = cart;
//               return (
//                 <tr key={id}>
//                   <td>
//                     <b>{index + 1}</b>
//                   </td>
//                   <td>
//                     <p>
//                       <b>{name}</b>
//                     </p>
//                     <img src={imageUrl} alt={name} style={{ width: "100px" }} />
//                   </td>
//                   <td>NGN {new Intl.NumberFormat().format(price)}</td>
//                   <td>{cartQuantity}</td>
//                   <td>
//                     NGN {new Intl.NumberFormat().format(price * cartQuantity)}
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//         <ChangeOrderStatus order={order} id={id} />
//       </div>
//     </>
//   );
// };

// export default OrderDetails;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { database } from "../../../firebase/firebase";
import Card from "../../../components/card/Card";
import Loader from "../../../components/loader/Loader";
import styles from "./changeOrderStatus.module.scss";
import { BsInfoCircle } from "react-icons/bs";

interface Order {
  id: string;
  userID: string;
  userEmail: string;
  orderDate: string;
  orderTime: string;
  orderAmount: number;
  orderStatus: string;
  orderNotification: string;
  cartItems: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    cartQuantity: number;
  }[];
  createdAt: Date;
}

const ChangeOrderStatus: React.FC<{ order: Order; id: string }> = ({
  order,
  id,
}) => {
  const [status, setStatus] = useState<string>("");
  const [notif, setNotif] = useState<string>("");
  const [disable, setDisable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (order !== null && order.orderNotification !== null) {
      if (
        order.orderNotification ===
          "Your order has been changed to the status of DELIEVERED!" ||
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
      orderNotification: notif,
      cartItems: order.cartItems,
      createdAt: order.createdAt,
      editedAt: Timestamp.now().toDate(),
    };

    try {
      setDoc(doc(database, "Orders", id), orderConfig);

      setIsLoading(false);
      toast.success("Order status & notification changed successfully");
      navigate("/admin/orders");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}

      <div className={styles.status}>
        <Card cardClass={styles.card}>
          {disable ? (
            <p className={styles["order-alert"]}>
              <BsInfoCircle size={13} />
              &nbsp; Product has been delivered, so you can't change its status.
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
            <br />

            <span>
              <h4>
                Update Notification
                <br /> (Must correspond with status)
              </h4>
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
            </span>
            <span>
              <button
                type="submit"
                className="--btn --btn-primary"
                disabled={disable}
                style={{ opacity: disable ? 0.6 : 1 }}
              >
                Update Status & Notification
              </button>
            </span>
          </form>
        </Card>
      </div>
    </>
  );
};

export default ChangeOrderStatus;