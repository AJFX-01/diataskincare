import React, { ReactNode } from "react";
import Card from "./Card"; // Make sure to import Card or the equivalent

interface InfoBoxProps {
  cardClass: string;
  title: string;
  count: number;
  icon: ReactNode;
}

export default function InfoBox({ cardClass, title, count, icon }: InfoBoxProps) {
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
