import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import axios from "../utils/axiosConfig"; // Import the configured Axios instance
import Button from "./Button";
import { LoadingSpinner } from "./"; // Import the loading spinner
import { FaEye, FaEyeSlash, FaCloudUploadAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { showToast, showModal, hideModal } from "../states/popUpSlice"; // Import the actions
import OTPModal from "./OTPModal"; // Import OTP Modal

const formInput =
  "border-2 border-primary-5 text-primary-2 rounded-[20px] overflow-hidden p-2 w-full bg-white focus:outline-none focus:border-primary-2";

const sitekey = import.meta.env.VITE_APP_RECAPTCHA_SITE_KEY;
const apiUrl = import.meta.env.VITE_API_URL;

const specialties = [
  "Allergy and Immunology", "Anesthesiology", "Dermatology", "Diagnostic Radiology", 
  "Emergency Medicine", "Family Medicine", "Internal Medicine", "Medical Genetics", 
  "Neurology", "Nuclear Medicine", "Obstetrics and Gynecology", "Ophthalmology", 
  "Pathology", "Pediatrics", "Physical Medicine and Rehabilitation", "Preventive Medicine", 
  "Psychiatry", "Radiation Oncology", "Surgery", "Urology", "Cardiology", 
  "Endocrinology", "Gastroenterology", "Hematology"
];

const SpecialistSignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.popUp.showModal);
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
          dateOfBirth: "",
          gender: "",
          address: "",
          country: "",
          phone: "",
          email: "",
          password: "",
          confirmPassword: "",
          currentPracticingLicense: null,
          fullRegistrationCertificate: null,
          doctorsRegistrationNumber: "",
          speciality: "",
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
          if (!values.doctorsRegistrationNumber) {
            errors.doctorsRegistrationNumber = "* Required";
          }
          if (!values.speciality) {
            errors.speciality = "* Required";
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
          const formData = new FormData();
          for (let key in values) {
            formData.append(key, values[key]);
          }

          axios
            .post(`${apiUrl}/api/users/register`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
            .then((response) => {
              if (response.status === 201) {
                dispatch(
                  showToast({
                    status: "success",
                    message: "Signup successful!",
                  })
                );
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
              dispatch(showToast({ status: "error", message: errorMessage }));
              setStatus({ success: false });
            })
            .finally(() => {
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting, status, setFieldValue }) => (
          <Form className="flex flex-col gap-y-5 justify-center items-center bg-blue-100 p-5 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold text-primary-5 mb-4">Sign Up</h2>
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
                  className="text-red-500 text-sm mt-1"
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
                  className="text-red-500 text-sm mt-1"
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
                  className="text-red-500 text-sm mt-1"
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
                  className="text-red-500 text-sm mt-1"
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
              <ErrorMessage
                name="address"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className={`block w-full`}>
              <Field as="select" name="country" className={formInput}>
                <option value="">Country</option>
                {countries.map((country, index) => (
                  <option key={index} value={country}>{country}</option>
                ))}
              </Field>
              <ErrorMessage
                name="country"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
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
              <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div className={`block w-full`}>
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className={formInput}
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div className={`block w-full relative`}>
              <Field
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className={formInput}
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
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
                className="text-red-500 text-sm mt-1"
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

            {/* New Section for Specialist Registration */}
            <div className="w-full border-t-2 border-gray-300 mt-5 pt-5">
              <h3 className="text-lg font-semibold text-primary-5 mb-3">Upload Documents</h3>
              <p className="text-sm text-gray-600 mb-5">
                Ensure all files uploaded have descriptive file names. Please note: only JPEG, PDF, or DOC files are accepted. Max. file size is 2MB.
              </p>
              <div className="grid grid-cols-1 gap-y-4">
                <div className="block w-full">
                  <label className="block mb-2 text-primary-5 font-semibold">
                    Upload Current Practising License
                  </label>
                  <div className="flex items-center">
                    <Field
                      type="file"
                      name="currentPracticingLicense"
                      accept=".jpg,.jpeg,.pdf,.doc"
                      className={formInput}
                      onChange={(event) => {
                        setFieldValue("currentPracticingLicense", event.currentTarget.files[0]);
                      }}
                    />
                    <FaCloudUploadAlt className="ml-3 text-primary-5" size={24} />
                  </div>
                  <ErrorMessage
                    name="currentPracticingLicense"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="block w-full">
                  <label className="block mb-2 text-primary-5 font-semibold">
                    Upload Full Registration Certificate
                  </label>
                  <div className="flex items-center">
                    <Field
                      type="file"
                      name="fullRegistrationCertificate"
                      accept=".jpg,.jpeg,.pdf,.doc"
                      className={formInput}
                      onChange={(event) => {
                        setFieldValue("fullRegistrationCertificate", event.currentTarget.files[0]);
                      }}
                    />
                    <FaCloudUploadAlt className="ml-3 text-primary-5" size={24} />
                  </div>
                  <ErrorMessage
                    name="fullRegistrationCertificate"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="block w-full">
                  <Field
                    type="text"
                    name="doctorsRegistrationNumber"
                    placeholder="Doctors' Registration Number"
                    className={formInput}
                  />
                  <ErrorMessage
                    name="doctorsRegistrationNumber"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="block w-full">
                  <Field as="select" name="speciality" className={formInput}>
                    <option value="">Speciality</option>
                    {specialties.map((specialty) => (
                      <option key={specialty} value={specialty}>
                        {specialty}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="speciality"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
            </div>

            <ReCAPTCHA
              className="self-start mt-3"
              sitekey={sitekey}
              name="recaptcha"
              onChange={(value) => setFieldValue("recaptcha", value)}
            />
            <ErrorMessage name="recaptcha" component="div" className="text-red-500 text-sm mt-1" />
            <div className="block w-full">
              <label className="flex items-center">
                <Field type="checkbox" name="agreeTerms" className="mr-2" />
                I agree to the terms and conditions
              </label>
              <ErrorMessage
                name="agreeTerms"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="mt-5 w-[60%] bg-primary-5 text-white rounded-lg py-2"
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

export default SpecialistSignUpForm;
