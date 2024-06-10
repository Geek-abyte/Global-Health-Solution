import React, { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { logoWhite } from "../assets";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { PATH } from "../routes/path";
import Button from "./Button";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../states/user/authSlice';

const Navbar = ({ className }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [navMode, setNavMode] = useState("full");
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (location.pathname.includes("auth")) {
      setNavMode("none");
    } else {
      setNavMode("full");
    }
  }, [location.pathname]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <div className={`bg-white shadow-sm ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to={PATH.general.home} className="flex-shrink-0">
              <img className="h-10" src={logoWhite} alt="Logo" />
            </Link>
          </div>
          {navMode !== "none" && (
            <>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link
                    to={PATH.general.home}
                    className="text-primary-6 hover:bg-primary-5 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Home
                  </Link>
                  <Link
                    to={PATH.general.doctors}
                    className="text-primary-6 hover:bg-primary-5 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Doctors
                  </Link>
                  <Link
                    to={PATH.general.about}
                    className="text-primary-6 hover:bg-primary-5 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    About
                  </Link>
                  {user ? (
                    <div className="flex items-center space-x-3">
                      <img
                        className="h-8 w-8 rounded-full object-cover"
                        src={user.photoURL}
                        alt="User"
                      />
                      <span className="text-primary-6 px-3 py-2 rounded-md text-sm font-medium">
                        {user.firstName}
                      </span>
                    </div>
                  ) : (
                    <>
                      <Button
                        background="bg-transparent"
                        textColor="text-primary-6"
                        borderRadius="rounded-full"
                        border="border-2 border-primary-6"
                        onClick={() => navigate(PATH.general.signIn)}
                      >
                        Log In
                      </Button>
                      <Button
                        background="bg-primary-6"
                        textColor="text-white"
                        borderRadius="rounded-full"
                        onClick={() => navigate(PATH.general.signUp)}
                      >
                        Sign Up
                      </Button>
                    </>
                  )}
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-primary-5 focus:outline-none focus:text-white"
                >
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {navMode !== "none" && (
        <Transition
          show={isOpen}
          enter="transition-opacity duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center justify-center">
              <Link
                to={PATH.general.home}
                className="text-gray-300 text-center hover:bg-primary-5 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Home
              </Link>
              <Link
                to={PATH.general.doctors}
                className="text-gray-300 text-center hover:bg-primary-5 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Our Doctors
              </Link>
              <Link
                to={PATH.general.about}
                className="text-gray-300 text-center hover:bg-primary-5 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                About
              </Link>
              {user ? (
                <div className="flex items-center space-x-2">
                  <img
                    className="h-6 w-6 rounded-full object-cover"
                    src={user.photoURL}
                    alt="User"
                  />
                  <span className="text-gray-300 hover:bg-primary-5 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                    {user.firstName}
                  </span>
                </div>
              ) : (
                <>
                  <Button
                    background="bg-transparent"
                    textColor="text-primary-6"
                    borderRadius="rounded-full"
                    border="border-2 border-primary-6"
                    onClick={() => navigate(PATH.general.signIn)}
                  >
                    Log In
                  </Button>
                  <Button
                    background="bg-primary-6"
                    textColor="text-white"
                    borderRadius="rounded-full"
                    onClick={() => navigate(PATH.general.signUp)}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        </Transition>
      )}
    </div>
  );
};

export default Navbar;