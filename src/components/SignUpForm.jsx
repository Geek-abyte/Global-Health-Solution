import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Button from './Button';
import { Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

const formInput = "border-[3px] border-primary-5 text-primary-2 rounded-[20px] overflow-hidden p-2 w-full"

const SignUpForm = () => (
  <Formik
    initialValues={{
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      agreeTerms: false,
      recaptcha: '',
    }}
    validate={values => {
      const errors = {};
      if (!values.firstName) {
        errors.firstName = '* Required';
      }
      if (!values.lastName) {
        errors.lastName = '* Required';
      }
      if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = '* Invalid email address';
      }
      if (!values.phone) {
        errors.phone = '* Required';
      }
      if (!values.password) {
        errors.password = '* Required';
      }
      if (!values.agreeTerms) {
        errors.agreeTerms = '* You must agree to the terms and conditions';
      }
      if (!values.recaptcha) {
        errors.recaptcha = '* Please verify that you are not a robot';
      }
      return errors;
    }}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 400);
    }}
  >
    {({ isSubmitting }) => (
      <Form className='flex flex-col gap-y-[20px] justify-center items-center'>
        <div className='flex flex-row justify-between gap-x-5 w-full'>
          <div className={`block w-full flex-1`}>
            {/* <label htmlFor="firstName">First Name</label> */}
            <Field type="text" name="firstName" placeholder="First Name" className={`${formInput}`}/>
            <ErrorMessage name="firstName" component="div" className="error" />
          </div>
          <div className={`block w-full flex-1`}>
            {/* <label htmlFor="lastName">Last Name</label> */}
            <Field type="text" name="lastName" placeholder="Last Name" className={`${formInput}`}/>
            <ErrorMessage name="lastName" component="div" className="error" />
          </div>
        </div>
        <div className={`block w-full`}>
          {/* <label htmlFor="email">Email</label> */}
          <Field type="email" name="email" placeholder="Email" className={`${formInput}`}/>
          <ErrorMessage name="email" component="div" className="error" />
        </div>
        <div className={`block w-full`}>
          {/* <label htmlFor="phone">Phone</label> */}
          <Field type="text" name="phone" placeholder="Phone" className={`${formInput}`}/>
          <ErrorMessage name="phone" component="div" className="error" />
        </div>
        <div className={`block w-full`}>
          {/* <label htmlFor="password">Password</label> */}
          <Field type="password" name="password" placeholder="Password" className={`${formInput}`}/>
          <ErrorMessage name="password" component="div" className="error" />
        </div>
        <ReCAPTCHA
          className='self-start'
          sitekey="6LcOqaopAAAAAJPFliqy4uWtTPkTAB4VhqqQUprB"
          name="recaptcha"
          onChange={(value) => {
            setFieldValue("recaptcha", value);
          }}
        />
        <ErrorMessage name="recaptcha" component="div" className="error" />
        <div className={`block w-full`}>
          <label>
            <Field type="checkbox" name="agreeTerms" className="mr-2"/>
            I agree to the terms and conditions
          </label>
          <ErrorMessage name="agreeTerms" component="div" className="error" />
        </div>
        <Button type="submit" disabled={isSubmitting}  className="mt-5 w-[60%]">
          Sign Up
        </Button>
        <div className='flex flex-row justify-between gap-x-5 mt-5'>
          <Button type="button">Sign in with Google</Button>
          <Button type="button">Sign in with Facebook</Button>
        </div>
        <div>
          Already have an account? <Link to="#" className='underline text-primary-5'>Sign in</Link>
        </div>
      </Form>
    )}
  </Formik>
);

export default SignUpForm;
