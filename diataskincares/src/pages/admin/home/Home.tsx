import React, { useEffect } from "react";
import InfoBox from "../../../component/infobox/Infobox";
import spinnerImg from "../../../assets/spinner.jpg";
import styles from "./home.module.scss";
import { TbCurrencyNaira } from "react-icons/tb";
import { BsCart4 } from "react-icons/bs";
import { FaCartArrowDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProducts,
  STORE_PRODUCTS,
} from "../../../redux/slice/productSlice";
import {
  CALCULATE_TOTAL_ORDER_AMOUNTS,
  selectOrderHistory,
  selectTotal,
  STORE_ORDERS,
} from "../../../redux/slice/orderSlice";
import useFetchCollection from "../../../hooks/useFetchCollection";
import { Product } from "../../../redux/slice/productSlice";
import { Order } from "../../../redux/slice/orderSlice";
import Chart from "../../../component/chart/chart";


const earningIcon = <TbCurrencyNaira size={30} color="#c07d53" />;
const productIcon = <BsCart4 size={30} color="#000" />;
const ordersIcon = <FaCartArrowDown size={30} color="#3c4448" />;


const Home: React.FC = () => {
    const products: Product[] = useSelector(selectProducts);
    const orders: Order[] = useSelector(selectOrderHistory);
    const totalOrderAmount: number = useSelector(selectTotal);
  
    const dbProducts = useFetchCollection("Products");
    const { data } = useFetchCollection("Orders");
  
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(
        STORE_PRODUCTS({
          products: dbProducts.data,
        })
      );
  
      dispatch(STORE_ORDERS(data));
  
      dispatch(CALCULATE_TOTAL_ORDER_AMOUNTS());
    }, [dispatch, data, dbProducts]);
  
    return (
      <div className={styles.home}>
        <h2>Dashboard</h2>
        <div className={styles["info-box"]}>
          <InfoBox
            cardClass={`${styles.card} ${styles.card1}`}
            title={"Earnings"}
            count={
              totalOrderAmount === 0 ? (
                <img
                  src={spinnerImg}
                  alt="loading"
                  style={{ width: "20px", height: "20px" }}
                />
              ) : (
                `NGN ${new Intl.NumberFormat().format(totalOrderAmount)}`
              )
            }
            icon={earningIcon}
          />
          <InfoBox
            cardClass={`${styles.card} ${styles.card2}`}
            title={"Products"}
            count={
              products.length === 0 ? (
                <img
                  src={spinnerImg}
                  alt="loading"
                  style={{ width: "20px", height: "20px" }}
                />
              ) : (
                products.length
              )
            }
            icon={productIcon}
          />
          <InfoBox
            cardClass={`${styles.card} ${styles.card3}`}
            title={"Orders"}
            count={
              orders.length === 0 ? (
                <img
                  src={spinnerImg}
                  alt="loading"
                  style={{ width: "20px", height: "20px" }}
                />
              ) : (
                orders.length
              )
            }
            icon={ordersIcon}
          />
        </div>
        <div>
          <Chart />
        </div>
      </div>
    );
  };
  
  export default Home;