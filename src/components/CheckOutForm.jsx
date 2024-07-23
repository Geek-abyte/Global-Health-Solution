import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      "{clientSecret}",
      {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: "Test User",
          },
        },
      }
    );

    if (error) {
      setError(`Payment failed ${error.message}`);
      setProcessing(false);
    } else {
      setSucceeded(true);
      setError(null);
      setProcessing(false);
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <CardElement />
      <button disabled={processing || succeeded} id="submit">
        {processing ? "Processing..." : "Pay Now"}
      </button>
      {error && <div className="card-error" role="alert">{error}</div>}
      <p className={succeeded ? "result-message" : "result-message hidden"}>
        Payment succeeded
      </p>
    </form>
  );
};

export default CheckoutForm;
