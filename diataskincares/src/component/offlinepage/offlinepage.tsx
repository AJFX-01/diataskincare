import React from "react";
import { RiWifiOffLine } from "react-icons/ri";
import styles from "./offline.module.scss";


function OfflinePage() {
    return (
        <div className={styles.offline}>
            <RiWifiOffLine className={styles.icon} />
            <h1>Seems your network is lost</h1>
            <p>
                <b>
                    You would be able to access Shop<span>Land</span> Once your network
                    connection is restored
                </b>
            </p>
        </div>
    );
}


export default OfflinePage;