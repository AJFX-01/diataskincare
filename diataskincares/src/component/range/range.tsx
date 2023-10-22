import React from "react";
import styles from "./range.module.scss";

interface RangeData {
    id: number;
    title: string;
    image: string;
}

const Range = () => {
    return (
        <section className={`container ${styles.range}`}></section>
    )
}