import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { toast } from "react-toastify";

import {
  selectUserID,
  selectEmail,
  selectCartItems,
  selectCartTotalAmounts,
  selectShippingAddress,
} from "./yourSelectorFile"; // Import your selector file here

import { CLEAR_CART } from "./yourActionFile"; // Import your action file here

import Card from "./Card"; // Import your Card component here
import CheckoutSummary from "./CheckoutSummary"; // Import your CheckoutSummary component here
import PaymentElement from "./PaymentElement"; // Import your PaymentElement component here

import styles from "./CheckoutForm.module.css"; // Import your CSS styles here
import spinnerImg from "./spinner.png"; // Import your spinner image here

const CheckoutForm: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
  }, [stripe]);

  // Save order to Order History
  const saveOrder = async () => {
    const today = new Date();
    const date = today.toDateString();
    const time = today.toLocaleTimeString();
    const orderConfig = {
      userID,
      userEmail,
      orderDate: date,
      orderTime: time,
      orderAmount: cartTotalAmount,
      orderStatus: "Order Placed...",
      cartItems,
      shippingAddress,
      createdAt: Timestamp.now().toDate(),
    };
    try {
      await addDoc(collection(database, "Orders"), orderConfig); // You need to import 'database' from Firebase
      dispatch(CLEAR_CART());
      navigate("/checkout-success");
    } catch (error) {
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
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/checkout-success",
      },
      redirect: "if_required",
    });

    if (confirmPayment.error) {
      setMessage(confirmPayment.error.message);
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

  return (
    <section>
      <div className={`container ${styles.checkout}`}>
        <h2>Checkout</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <Card cardClass={styles.card}>
              <CheckoutSummary />
            </Card>
          </div>
          <div>
            <Card cardClass={`${styles.card} ${styles.pay}`}>
              <h3>Stripe Checkout</h3>
              <PaymentElement id={styles["payment-element"]} />
              <button
                disabled={isLoading || !stripe || !elements}
                id="submit"
                className={styles.button}
              >
                <span id="button-text">
                  {isLoading ? (
                    <img
                      src={spinnerImg}
                      alt="Loading..."
                      style={{ width: "20px" }}
                    />
                  ) : (
                    "Pay now"
                  )}
                </span>
              </button>
              {/* Show any error or success messages */}
              {message && <div id={styles["payment-message"]}>{message}</div>}
            </Card>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutForm;
