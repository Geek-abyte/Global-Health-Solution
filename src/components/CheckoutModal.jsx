import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { IoCloseOutline } from "react-icons/io5";
import axiosInstance from "../utils/axiosConfig";
import { toSmallestUnit } from "../utils/helperFunctions";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { initiateCall } from '../states/videoCallSlice';
import { PATH } from '../routes/path';

const CheckoutModal = ({ amount, currency = 'USD', closeModal, onSuccess }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentSpecialistCategory } = useSelector((state) => state.videoCall);
  const { user } = useSelector((state) => state.auth);

  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        const numericAmount = Number(amount);
        if (isNaN(numericAmount)) {
          throw new Error('Invalid amount');
        }
        const amountInSmallestUnit = toSmallestUnit(numericAmount, currency);
        const response = await axiosInstance.post(
          "/payment/create-payment-intent",
          { amount: amountInSmallestUnit, currency }
        );
        setClientSecret(response.data.clientSecret);
      } catch (err) {
        console.error("Error fetching payment intent:", err.response?.data || err.message);
        setError("Failed to initialize payment. Please try again.");
      }
    };

    fetchPaymentIntent();
  }, [amount, currency]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: { name, email },
      },
    });

    if (result.error) {
      setError(`Payment failed: ${result.error.message}`);
      setProcessing(false);
    } else {
      setSucceeded(true);
      setError(null);
      setProcessing(false);
      onSuccess && onSuccess(result.paymentIntent);

      // Initiate call and navigate to chatroom
      try {
        const callResult = await dispatch(initiateCall({
          userId: user._id,
          specialistCategory: currentSpecialistCategory
        })).unwrap();
        navigate(`${PATH.chat.default}${callResult.data.callId}`);
      } catch (err) {
        console.error('Failed to initiate call:', err);
        setError('Payment successful, but failed to initiate call. Please try again.');
      }
    }
  };

  // Helper function to format the amount
  const formatAmount = (value) => {
    if (typeof value !== 'number') return Number(value).toFixed(2)
    return value.toFixed(2);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Checkout</h2>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-gray-600 transition duration-300"
          >
            <IoCloseOutline size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="card-element"
              className="block text-sm font-medium text-gray-700"
            >
              Credit or debit card
            </label>
            <div className="mt-1 bg-gray-50 p-3 border border-gray-300 rounded-md">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#424770",
                      "::placeholder": {
                        color: "#aab7c4",
                      },
                    },
                    invalid: {
                      color: "#9e2146",
                    },
                  },
                }}
              />
            </div>
          </div>
          <div className="text-right">
            <span className="text-lg font-semibold text-gray-700">
              Total: {currency} {formatAmount(amount)}
            </span>
          </div>
          <button
            type="submit"
            disabled={!stripe || processing || succeeded}
            className={`w-full py-2 px-4 rounded-md text-white font-semibold transition duration-300 ${!stripe || processing || succeeded
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {processing ? "Processing..." : `Pay ${currency} ${formatAmount(amount)}`}
          </button>
        </form>
        {error && (
          <div
            className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        {succeeded && (
          <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
            <strong className="font-bold">Success! </strong>
            <span className="block sm-inline">
              Your payment was processed successfully.
            </span>
            <button
              onClick={closeModal}
              className="mt-2 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;
