import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import styles from "./checkoutForm.module.scss";
import Card from "../card/Card";
import CheckoutSummary from "../checkoutSummary/CheckoutSummary";
import spinnerImg from "../../assets/spinner.jpg";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { selectEmail, selectUserID } from "../../redux/slice/authSlice";
import {
  CLEAR_CART,
  selectCartItems,
  selectCartTotalAmounts,
} from "../../redux/slice/cartSlice";
import { selectShippingAddress } from "../../redux/slice/checkoutSlice";
import { useNavigate } from "react-router-dom";
import { database } from "../../firebase/firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { URLSearchParams } from "url";


const CheckoutForm : React.FC = () => {

    const [message, setMessage] = useState<string  | null>(null);
    const [isLoading,setIsLoading ] = useState<boolean>(false);
    const stripe = useStripe();
    const elements = useElements();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userID = useSelector(selectUserID);
    const userEmail = useSelector(selectEmail);
    const cartItems = useSelector(selectCartItems);
    const cartTotalAmount = useSelector(selectCartTotalAmounts);
    const shippingAddress = useSelector(selectShippingAddress);


    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }

        setMessage(null);
    }, [stripe]);

    // save order to Order History
    const saveOrder = async () => {
        const today = new Date();
        const date = today.toDateString();
        const time = today.toLocaleDateString();

        const orderConfig = {
            userID,
            userEmail,
            orderDate: date,
            orderTime: time,
            orderAmount: cartTotalAmount,
            orderStatus: "Order Placed.....",
            cartItems,
            shippingAddress,
            createAt: Timestamp.now().toDate() 
        };

        try {
            await addDoc(collection(database, "Orders"),  orderConfig);
            dispatch(CLEAR_CART());
            navigate("/checkkout-success");
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage(null);

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        const confirmPayment = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this ater
                return_url: "http://localhost:3000/checkout-success",
            },
            redirect: "if_required",
        });

        if (confirmPayment.error) {
            setMessage(confirmPayment.error.message || null);
            setIsLoading(false);
            return;
        }

        if (confirmPayment.paymentIntent) {
            if (confirmPayment.paymentIntent.status === "succeeded") {
                setIsLoading(false);
                toast.success("Payment successful");
                saveOrder();
            }
            
        }


    };

    return(
        <section>
            <div className={`container ${styles.checkkout}`}>
                <h2>Checkout</h2>
                <form onSubmit={handleSubmit}>
                    <div> 
                        <Card cardClass={styles.card}>
                            <CheckoutSummary/>
                        </Card>
                    </div>
                    <div>
                        <Card cardClass={`${styles.card} ${styles.pay}`}>
                            <h3>Stripe Checkout</h3>
                            <PaymentElement id={styles["payment-element"]} />
                            <button disabled={isLoading || !stripe || !elements } id="submit" className={styles.button}>
                                <span id="button-text">
                                    {isLoading ? (
                                        <img src={spinnerImg} alt="loading..."
                                            style={{ width: "20px "}}
                                        />
                                    ) : ("Pay Now")}
                                </span>
                            </button>
                            {message && <div id={styles["payment-message"]}>{message}</div>}
                        </Card>
                    </div>
                </form>
            </div>
        </section>
     );

};

export default CheckoutForm;