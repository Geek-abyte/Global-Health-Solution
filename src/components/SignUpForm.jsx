import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "../utils/axiosConfig"; // Import the configured Axios instance
import Button from "./Button";
import { LoadingSpinner } from "./"; // Import the loading spinner
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { showToast, showModal, hideModal } from "../states/popUpSlice"; // Import the actions
import OTPModal from "./OTPModal"; // Import OTP Modal

const formInput =
  "border-[3px] border-primary-5 text-primary-2 rounded-[20px] overflow-hidden p-2 w-full";
const sitekey = import.meta.env.VITE_APP_RECAPTCHA_SITE_KEY;
const apiUrl = import.meta.env.VITE_API_URL;

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  // const isModalOpen = useSelector((state) => state.popUp.showModal);
  const isModalOpen = true;
  const [userEmail, setUserEmail] = useState("");

  const handleOpenModal = (email) => {
    setUserEmail(email);
    dispatch(showModal({ content: "OTP verification" }));
  };

  const handleCloseModal = () => {
    dispatch(hideModal());
  };

  return (
    <>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          password: "",
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
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "* Invalid email address";
          }
          if (!values.phone) {
            errors.phone = "* Required";
          }
          if (!values.password) {
            errors.password = "* Required";
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
          axios
            .post(`${apiUrl}/api/users/register`, values)
            .then((response) => {
              if (response.status === 201) {
                // Check if response status is 201 Created
                dispatch(showToast({ message: "Signup successful!" }));
                setStatus({ success: true });
                handleOpenModal(values.email);
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
              dispatch(showToast({ message: errorMessage }));
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
            <div className={`block w-full`}>
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className={formInput}
              />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div className={`block w-full`}>
              <Field
                type="text"
                name="phone"
                placeholder="Phone"
                className={formInput}
              />
              <ErrorMessage name="phone" component="div" className="error" />
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
            <ReCAPTCHA
              className="self-start"
              sitekey={sitekey}
              name="recaptcha"
              onChange={(value) => setFieldValue("recaptcha", value)}
            />
            <ErrorMessage name="recaptcha" component="div" className="error" />
            <div className={`block w-full`}>
              <label>
                <Field type="checkbox" name="agreeTerms" className="mr-2" />I
                agree to the terms and conditions
              </label>
              <ErrorMessage
                name="agreeTerms"
                component="div"
                className="error"
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="mt-5 w-[60%]"
            >
              {isSubmitting ? <LoadingSpinner /> : "Sign Up"}
            </Button>
            {status && (
              <div
                className={`mt-3 ${
                  status.success ? "text-green-500" : "text-red-500"
                }`}
              >
                {status.message}
              </div>
            )}
            <div>
              Already have an account?{" "}
              <Link to="#" className="underline text-primary-5">
                Sign in
              </Link>
            </div>
          </Form>
        )}
      </Formik>
      {isModalOpen && (
        <OTPModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          email={userEmail}
        />
      )}
    </>
  );
};

export default SignUpForm;
