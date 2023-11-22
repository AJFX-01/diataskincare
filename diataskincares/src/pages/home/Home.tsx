import React, { useEffect } from "react";
import Product from "../../component/product/Product";
import Slider from "../../component/slider/Slider";
import styles from "./home.module.scss";
import Range from "../../component/range/range";


const Home: React.FC = () => {
    const url = window.location.href;

    useEffect(() => {
        const scrollToProducts = () => {
            if(url.includes("#product")) {
                window.scrollTo({
                    top: 770,
                    behavior: "smooth",
                });
            }
            return;
        };
        scrollToProducts();
    }, [url]);

    return (
        <div className={styles.home}>
            <Slider />
            <Range />
            <Product />
        </div>
    )
}