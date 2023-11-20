import React, { useState, useEffect, useRef } from "react";
import signinImg from "../../assets/register.png";
import Card from "../../component/card/Card";
import { Link, useNavigate } from "react-router-dom";
import styles from "./auth.module.scss";
import { useAuth } from "../../contexts/auth";
import { GoPrimitiveDot } from "react-icons/go";
import { ImCheckmark } from "react-icons/im";
import { IoIosEye, IoMdEyeOff } from "react-icons/io";
import spinnerImg from "../../assets/spinner.jpg";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { database } from "../../firebase/firebase";
import { useSelector } from "react-redux";
import { selectPreviousURL } from "../../redux/slice/cartSlice";
import { FaGoogle } from "react-icons/fa";

const Register: React.FC = () => {


    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const passwordRef = useRef();
    const [view, setView] = useState<boolean>(false);
    const [caseCondition, setCaseCondition] = useState<boolean>(false);
    const [numberCondition, setNumberCondition] = useState<boolean>(false);
    const [charCondition, setCharCondition] = useState<boolean>(false);
    const [lengthCondition, setLengthCondition] = useState<boolean>(false);
    const [passwordComplete, setPasswordComplete] = useState(false);
    const [passFocus , setPassFocus] = useState<boolean>(false);
    const [userName, setUserName] = useState("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const { signup, updateName, googleSignIn, user } = useAuth();
    const previousURL = useSelector(selectPreviousURL);

    const redirectUser = () => {
        if(previousURL.includes("cart")) {
            return navigate("/cart")
        } else {
            return("/")
        }
    
    };

    const registerUser = async (e : any) => {
        e.preventDefault();


        try {
            setLoading(true)
            setError("");
            await signup(email, password);
            await updateName(userName);
            setLoading(false);
            redirectUser();
        } catch (error : any) {

        }
    }

    
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