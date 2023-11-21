import styles from "./auth.module.scss";
import React, { useEffect, useState, useRef } from 'react';
import { FaGoogle } from "react-icons/fa";
import { Link , useNavigate } from "react-router-dom";
import { IoIosEye, IoMdEyeOff } from 'react-icons/io';
import Card from "../../component/card/Card";
import { useAuth } from "../../contexts/auth";
import { useSelector } from "react-redux";
import { selectPreviousURL } from "../../redux/slice/cartSlice";
import spinnerImg from "../../assets/spinner.jpg";
import loginImg from "../../assets/login.png";

const Login: React.FC = () => {



    const [email, setEmail] =  useState<string>("");
    const [password, setPassword] = useState<string>("");
    const passwordRef = useRef<HTMLInputElement>(null);
    const [view, setView] = useState<boolean>(false);
    const [disable, setDisable] = useState<boolean>(false);
    const [loading, setLoading] = useState<Boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { login, googleSignIn } = useAuth();
    const previousURL = useSelector(selectPreviousURL);

    const redirectUser = () => {
        if (previousURL.includes("cart")) {
            return navigate("/cart");
        } else {
            navigate('/');
        }
    };

    useEffect(() => {
        if(!email || !password) {
            setDisable(true);
        } else {
            setDisable(false);
        }
    }, [email, password]);

    const loginUser = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError('');
            await login(email, password);
            setLoading(false);
            redirectUser()
        } catch (error : any) {
            if (error.message === "Firebase: Error (auth/user-not-found).") {
                setError("User not found");
                window.setTimeout(() => {
                  setError("");
                }, 6000);
              }
              if (error.message === "Firebase: Error (auth/wrong-password).") {
                setError("Wrong password");
                window.setTimeout(() => {
                  setError("");
                }, 6000);
              }
              if (error.message === "Firebase: Error (auth/network-request-failed).") {
                setError("Please check your internet connection");
                window.setTimeout(() => {
                  setError("");
                }, 6000);
              }
              if (
                error.message ===
                "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests)."
              ) {
                setError(
                  "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later"
                );
                window.setTimeout(() => {
                  setError("");
                }, 12000);
                
                setLoading(false)
            }
        }
    };


    const handleShowPassword = () => {
        setView(view);
        if (passwordRef.current) {
            if (passwordRef.current?.type === "password") {
                passwordRef.current.setAttribute("type", "text")
            } else {
                passwordRef.current.setAttribute("type", "password")
            }
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
            redirectUser();
        } catch(err : any) {
            if (err.message === "Firebase: Error (auth/popup-closed-by-user).") {
                setError("Google sign in failed. (You exited the google sign in)");
                window.setTimeout(() => {
                  setError("");
                }, 6000);
              }
              if (err.message === "Firebase: Error (auth/network-request-failed).") {
                setError(
                  "Google sign in failed, this is mostly due to network connectivity issues, please check your network and try again."
                );
                window.setTimeout(() => {
                  setError("");
                }, 6000);
              }
            }
        }


    return (
        <>
            <section className={`container ${styles.auth}`}>
                <div className={styles.img}>
                    <img src={loginImg} alt="login" width="400"/>
                </div>
                <Card>
                    <div className={styles.form}>
                        <h2>Login</h2>
                        {error && <p className="alert-error">{error}</p>}
                        <form onSubmit={loginUser}>
                            <input type="email" value={email} placeholder="Email" required onChange={(e) => setEmail(e.target.value)}/>
                            <label className={styles.label}> 
                                <input type="password" value={password} placeholder="Password" required ref={passwordRef} onChange={(e) => setPassword(e.target.value)}/>
                                <span onClick={handleShowPassword}>
                                    {view ? <IoIosEye/> : <IoMdEyeOff/>}
                                </span>
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
                        <button className="--btn --btn-danger --btn-block" onClick={handleGoogleSignIn}>
                            <FaGoogle color="#fff" /> &nbsp; Login With Google
                        </button>
                        <span className={styles.register}>
                            <p> s
                                No Diata<span>Skincares</span> account?
                            </p> &nbsp; <Link to="/signup">Sign Up</Link>
                        </span>
                    </div>
                </Card>
            </section>
        </>
    );
}

export default Login;  