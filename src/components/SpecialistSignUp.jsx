import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axiosInstance from "../utils/axiosConfig";
import Button from "./Button";
import { LoadingSpinner } from "./";
import {
  FaEye,
  FaEyeSlash,
  FaCloudUploadAlt,
  FaUser,
  FaEnvelope,
  FaLock,
  FaCalendarAlt,
  FaVenusMars,
  FaMapMarkerAlt,
  FaGlobe,
  FaPhone,
  FaIdCard,
  FaUserMd,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { showToast, showModal, hideModal } from "../states/popUpSlice";
import OTPModal from "./OTPModal";
import { countries } from "../utils/constants";
import { specialties } from "../data/speciality";
import { PATH } from "../routes/path";

const formInput =
  "border border-gray-300 text-gray-900 rounded-lg p-3 w-full bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition duration-200";
const formLabel = "block mb-2 text-sm font-semibold text-gray-700";
const formError = "text-red-500 text-xs mt-1";

const sitekey = import.meta.env.VITE_APP_RECAPTCHA_SITE_KEY;
const apiUrl = import.meta.env.VITE_API_URL;

const SpecialistSignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.popUp.showModal);
  const [uploadedLicense, setUploadedLicense] = useState(null);
  const [uploadedCertificate, setUploadedCertificate] = useState(null);
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
    <div className="min-h-screen bg-primary-7 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Specialist Registration
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join our network of healthcare professionals
          </p>
        </div>
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
            doctorsRegistrationNumber: "",
            specialistCategory: "",
            agreeTerms: false,
            recaptcha: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.firstName) errors.firstName = "Required";
            if (!values.lastName) errors.lastName = "Required";
            if (!values.dateOfBirth) errors.dateOfBirth = "Required";
            if (!values.gender) errors.gender = "Required";
            if (!values.address) errors.address = "Required";
            if (!values.country) errors.country = "Required";
            if (!values.phone) errors.phone = "Required";
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            if (!values.password) {
              errors.password = "Required";
            } else if (values.password.length < 8) {
              errors.password = "Password must be at least 8 characters";
            }
            if (!values.confirmPassword) {
              errors.confirmPassword = "Required";
            } else if (values.confirmPassword !== values.password) {
              errors.confirmPassword = "Passwords must match";
            }
            if (!values.currentPracticingLicense)
              errors.currentPracticingLicense = "Required";
            if (!values.doctorsRegistrationNumber)
              errors.doctorsRegistrationNumber = "Required";
            if (!values.specialistCategory)
              errors.specialistCategory = "Required";
            if (!values.agreeTerms)
              errors.agreeTerms = "You must agree to the terms and conditions";
            if (!values.recaptcha)
              errors.recaptcha = "Please complete the reCAPTCHA";
            return errors;
          }}
          onSubmit={(values, { setSubmitting, setStatus }) => {
            const formData = new FormData();

            // Append all text fields
            Object.keys(values).forEach((key) => {
              if (key !== "currentPracticingLicense") {
                formData.append(key, values[key]);
              }
            });

            // Append files
            if (values.currentPracticingLicense) {
              formData.append(
                "currentPracticingLicense",
                values.currentPracticingLicense
              );
            }

            // Append role
            formData.append("role", "specialist");

            axiosInstance
              .post(`${apiUrl}/api/users/register`, formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
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
                  handleOpenModal(values);
                } else {
                  throw new Error("Unexpected response status");
                }
              })
              .catch((error) => {
                let errorMessage = "Signup failed. Please try again.";
                if (error.response) {
                  if (
                    error.response?.data?.includes(
                      "reCAPTCHA validation failed"
                    )
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
            <Form className="mt-8 space-y-6">
              <div className="grid grid-cols-1 gap-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Personal Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="firstName" className={formLabel}>
                        First Name
                      </label>
                      <div className="relative">
                        <Field
                          type="text"
                          name="firstName"
                          id="firstName"
                          className={`${formInput} pl-10`}
                          placeholder="John"
                        />
                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                      <ErrorMessage
                        name="firstName"
                        component="div"
                        className={formError}
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className={formLabel}>
                        Last Name
                      </label>
                      <div className="relative">
                        <Field
                          type="text"
                          name="lastName"
                          id="lastName"
                          className={`${formInput} pl-10`}
                          placeholder="Doe"
                        />
                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                      <ErrorMessage
                        name="lastName"
                        component="div"
                        className={formError}
                      />
                    </div>
                    <div>
                      <label htmlFor="dateOfBirth" className={formLabel}>
                        Date of Birth
                      </label>
                      <div className="relative">
                        <Field
                          type="date"
                          name="dateOfBirth"
                          id="dateOfBirth"
                          className={`${formInput} pl-10`}
                        />
                        <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                      <ErrorMessage
                        name="dateOfBirth"
                        component="div"
                        className={formError}
                      />
                    </div>
                    <div>
                      <label htmlFor="gender" className={formLabel}>
                        Gender
                      </label>
                      <div className="relative">
                        <Field
                          as="select"
                          name="gender"
                          id="gender"
                          className={`${formInput} pl-10`}
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </Field>
                        <FaVenusMars className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                      <ErrorMessage
                        name="gender"
                        component="div"
                        className={formError}
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="address" className={formLabel}>
                        Address
                      </label>
                      <div className="relative">
                        <Field
                          type="text"
                          name="address"
                          id="address"
                          className={`${formInput} pl-10`}
                          placeholder="1234 Main St, City, State, ZIP"
                        />
                        <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                      <ErrorMessage
                        name="address"
                        component="div"
                        className={formError}
                      />
                    </div>
                    <div>
                      <label htmlFor="country" className={formLabel}>
                        Country
                      </label>
                      <div className="relative">
                        <Field
                          as="select"
                          name="country"
                          id="country"
                          className={`${formInput} pl-10`}
                        >
                          <option value="">Select Country</option>
                          {countries.map((country, index) => (
                            <option key={index} value={country}>
                              {country}
                            </option>
                          ))}
                        </Field>
                        <FaGlobe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                      <ErrorMessage
                        name="country"
                        component="div"
                        className={formError}
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className={formLabel}>
                        Phone Number
                      </label>
                      <PhoneInput
                        country={"us"}
                        inputProps={{
                          name: "phone",
                          id: "phone",
                          placeholder: "Enter phone number",
                        }}
                        containerClass="phone-input-container"
                        inputClass={`${formInput} pl-14`}
                        buttonClass="phone-input-button"
                        onChange={(phone) => setFieldValue("phone", phone)}
                      />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className={formError}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className={formLabel}>
                        Email
                      </label>
                      <div className="relative">
                        <Field
                          type="email"
                          name="email"
                          id="email"
                          className={`${formInput} pl-10`}
                          placeholder="johndoe@example.com"
                        />
                        <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                      <ErrorMessage
                        name="email"
                        component="div"
                        className={formError}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Password Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Security
                </h3>
                <div>
                  <label htmlFor="password" className={formLabel}>
                    Password
                  </label>
                  <div className="relative">
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      className={`${formInput} pl-10 pr-10`}
                      placeholder="••••••••"
                    />
                    <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none"
                    >
                      {showPassword ? (
                        <FaEyeSlash className="text-gray-400" />
                      ) : (
                        <FaEye className="text-gray-400" />
                      )}
                    </button>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className={formError}
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className={formLabel}>
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Field
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      id="confirmPassword"
                      className={`${formInput} pl-10 pr-10`}
                      placeholder="••••••••"
                    />
                    <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none"
                    >
                      {showConfirmPassword ? (
                        <FaEyeSlash className="text-gray-400" />
                      ) : (
                        <FaEye className="text-gray-400" />
                      )}
                    </button>
                  </div>
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className={formError}
                  />
                </div>
              </div>

              {/* Professional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Professional Information
                </h3>
                <div>
                  <label
                    htmlFor="currentPracticingLicense"
                    className={formLabel}
                  >
                    Current Practising License
                  </label>
                  <div className="flex items-center">
                    <input
                      type="file"
                      name="currentPracticingLicense"
                      id="currentPracticingLicense"
                      accept=".jpg,.jpeg,.pdf,.doc"
                      className="hidden"
                      onChange={(event) => {
                        const file = event.currentTarget.files[0];
                        setFieldValue("currentPracticingLicense", file);
                        setUploadedLicense(file);
                      }}
                    />
                    <label
                      htmlFor="currentPracticingLicense"
                      className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer transition duration-150 ease-in-out"
                    >
                      <FaCloudUploadAlt className="mr-2" />
                      {uploadedLicense
                        ? uploadedLicense.name
                        : "Upload License"}
                    </label>
                  </div>
                  {uploadedLicense && (
                    <p className="mt-2 text-sm text-green-600">
                      File uploaded: {uploadedLicense.name}
                    </p>
                  )}
                  <ErrorMessage
                    name="currentPracticingLicense"
                    component="div"
                    className={formError}
                  />
                </div>
                <div>
                  <label
                    htmlFor="doctorsRegistrationNumber"
                    className={formLabel}
                  >
                    Doctor's Registration Number
                  </label>
                  <div className="relative">
                    <Field
                      type="text"
                      name="doctorsRegistrationNumber"
                      id="doctorsRegistrationNumber"
                      className={`${formInput} pl-10`}
                      placeholder="Enter registration number"
                    />
                    <FaIdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                  <ErrorMessage
                    name="doctorsRegistrationNumber"
                    component="div"
                    className={formError}
                  />
                </div>
                <div>
                  <label htmlFor="specialistCategory" className={formLabel}>
                    Speciality
                  </label>
                  <div className="relative">
                    <Field
                      as="select"
                      name="specialistCategory"
                      id="specialistCategory"
                      className={`${formInput} pl-10`}
                    >
                      <option value="">Select Speciality</option>
                      {specialties.map((speciality, index) => (
                        <option key={index} value={speciality}>
                          {speciality}
                        </option>
                      ))}
                    </Field>
                    <FaUserMd className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                  <ErrorMessage
                    name="specialistCategory"
                    component="div"
                    className={formError}
                  />
                </div>
              </div>

              <div className="flex items-center">
                <Field
                  type="checkbox"
                  name="agreeTerms"
                  id="agreeTerms"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="agreeTerms"
                  className="ml-2 block text-sm text-gray-900"
                >
                  I agree to the{" "}
                  <Link
                    to={PATH.general.consultantTerms}
                    className="text-primary-600 hover:text-primary-700 underline font-medium"
                  >
                    Terms and Conditions
                  </Link>
                </label>
              </div>
              <ErrorMessage
                name="agreeTerms"
                component="div"
                className={formError}
              />

              <div className="flex justify-center">
                <ReCAPTCHA
                  sitekey={sitekey}
                  onChange={(value) => setFieldValue("recaptcha", value)}
                />
              </div>
              <ErrorMessage
                name="recaptcha"
                component="div"
                className={formError}
              />

              <div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={"m-auto w-full"}
                >
                  {isSubmitting ? <LoadingSpinner /> : "Sign Up"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>

        <div className="text-sm text-center">
          Already have an account?{" "}
          <Link
            to={PATH.general.specialistSignIn}
            className="font-medium text-primary-600 hover:text-primary-500"
          >
            Log in
          </Link>
        </div>
      </div>

      {isModalOpen && (
        <OTPModal
          isOpen
          userInfo={userValues}
          email={userValues.email}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default SpecialistSignUpForm;
