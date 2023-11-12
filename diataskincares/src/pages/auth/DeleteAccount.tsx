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
    error: string | null;
    loading: boolean;
    view: boolean;
    disable: boolean;
 }

const DeleteUser: React.FC<DeleteAccountProps> = () => {

    const { user } = useAuth() || ();
    const [state, setState] = useState<DeleteAccountState>({
        email: "",
        password: "",
        error: null,
        loading: false,
        view: false,
        disable: false

    });

    const passwordRef = useRef<HTMLInputElement>();

    useEffect(() => {
        if (!state.email || !state.password) {
            setState({ ...state, disable: true});
        } else {
            setState({ ...state, disable: false});
        }
    }, [state.email, state.password]);
    
    const reAuthenticate = async () => {
        setState({ ...state, loading: true });


        try {
            const credential = EmailAuthProvider.credential(state.email, state.password);
            await reauthenticateWithCredential(user, credential);

            deleteAccount();
            setState({ ...state, error: null});
        } catch (error: any) {
            if (error.message === "Firebase: Error (auth/user-token-expired).") {
                setState({ ...state, error: "it has been long since your last login, please logout and login again to proceed" });
                window.setTimeout(() => {
                  setState({ ...state, error: null });
                }, 3000);
              } else if (error.message === "Firebase: Error (auth/wrong-password).") {
                setState({ ...state, error: "Wrong password" });
                window.setTimeout(() => {
                  setState({ ...state, error: null });
                }, 3000);
              } else if (error.message === "Firebase: Error (auth/user-mismatch).") {
                setState({ ...state, error: "Invalid Email" });
                window.setTimeout(() => {
                  setState({ ...state, error: null });
                }, 3000);
              }
              setState({ ...state, loading: false });
        }
    };

    try {
        Notiflix.Confirm.show(
            "DELETE Account",
            "Are you sure you wamt to delete your account?",
            "PROCEDD",
           " CANCEL", 
           async () => {
            await reAuthenticate();
           },
           () => {},
           {
            width: "320px",
            borderRadius: "5px",
            titleColor: "#c07d53",
            okButtonBackground: "#c07d53",
            cssAnimationStyle: "zoom"
           }
        );
    } catch (error: any) {
        toast.error(error.message);
    },

    const deleteAccount = async () => {
        try {
            await deleteUser(user);
            toast.success("Your account has beem deleted")
        } catch (error : any) {
            toast.error(error.message)
        }
    }

    const handleShowPassword = () => {
        setState({ ...state, view: !state.view });
        if (passwordRef.current) {
            passwordRef.current.type = view ? "text" : "password"
        } 
    }

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