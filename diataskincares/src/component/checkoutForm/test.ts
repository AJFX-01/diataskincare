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

interface CheckoutFormProps {

}
function CheckForm(props: CheckoutFormProps) {
  const stripe = useStripe();
  const element = useElements();
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    if(!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }
  }, [stripe]);

  const saveOrder = () => {
    console.log('Order saved');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);


    if(!stripe || !elements ) {
      return;
    }

    setIsLoading(true);

    const confirmPayment = await stripe.confirmPayment({
      elements,
      confirmParams:{ 
        return_url: 'http://localhost:3000/checkout-success',
      },
      redirect: 'if_required',
    })
    .then((result) => {
      if (result.error ) {
        toast.error(result.error.message);
        setMessage(result.error.message);
      }

      if (result.paymentIntent) {
        if (result.paymentIntent.status === 'succeeded') {
          setIsLoading(false);
          toast.success('Payment Successful');
          saveOrder();
        }
      }
    });

     // ======== this is stripe being specific, we just handled it above =============
    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    // if (error.type === "card_error" || error.type === "validation_error") {
    //   setMessage(error.message);
    // } else {
    //   setMessage('An unexpected error occurred.');
    // }
    
    setIsLoading(false);
  }
}