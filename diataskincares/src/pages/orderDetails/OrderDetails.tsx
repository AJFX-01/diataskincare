import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import useFetchDocuments from "../../hooks/useFetchDocuments";
import styles from "./orderDetails.module.scss";
import useFetchCollection from "../../hooks/useFetchCollection";
import Loader from "../../component/loader/loader";
import { Order } from "../../redux/slice/orderSlice";


const OrderDetails: React.FC = () => {
    const [order, setOrder] = useState<Order | null>(null);
    const { id } = useParams();
    const { document } = useFetchDocuments("Orders", id ?? "");
    const { data } = useFetchCollection("Shipping-Address")
    const navigate = useNavigate();


    const filteredAddress = data.find((address) => {
        address.userEmail === order?.userEmail
    });


    useEffect(() => { 
        if (document) {
          const order = document.data() as Order;
          setOrder(order);
        }
      }, [document]);
  
      if (!order) {
        return <Loader />;
      }
}