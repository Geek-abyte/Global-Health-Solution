import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import axios from "../utils/axiosConfig"; // Import the configured Axios instance
import Button from "./Button";
import { LoadingSpinner } from "./"; // Import the loading spinner
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { showToast, showModal, hideModal } from "../states/popUpSlice"; // Import the actions
import OTPModal from "./OTPModal"; // Import OTP Modal
import { countries } from "../utils/constants";
import axiosInstance from "../utils/axiosConfig";

const formInput =
  "border-[3px] border-primary-5 text-primary-2 rounded-[20px] overflow-hidden p-2 w-full";
const sitekey = import.meta.env.VITE_APP_RECAPTCHA_SITE_KEY;
const apiUrl = import.meta.env.VITE_API_URL;

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.popUp.showModal);
  const [userValues, setUserValues] = useState();
  const { isAuthenticated, error, isLoading, user } = useSelector(
    (state) => state.auth
  );

  const handleOpenModal = (values) => {
    setUserValues(values);
    dispatch(showModal({ content: "OTP verification" }));
  };

  const handleCloseModal = () => {
    dispatch(hideModal());
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      dispatch(showToast({ status: "success", message: "Login successful!" }));
      setIsSubmitting(false);
      handleNavigate();
    }
    if (error) {
      // Parse the HTML error message
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = error;
      const fullErrorMessage = tempDiv.querySelector("pre").textContent;

      // Extract only the relevant part of the error message
      const errorMessage = fullErrorMessage
        .split(" at ")[0]
        .replace("Error: ", "")
        .trim();

      // Dispatch the showToast action with the extracted message
      dispatch(showToast({ status: "error", message: errorMessage }));

      console.log("this new error", errorMessage);
    }
  }, [isAuthenticated, error, dispatch, user]);

  return (
    <>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          dateOfBirth: "",
          gender: "",
          address: "",
          country: "",
          phone: "",
          email: "",
          password: "",
          confirmPassword: "",
          agreeTerms: false,
          recaptcha: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.firstName) {
            errors.firstName = "* Required";
          }
          if (!values.lastName) {
            errors.lastName = "* Required";
          }
          if (!values.dateOfBirth) {
            errors.dateOfBirth = "* Required";
          }
          if (!values.gender) {
            errors.gender = "* Required";
          }
          if (!values.address) {
            errors.address = "* Required";
          }
          if (!values.country) {
            errors.country = "* Required";
          }
          if (!values.phone) {
            errors.phone = "* Required";
          }
          if (!values.email) {
            errors.email = "* Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "* Invalid email address";
          }
          if (!values.password) {
            errors.password = "* Required";
          }
          if (!values.confirmPassword) {
            errors.confirmPassword = "* Required";
          } else if (values.confirmPassword !== values.password) {
            errors.confirmPassword = "* Passwords do not match";
          }
          if (!values.agreeTerms) {
            errors.agreeTerms = "* You must agree to the terms and conditions";
          }
          if (!values.recaptcha) {
            errors.recaptcha = "* Please verify that you are not a robot";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting, setStatus }) => {
          axiosInstance
            .post(`${apiUrl}/api/users/register`, {...values, role: "user"})
            .then((response) => {
              if (response.status === 201) {
                // Check if response status is 201 Created
                dispatch(
                  showToast({
                    status: "success",
                    message: "Signup successful!",
                  })
                );
                setStatus({ success: true });
                handleOpenModal(values);
              } else {
                throw new Error("Unexpected response status");
              }
            })
            .catch((error) => {
              let errorMessage = "Signup failed. Please try again.";
              if (error.response) {
                if (
                  error.response?.data?.includes("reCAPTCHA validation failed")
                ) {
                  errorMessage =
                    "reCAPTCHA validation failed. Please try again.";
                } else if (
                  error.response?.data?.includes("User already exists")
                ) {
                  errorMessage = "User already exists.";
                }
              }
              dispatch(showToast({ status: "error", message: errorMessage }));
              setStatus({ success: false });
            })
            .finally(() => {
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting, status, setFieldValue }) => (
          <Form className="flex flex-col gap-y-[20px] justify-center items-center">
            <div className="flex flex-row justify-between gap-x-5 w-full">
              <div className={`block w-full flex-1`}>
                <Field
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className={formInput}
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="error"
                />
              </div>
              <div className={`block w-full flex-1`}>
                <Field
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className={formInput}
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="error"
                />
              </div>
            </div>
            <div className="flex flex-row justify-between gap-x-5 w-full">
              <div className={`block w-full flex-1`}>
                <Field
                  type="date"
                  name="dateOfBirth"
                  placeholder="Date of Birth"
                  className={formInput}
                />
                <ErrorMessage
                  name="dateOfBirth"
                  component="div"
                  className="error"
                />
              </div>
              <div className={`block w-full flex-1`}>
                <Field as="select" name="gender" className={formInput}>
                  <option value="">Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Field>
                <ErrorMessage
                  name="gender"
                  component="div"
                  className="error"
                />
              </div>
            </div>
            <div className={`block w-full`}>
              <Field
                type="text"
                name="address"
                placeholder="Address"
                className={formInput}
              />
              <ErrorMessage name="address" component="div" className="error" />
            </div>
            <div className={`block w-full`}>
              <Field as="select" name="country" className={formInput}>
                <option value="">Country</option>
                {countries.map((country, index) => (
                  <option key={index} value={country}>{country}</option>
                ))}
              </Field>
              <ErrorMessage name="country" component="div" className="error" />
            </div>
            <div className="block w-full">
              <PhoneInput
                country={'us'}
                placeholder="Phone Number"
                value=""
                onChange={phone => setFieldValue('phone', phone)}
                inputClass="custom-phone-input"
                containerClass="custom-phone-container"
                inputStyle={{
                  width: '100%',
                  height: '40px',
                  borderRadius: '20px',
                  border: '3px solid #4478c7',
                }}
                buttonStyle={{
                  borderRadius: '20px 0 0 20px',
                  border: '3px solid #4478c7',
                }}
              />
              <ErrorMessage name="phone" component="div" className="error" />
            </div>
            <div className={`block w-full`}>
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className={formInput}
              />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div className={`block w-full relative`}>
              <Field
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className={formInput}
              />
              <ErrorMessage name="password" component="div" className="error" />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="focus:outline-none"
                >
                  {showPassword ? (
                    <FaEyeSlash color="#20655b" />
                  ) : (
                    <FaEye color="#194e9d" />
                  )}
                </button>
              </div>
            </div>
            <div className={`block w-full relative`}>
              <Field
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                className={formInput}
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="error"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="focus:outline-none"
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash color="#20655b" />
                  ) : (
                    <FaEye color="#194e9d" />
                  )}
                </button>
              </div>
            </div>
            <div className="block w-full flex justify-start items-center">
              <Field
                type="checkbox"
                name="agreeTerms"
                className="mr-2"
              />
              <label htmlFor="agreeTerms" className="text-primary-2">
                I agree to the <Link to="/terms" className="text-primary-5 underline">Terms and Conditions</Link>
              </label>
              <ErrorMessage
                name="agreeTerms"
                component="div"
                className="error"
              />
            </div>
            <div className="w-full flex justify-center items-center">
              <ReCAPTCHA
                sitekey={sitekey}
                onChange={(value) => setFieldValue("recaptcha", value)}
              />
              <ErrorMessage
                name="recaptcha"
                component="div"
                className="error"
              />
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <LoadingSpinner /> : "Sign Up"}
            </Button>
            {isModalOpen && (
              <OTPModal isOpen userInfo={userValues} email={userValues.email} onClose={handleCloseModal} />
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SignUpForm;
