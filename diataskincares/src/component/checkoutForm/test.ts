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
    
    setIsLoading(false);
  }
}