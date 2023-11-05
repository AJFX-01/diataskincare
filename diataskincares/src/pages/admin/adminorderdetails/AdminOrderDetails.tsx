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
    const { document } =useFetchDocument("Orders", id);
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
    }, [document])

    return ()
  };


  export default OrderDetails;