import {
    deleteUser,
    EmailAuthProvider,
    reauthenticateWithCredential,
  } from "firebase/auth";
import React, { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";
import Card from "../../component/card/Card";
import { useAuth } from "../../contexts/auth";
import { IoIosEye, IoMdEyeOff } from "react-icons/io";
//   import DeleteUser from "../../assets/deleteuser.png";
import Notiflix from "notiflix";
import spinnerImg from "../../assets/spinner.jpg";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { database } from "../../firebase/firebase";
import styles from "./auth.module.scss";

interface DeleteAccountProps {}

interface DeleteAccountState {
    email: string;
    password: string;
    error: string
    loading: boolean;
    view: boolean;
    disable: boolean;
 }

const DeleteUser: React.FC<DeleteAccountProps> = () => {

    const { user } = useAuth();
    const [state, setState] = useState<>({
        email: "",
        password: "",
        error: null,
        loading: false,
        view: false,
        disable: false

    });

    const passwordRef




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
    )
};

 export default DeleteUser;