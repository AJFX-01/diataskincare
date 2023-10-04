import { useRef, useState, useEffect } from "react";
import Card from "../../component/card/Card";
import { IoIosEye, IoMdEyeOff } from "react-icons/io";

import styles from "./auth.module.scss";


const DeleteUser = () => {
    return (
        <section className={styles.auth}>
            <div className={styles.img}>
                <img src={} alt="login" width="400"/>
            </div>
            <Card cardClass={styles.card}>
                <div className={styles.form}>
                    <h2>Confirm your details</h2>
                    <form>
                        <input type="email" value={email} required placeholder="Email"/>
                        <label className={styles.label}>
                            <input type="password" required value={} placeholder="Password"/>
                        </label>
                        {disable ? (
                            <button disabled className={`${styles.button} ${styles.disabled}`}>
                                Delete Account
                            </button>
                        ) : (
                            <button type="submit" className="--btn --btn-primary --btn-block">
                                {loading ? (
                                    <img src={} alt="loading" style={{ width : "25px", height: "25px"}} />
                                ) : ( 
                                    "Delete Account"
                                )}
                            </button>
                        )}
                    </form>
                </div>
            </Card>
        </section>
    );
}

export default DeleteUser;