import React from "react";
import styles from "./card.module.scss";

type CardProps = {
    children: React.ReactNode;
    cardClass?: string;
};

const Card : React.FC<CardProps> = ({ children, cardClass}) => {
    return <div className={`${styles.card} ${cardClass}`}>{children}</div>;
}

export default Card;