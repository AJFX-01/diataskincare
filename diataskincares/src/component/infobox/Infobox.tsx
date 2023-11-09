import React, { ReactNode } from "react";
import Card from "../card/Card";
import styles from "./infoBox.module.scss";

interface InfoBoxProps {
    cardClass: string;
    title: string;
    count: number;
    icon: ReactNode;
}

const InfoBox = ({ cardClass, title, count, icon }: InfoBoxProps) => {
    return (
        <div className={styles["info-box"]}>
            <Card cardClass={cardClass}>
                <h4>{title}</h4>
                <span>
                    <h3>{count}</h3>
                    {icon}
                </span>
            </Card>
        </div>
    );
}

export default InfoBox;