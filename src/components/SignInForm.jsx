import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Button from "./Button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../states/popUpSlice";
import { loginUser } from "../states/user/authSlice";
import { LoadingSpinner } from "./";

const formInput =
  "border-[3px] border-primary-5 text-primary-2 rounded-[20px] overflow-hidden p-2 w-full";

const SignInForm = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, error, isLoading } = useSelector(
    (state) => state.auth
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(showToast({ status: "success", message: "Login successful!" }));
      console.log("this is it", isAuthenticated);
    }
    if (error) {
      // Parse the HTML error message
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = error;
      const fullErrorMessage = tempDiv.querySelector('pre').textContent;
      
      // Extract only the relevant part of the error message
      const errorMessage = fullErrorMessage.split(' at ')[0].replace('Error: ', '').trim();

      // Dispatch the showToast action with the extracted message
      dispatch(showToast({ status: "error", message: errorMessage }));

      console.log("this new error", errorMessage);
    }
  }, [isAuthenticated, error, dispatch]);

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
      onSubmit={(values, { setSubmitting }) => {
        setIsSubmitting(true);
        dispatch(loginUser(values)).then(() => {
          setSubmitting(false);
          setIsSubmitting(false);
        });
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
            disabled={isSubmitting || isLoading}
            className="w-[60%]"
          >
            {isSubmitting || isLoading ? <LoadingSpinner /> : "Sign In"}
          </Button>
          <div>
            Don't have an account?{" "}
            <Link to="#" className="underline text-primary-5">
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
