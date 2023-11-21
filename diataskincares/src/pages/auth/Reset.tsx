import React, { useState } from "react";
import styles from "./auth.module.scss";
import resetImg from "../../assets/forget.png"
import { useAuth } from "../../contexts/auth";
import Loader from "../../component/loader/loader";
import { Link, useNavigate } from "react-router-dom"
import Card from "../../component/card/Card";



const Reset : React.FC = () => {

    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { resetPassword } = useAuth();
    const navigate = useNavigate();


    const resetUserPassword =async (e: React.FormEvent) => {
        e.preventDefault();

        if (email === "") {
            setError('Enter your email');
            window.setTimeout(() => {
                setError("");
            }, 2000);

            return;
        }

        try {
            setError("");
            setMessage('');
            setLoading(true);
            await resetPassword(email);
            setEmail("");
            setLoading(false);
            setMessage(
                "Check your inbox for further instructions (Ensure to check spam folder, click on 'Report as not spam and continue from inbox')."
            );
            window.setTimeout(() => {
                setMessage("Redirecting....");
            }, 5000);
            window.setTimeout(() => {
                navigate("/login");
            }, 7000);
        } catch (err : any) {
            if (err.message === "Firebase: Error (auth/user-not-found).") {
                setError("This email is not registered");
                window.setTimeout(() => {
                  setError("");
                }, 3000);
            }
            if (err.message === "Firebase: Error (auth/invalid-email).") {
            setError("Invalid email");
            window.setTimeout(() => {
                setError("");
            }, 3000);
            }
            if (err.message === "Firebase: Error (auth/too-many-requests).") {
            setError("Reset password limit exceeded");
            window.setTimeout(() => {
                setError("");
            }, 3000);
            }
        }
        setLoading(false);
    };

    return (
        <section className={styles.auth}>
            {loading && <Loader />}
            <div className={styles.img}>
                <img src={resetImg} alt="login" width="400" />
            </div>
            <Card>
                <div className={styles.form}>
                    <h2>Reset Password</h2>
                    {error && <p className="alert error">{error}</p>}
                    {message && <p className="alert message">{message}</p>}
                    <div className={styles.info}>
                        <p>
                            If the email goes to your spam folder, click on 'Report as not
                            spam', this will move the mail from spam to your inbox. then go to
                            your inbox and continue from there. 
                        </p>
                    </div>
                    <form>
                        <input 
                            type="email"
                            value={email}
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            required />
                        <button 
                            className="--btn --btn-primary --btn-block"
                            onClick={resetUserPassword}
                        >
                            Proceed
                        </button>
                        <div className={styles.links}>
                            <p style={{ fontWeight : 600 }}>
                                <Link to="/login">- Login</Link>
                            </p>
                            <p style={{ fontWeight : 600 }}>
                                <Link to="/siginup">Sign Up</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </Card>
        </section>
    )
}


export default Reset;