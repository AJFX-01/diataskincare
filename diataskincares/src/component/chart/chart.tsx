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

export default function Chart(props: ChartProps) {
    const orders = useSelector(selectOrderHistory);

    const ordersArray: string[] = [];

    orders.map((item) => {
        const { orderStatus } = item;
        ordersArray.push(orderStatus);
    })
}