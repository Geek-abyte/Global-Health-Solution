import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../states/popUpSlice";
import { loginUser } from "../states/user/authSlice";
import { LoadingSpinner } from "./";
import { PATH } from "../routes/path";
import axios from 'axios';

const formInput =
  "border-[3px] border-primary-5 text-primary-2 rounded-[20px] overflow-hidden p-2 w-full";

const SignInForm = ({ specialist, client }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, error, loading, user } = useSelector(
    (state) => state.auth
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNavigate = () => {
    if (client) {
      navigate(PATH.dashboard.default);
    } else if (specialist) {
      navigate(PATH.doctor.dashboard);
    }
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
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        if (!values.password) {
          errors.password = "Required";
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        const maxRetries = 3;
        let retryCount = 0;

        const attemptLogin = async () => {
          try {
            setIsSubmitting(true);
            await dispatch(loginUser(values)).unwrap();
          } catch (error) {
            if (error.code === 'ECONNRESET' && retryCount < maxRetries) {
              retryCount++;
              console.log(`Retrying login attempt ${retryCount} of ${maxRetries}`);
              await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
              return attemptLogin();
            }
            throw error;
          }
        };

        try {
          await attemptLogin();
        } catch (error) {
          console.error('Login failed after retries:', error);
          dispatch(showToast({
            status: "error",
            message: "Connection error. Please try again."
          }));
        } finally {
          setIsSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col gap-y-[20px] justify-center items-center w-full">
          <div className={`block w-full flex-1`}>
            {/* <label htmlFor="email">Email</label> */}
            <Field
              type="email"
              name="email"
              placeholder="Email"
              className={`${formInput}`}
            />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <div className={`block w-full flex-1`}>
            {/* <label htmlFor="password">Password</label> */}
            <Field
              type="password"
              name="password"
              placeholder="Password"
              className={`${formInput}`}
            />
            <ErrorMessage name="password" component="div" className="error" />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting || loading}
            className="w-[60%]"
          >
            {isSubmitting || loading ? <LoadingSpinner /> : "Sign In"}
          </Button>
          <div>
            Don't have an account?{" "}
            <Link
              to={client ? PATH.general.signUp : PATH.general.doctorSignUp}
              className="underline text-primary-5"
            >
              Sign Up
            </Link>
          </div>
          <div>
            Forgot your password?{" "}
            <Link to="#" className="underline text-primary-5">
              Click here
            </Link>
            .
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SignInForm;
