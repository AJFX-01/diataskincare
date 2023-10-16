import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import styles from "./chart.module.scss";
import Card from "../card/Card";
import { selectOrderHistory } from "../../redux/slice/orderSlice";
import { useSelector } from "react-redux";
import { MdOutlineAddShoppingCart } from 'react-icons/md';
import { FcProcess, FcShipped } from 'react-icons/fc';
import { BsCartCheckFill } from 'react-icons/bs';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: false,
          text: "Chart.js Bar Chart",
        },
    },
}

interface ChartProps  {};

const Chart: React.FC<(props: ChartProps)> = () => {
    const orders = useSelector(selectOrderHistory);

    const ordersArray: string[] = [];

    orders.map((item) => {
        const { orderStatus } = item;
        ordersArray.push(orderStatus);
    });

    const getOrderStatusCount = (array: string[], value: string): number => {
        return array.filter((n) => n === value).length;
    };

    const [q1, q2, q3, q4] = [
        "Order Placed...",
        "Processing...",
        "Shipped...",
        "Delivered", 
    ];

    const  placed = getOrderStatusCount(ordersArray, q1);
    const processing = getOrderStatusCount(ordersArray, q2);
    const shipped = getOrderStatusCount(ordersArray, q3);
    const delivered = getOrderStatusCount(ordersArray, q4);
    
    const data = {
        labe: ["Placed Orders", "Processing", "Shipped....", "Delivered"],
        datasets: [
            {
                label : "Order Count",
                data: [placed, processing, shipped, delivered],
                backgroundColor: "#c07d53",
            },
        ],

    }

    return (
        <div className={styles.chart}>
            <Card cardClass={styles.card}>
                <div className={styles.grid}>
                    <p>
                        <MdOutlineAddShoppingCart size={25} color={'goldenrod'} />
                        <b>  Placed: {placed}</b>
                    </p>
                    <p> 
                        <FcProcess size={25} />
                        <b> Processing: {processing}</b>
                    </p>

                    <p>
                        <FcShipped size={25}/>
                        <b> Shipped: {shipped}</b>
                    </p>
                    <p>
                        <BsCartCheckFill size={25} color={'green'} />
                        <b> Delivered: {delivered} </b>
                    </p>
                </div>
                <h3>
                    <b>Order status chart</b>
                </h3>
                <Bar options={options} data={data} /> 
            </Card>
        </div>
    )
}