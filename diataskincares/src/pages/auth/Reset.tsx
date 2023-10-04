import { useState } from "react";
import styles from "./auth.module.scss";

import { Link, useNavigate } from "react-router-dom"
import Card from "../../component/card/Card";

const Reset = () => {
    return (
        <section className={styles.auth}>
            <div className={styles.img}>
                <img src={resetImg} alt="login" width="400" />
            </div>
            <Card>
                <div className={styles.form}>
                    <h2>Reset Password</h2>
                    <div className={styles.info}>
                        <p>
                            If the email goes to your spam folder, click on 'Report as not
                            spam', this will move the mail from spam to your inbox. then go to
                            your inbox and continue from there. 
                        </p>
                    </div>
                    <form>
                        <input type="email" value={} placeholder="Email" required />
                        <button className="--btn --btn-primary --btn-block">Proceed</button>
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