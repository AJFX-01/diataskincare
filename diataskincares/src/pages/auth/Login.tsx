import styles from "./auth.module.scss";
import React, { useEffect, useState, useRef } from 'react';
import { FaGoogle } from "react-icons/fa";
import { Link , useNavigate } from "react-router-dom";
import { IoIosEye, IoMdEyeOff } from 'react-icons/io';
import Card from "../../component/card/Card";
import { useAuth } from "../../contexts/auth";
import { useSelector } from "react-redux";
import { selectPreviousURL } from "../../redux/slice/cartSlice";

const Login: React.FC = () => {



    const [email, setEmail] =  useState<string>("");
    const [password, setPassword] = useState<string>("");
    const passwordRef = useRef<HTMLInputElement>(null);
    const [view, setView] = useState<boolean>(false);
    const [disable, setDisable] = useState<boolean>(false);
    const [loading, setLoading] = useState<Boolean>(false);
    const [error, setErrror] = useState<string | null>(null);
    const navigate = useNavigate()
    const { login, googleSignIn } = useAuth();
    const previousURL = useSelector(selectPreviousURL);

    return (
        <section className={`${styles.auth}`}>
            <div className={styles.img}>
                <img src={loginImg} alt="login" width="400"/>
            </div>
            <Card>
                <div className={styles.form}>
                    <h2>Login</h2>
                    <form>
                        <input type="email" value={email} placeholder="Email" required/>
                        <label className={styles.label}> 
                            <input type="password" value={password} placeholder="Password" required/>
                        </label>
                        {disable ? ( 
                            <button className={`${styles.button} ${styles.disabled}`}>
                                Continue
                            </button>
                            ) : (
                                <button type="submit" className="--btn --btn-primary --btn-block">
                                    { loading ? (
                                        <img src={spinnerImg} alt="loading..." style={{width: "25px", height: "25px"}}/>
                                    ) : (
                                        "Continue"
                                )}
                            </button>
                        )}
                        <div className={styles.links}>
                            <Link to="/reset">Forget Password</Link>
                        </div>
                        <p>-- oR --</p> 
                    </form>
                    <button className="--btn --btn-danger --btn-block">
                        <FaGoggle color="#fff" /> &nbsp; Login With Google
                    </button>
                    <span className={styles.register}>
                        <p> s
                            No Diata<span>Skincares</span> account?
                        </p> &nbsp; <Link to="/signup">Sign Up</Link>
                    </span>
                </div>
            </Card>
        </section>
    );
}

export default Login;  