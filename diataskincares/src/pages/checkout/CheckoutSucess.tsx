import { Link } from "react-router-dom";
import React from "react"
import success from '../../assets/thanks.webp'
import styles from './checkoutDetails.module.scss'


const CheckoutSuccess: Function = () => {
    return (
        <section>
            <div className={`container ${styles.success}`}>
                <h2>Your checkoutwas successful</h2>
                <div>
                    <img src={success} alt="successful order" />
                </div>
                <br />
                <button className="--btn --btn-primary">
                    <Link to="/order-history" style={{ color: '#fff'}}>
                        View Order Status
                    </Link>
                </button>
            </div>
        </section>
    );
}


export default CheckoutSuccess;