import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { IoCloseOutline } from "react-icons/io5";
import axiosInstance from "../utils/axiosConfig";
import { toSmallestUnit } from "../utils/helperFunctions";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { initiateCall } from '../states/videoCallSlice';
import { PATH } from '../routes/path';

const CheckoutModal = ({ closeModal, amount, currency = 'USD', specialist }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { currentCall } = useSelector((state) => state.videoCall);

  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [callStatus, setCallStatus] = useState("idle"); // New state for call status

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        const numericAmount = Number(amount);
        if (isNaN(numericAmount) || numericAmount <= 0) {
          throw new Error('Invalid amount');
        }
        const amountInSmallestUnit = toSmallestUnit(numericAmount, currency);
        const response = await axiosInstance.post(
          "/payment/create-payment-intent",
          { amount: amountInSmallestUnit, currency }
        );
        setClientSecret(response.data.clientSecret);
      } catch (err) {
        console.error("Error fetching payment intent:", err.message);
        setError("Failed to initialize payment. Please try again.");
      }
    };

    if (amount) {
      fetchPaymentIntent();
    }
  }, [amount, currency]);

  useEffect(() => {
    if (currentCall && currentCall.status === 'accepted') {
      console.log("Navigating to call setup page");
      navigate(`${PATH.chat.setup}/${currentCall.callId}`);
    }
  }, [currentCall, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: name,
          email: email,
        },
      },
    });

    if (payload.error) {
      setError(`Payment failed: ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setSucceeded(true);
      setProcessing(false);

      // Initiate call
      setCallStatus("initiating");

      try {
        await dispatch(initiateCall({
          userId: user._id,
          specialistId: specialist._id,
          specialistCategory: specialist.specialistCategory
        })).unwrap();
        setCallStatus("waiting");
      } catch (err) {
        console.error('Failed to initiate call:', err);
        setError('Payment successful, but failed to initiate call. Please try again.');
        setCallStatus("error");
      }
    }
  };

  // Helper function to format the amount
  const formatAmount = (value) => {
    if (typeof value !== 'number') return Number(value).toFixed(2)
    return value.toFixed(2);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        {callStatus === "idle" || callStatus === "error" ? (
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Checkout</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <IoCloseOutline size={24} />
              </button>
            </div>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="card-element" className="block text-sm font-medium text-gray-700">Credit or debit card</label>
              <div className="mt-1">
                <CardElement
                  id="card-element"
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                          color: '#aab7c4',
                        },
                      },
                      invalid: {
                        color: '#9e2146',
                      },
                    },
                  }}
                />
              </div>
            </div>
            <div className="mb-4">
              <p className="text-lg font-semibold">Total: {formatAmount(amount)} {currency}</p>
            </div>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <button
              type="submit"
              disabled={processing || !stripe}
              className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-md ${processing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'}`}
            >
              {processing ? 'Processing...' : `Pay ${formatAmount(amount)} ${currency}`}
            </button>
          </form>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              {callStatus === "initiating" ? "Initiating Call..." : "Waiting for Specialist..."}
            </h2>
            <p className="mb-4">
              {callStatus === "initiating"
                ? "We're setting up your call. This may take a moment."
                : "We've notified the specialist. Please wait while they accept the call."}
            </p>
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 mx-auto"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;
