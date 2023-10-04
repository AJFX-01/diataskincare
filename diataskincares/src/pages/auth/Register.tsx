import {useState, useEffect, useRef } from "react";
import Card from "../../component/card/Card";
import styles from "./auth.module.scss";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"
import { signinImg, spinnerImg } from "../../assets";


const Register = () => {

    return (
        <section className={`${styles.auth}`}>
            <Card>
                <div className={styles.form}>
                    <h2>Sign Up</h2>
                    <form>
                        <input type="text" value={} placeholder="Name"/>
                        <input type="email" value={} placeholder="Email"/>
                        <label className={styles.label}>
                            <input type="password" value={} placeholder="Password"/>
                            <span></span>
                        </label>
                        <span className={styles.register}>
                            <p>
                                Have a Diata<span>skincare</span> account?
                            </p>
                            <Link to="/login">Login</Link>
                        </span>
                    </form>
                    <p style={{textAlign: 'center', marginBottom:'1.3rem'}}>-- OR --</p>
                    <button className="--btn --btn-danger --btn-block">
                        <FaGoogle color="#fff"/> &nbsp; Continue with Google
                    </button>
                </div>
            </Card>
            <div className={styles.img}>
                <img src={signinImg} alt="login" width="400"/>
            </div>
        </section>
    );
};

export default Register;