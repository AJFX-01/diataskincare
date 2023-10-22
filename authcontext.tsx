import React from "react";
import { rangeData } from "./data";
import styles from "./range.module.scss";

interface RangeData {
  id: number;
  title: string;
  image: string;
}

export default function Range() {
  return (
    <section className={`container ${styles.range}`}>
      <h2>What types of products do we offer?</h2>
      <div className={styles["range-grid"]}>
        {rangeData.map((range: RangeData) => {
          const { id, title, image } = range;
          return (
            <div key={id} className={styles["range-data"]}>
              <div className={styles["range-image"]}>
                <img src={image} alt="" />
              </div>
              <div className={styles["range-texts"]}>
                <h1 style={{ color: "#fff" }}>{title}</h1>
              </div>
            </div>
          );
        })}
      </div>
      <br />
    </section>
  );
}
