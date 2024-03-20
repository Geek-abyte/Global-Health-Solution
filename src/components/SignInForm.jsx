import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Button from './Button';
import { Link } from 'react-router-dom';

const formInput = "border-[3px] border-primary-5 text-primary-2 rounded-[20px] overflow-hidden p-2 w-full"

const SignInForm = () => (
  <Formik
    initialValues={{
      email: '',
      password: '',
    }}
    validate={values => {
      const errors = {};
      if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
      if (!values.password) {
        errors.password = 'Required';
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
      <Form className='flex flex-col gap-y-[20px] justify-center items-center w-full'>
        <div className={`block w-full flex-1`}>
          {/* <label htmlFor="email">Email</label> */}
          <Field type="email" name="email" placeholder="Email"  className={`${formInput}`}/>
          <ErrorMessage name="email" component="div" className="error"/>
        </div>
        <div className={`block w-full flex-1`}>
          {/* <label htmlFor="password">Password</label> */}
          <Field type="password" name="password" placeholder="Password" className={`${formInput}`}/>
          <ErrorMessage name="password" component="div" className="error" />
        </div>
        <Button type="submit" disabled={isSubmitting} className="w-[60%]">
          Sign In
        </Button>
        <div>
          Don't have an account? <Link to="#" className='underline text-primary-5'>Sign Up</Link>
        </div>
        <div>
          Forgot your password? <Link to="#" className='underline text-primary-5'>Click here</Link>.
        </div>
      </Form>
    )}
  </Formik>
);

export default SignInForm;
