import React, { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { defaultUser, logoWhite } from "../assets";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { PATH } from "../routes/path";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { showToast, showModal, hideModal } from "../states/popUpSlice";
import { fetchUserProfile, logout } from "../states/user/authSlice";
import PatientSidebar from "../layouts/PatientSidebar";
import LogoutModal from "./LogoutModal";
import { FaChevronDown } from 'react-icons/fa';

const apiUrl = import.meta.env.VITE_API_URL;

const Navbar = ({ className }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [navMode, setNavMode] = useState("full");
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const openModal = useSelector((state) => state.popUp.modalContent);
  const isDashboard = location.pathname.startsWith(PATH.dashboard.default);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  useEffect(() => {
    setNavMode(location.pathname.includes("auth") ? "none" : "full");
  }, [location.pathname]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, isAuthenticated]);

  const handleLogout = () => {
    dispatch(showModal({ content: "logout" }));
  };

  const NavLink = ({ to, children, hasDropdown }) => {
    const isActive =
      (to === "/" && location.pathname === "/") ||
      (to !== "/" &&
        location.pathname.startsWith(to) &&
        location.pathname !== "/");
    return (
      <Link
        to={to}
        className={`${isActive ? "text-primary-6" : "text-gray-600"
          } hover:text-primary-6 transition-colors duration-200 px-3 py-2 rounded-md text-sm font-medium flex items-center relative`}
        onMouseEnter={() => hasDropdown && setIsServicesDropdownOpen(true)}
        onMouseLeave={() => hasDropdown && setIsServicesDropdownOpen(false)}
      >
        {children}
        {hasDropdown && <FaChevronDown className="ml-1" />}
        {hasDropdown && isServicesDropdownOpen && (
          <div className="absolute bottom-0 left-0 w-full h-4 bg-transparent" />
        )}
      </Link>
    );
  };

  const ServicesDropdown = () => (
    <div
      className="absolute top-full left-0 mt-0 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
      onMouseEnter={() => setIsServicesDropdownOpen(true)}
      onMouseLeave={() => setIsServicesDropdownOpen(false)}
    >
      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        <Link to={PATH.general.medicalDevices} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Medical Devices and Equipment</Link>
        <Link to={PATH.general.medicalTourism} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Medical Tourism</Link>
        <Link to={PATH.general.laboratoryServices} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Laboratory Services</Link>
      </div>
    </div>
  );

  const MobileNavLink = ({ to, children, onClick }) => {
    const isActive = location.pathname.startsWith(to) && location.pathname !== "/";
    return (
      <Link
        to={to}
        className={`${isActive ? "text-primary-6" : "text-gray-600"} hover:text-primary-6 transition-colors duration-200 px-3 py-2 rounded-md text-sm font-medium block`}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  };

  return (
    <nav className={`bg-white shadow-md ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to={PATH.general.home} className="flex-shrink-0">
            <img className="h-10" src={logoWhite} alt="Logo" />
          </Link>

          {navMode !== "none" && (
            <div className="flex items-center">
              <div className="hidden md:flex items-center space-x-4">
                <NavLink to={PATH.general.home}>Home</NavLink>
                <NavLink to={PATH.general.about}>About</NavLink>
                <NavLink to={PATH.general.doctors}>Doctors</NavLink>
                <div className="relative group">
                  <NavLink to={PATH.general.services} hasDropdown>Services</NavLink>
                  {isServicesDropdownOpen && <ServicesDropdown />}
                </div>
                {user && (
                  <NavLink
                    to={
                      user.role === "specialist"
                        ? PATH.doctor.dashboard
                        : PATH.dashboard.default
                    }
                  >
                    Dashboard
                  </NavLink>
                )}
              </div>

              <div className="hidden md:flex items-center ml-4 space-x-4">
                {user ? (
                  <div className="flex items-center space-x-3">
                    <img
                      className="h-8 w-8 rounded-full object-cover border-2"
                      src={user.profileImage ? `${apiUrl}${user.profileImage}` : defaultUser}
                      alt={user.firstName}
                      crossOrigin="anonymous"
                    />
                    <span className="text-gray-700 font-medium">
                      {user.firstName}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="text-gray-600 hover:text-primary-6 transition-colors duration-200 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <>
                    <Button
                      background="bg-white"
                      textColor="text-primary-6"
                      borderRadius="rounded-full"
                      border="border-2 border-primary-6"
                      hoverEffect="hover:bg-primary-6 hover:text-white transition-colors duration-200"
                      onClick={() => navigate(PATH.general.loginCrossroad)}
                    >
                      Log In
                    </Button>
                    <Button
                      background="bg-primary-6"
                      textColor="text-white"
                      borderRadius="rounded-full"
                      hoverEffect="hover:bg-primary-7 transition-colors duration-200"
                      onClick={() => navigate(PATH.general.signUp)}
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </div>

              <div className="md:hidden ml-4">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-primary-6 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-6"
                >
                  <span className="sr-only">Open main menu</span>
                  {isOpen ? (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Transition
        show={isOpen}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        {isDashboard ? (
          <PatientSidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
        ) : (
          <div className="md:hidden bg-white shadow-lg rounded-b-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <MobileNavLink to={PATH.general.home} onClick={() => setIsOpen(false)}>Home</MobileNavLink>
              <MobileNavLink to={PATH.general.about} onClick={() => setIsOpen(false)}>About</MobileNavLink>
              <MobileNavLink to={PATH.general.doctors} onClick={() => setIsOpen(false)}>Our Doctors</MobileNavLink>
              <div>
                <button
                  className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-primary-6 transition-colors duration-200"
                  onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                >
                  Services {isMobileServicesOpen ? '▲' : '▼'}
                </button>
                {isMobileServicesOpen && (
                  <div className="pl-4">
                    <MobileNavLink to={PATH.general.medicalDevices} onClick={() => setIsOpen(false)}>Medical Devices and Equipment</MobileNavLink>
                    <MobileNavLink to={PATH.general.medicalTourism} onClick={() => setIsOpen(false)}>Medical Tourism</MobileNavLink>
                    <MobileNavLink to={PATH.general.laboratoryServices} onClick={() => setIsOpen(false)}>Laboratory Services</MobileNavLink>
                  </div>
                )}
              </div>
              {user && (
                <MobileNavLink
                  to={user.role === "specialist" ? PATH.doctor.dashboard : PATH.dashboard.default}
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </MobileNavLink>
              )}
              {user ? (
                <div className="flex flex-col space-y-2 px-3 py-2">
                  <div className="flex items-center space-x-2">
                    <img
                      className="h-8 w-8 rounded-full object-cover border-2"
                      src={user.profileImage ? `${apiUrl}${user.profileImage}` : defaultUser}
                      alt={user.firstName}
                      crossOrigin="anonymous"
                    />
                    <span className="text-gray-700 font-medium">
                      {user.firstName}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-primary-6 transition-colors duration-200 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Button
                    background="bg-white"
                    textColor="text-primary-6"
                    borderRadius="rounded-full"
                    border="border-2 border-primary-6"
                    hoverEffect="hover:bg-primary-6 hover:text-white transition-colors duration-200"
                    onClick={() => navigate(PATH.general.signIn)}
                    fullWidth
                  >
                    Log In
                  </Button>
                  <Button
                    background="bg-primary-6"
                    textColor="text-white"
                    borderRadius="rounded-full"
                    hoverEffect="hover:bg-primary-7 transition-colors duration-200"
                    onClick={() => navigate(PATH.general.signUp)}
                    fullWidth
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </Transition>

      {openModal == "logout" && <LogoutModal />}
    </nav>
  );
};

export default Navbar;
