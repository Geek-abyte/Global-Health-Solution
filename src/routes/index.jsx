import { Navigate, useRoutes } from "react-router-dom";
import Layout from "../layouts";
import {
  LazyAi,
  LazyCongrats,
  LazyDashboard,
  LazyEditProfile,
  LazyHistory,
  LazyLayout,
  LazyPrescription,
  LazyProfile,
  LazySpecialist,
  LazyChat,
} from "./components";
import {
  Page404 as NotFound,
  Home,
  SignIn,
  DoctorSignUp,
  SignUp as PatientSignUp,
  BlogArticle,
  BlogList,
  About,
  Doctors,
  PrivacyPolicy,
  CookiePolicy,
  Terms,
} from "../pages/public";
import { DEFAULT_PATH, PATH } from "./path";
import { LoadingScreen } from "../components";

import { blogs } from "../data/blogs";
import DoctorDashboard from "../pages/private/doctor/DoctorDashboard";
import { ChatRoom, Setup } from "../pages/private/chat";
import { useSelector } from "react-redux";

const userRole = 'user'

export default function Router() {
  return useRoutes([
    {
      path: DEFAULT_PATH,
      element: <LazyLayout />,
      children: [
        { element: <Home />, index: true },
        { path: PATH.general.home, element: <Navigate to="/" replace /> },
        { path: PATH.general.signUp, element: <PatientSignUp /> },
        { path: PATH.general.about, element: <About /> },
        { path: PATH.general.doctors, element: <Doctors /> },
        { path: PATH.general.doctorSignUp, element: <DoctorSignUp /> },
        { path: PATH.general.congratulations, element: <LazyCongrats /> },
        { path: PATH.general.signIn, element: <SignIn /> },
        { path: PATH.general.privacy, element: <PrivacyPolicy /> },
        { path: PATH.general.cookie, element: <CookiePolicy /> },
        { path: PATH.general.terms, element: <Terms /> },
        { path: PATH.general.page404, element: <NotFound /> },
        { path: "*", element: <Navigate to={PATH.general.page404} replace /> },
      ],
    },
    {
      path: PATH.chat.default,
      element: <Setup />,
    },
    {
      path: PATH.chat.meeting,
      element: <LazyChat />,
    },
    {
      path: PATH.dashboard.default,
      element: (
        <PrivateRoute
          userRole={userRole}
          requiredRole="user"
          route={<LazyLayout layout="patient" />}
        />
      ),
      children: [
        {
          path: PATH.dashboard.dashboard,
          element: <LazyDashboard />,
          index: true,
        },
        { path: PATH.dashboard.profile, element: <LazyProfile /> },
        { path: PATH.dashboard.edit, element: <LazyEditProfile /> },
        { path: PATH.dashboard.ai, element: <LazyAi /> },
        { path: PATH.dashboard.prescription, element: <LazyPrescription /> },
        { path: PATH.dashboard.consultant, element: <LazySpecialist /> },
        { path: PATH.dashboard.history, element: <LazyHistory /> },
        { path: "*", element: <Navigate to={PATH.general.page404} replace /> },
      ],
    },
    {
      path: PATH.doctor.default,
      element: (
        <PrivateRoute
          userRole={userRole}
          // requiredRole="specialist"
          route={<LazyLayout layout="doctor" />}
        />
      ),
      children: [
        {
          path: PATH.doctor.dashboard,
          element: <DoctorDashboard />,
          index: true,
        },
        { path: "*", element: <Navigate to={PATH.general.page404} replace /> },
      ],
    },
    {
      path: PATH.blog.default,
      element: <LazyLayout />,
      children: [
        { element: <BlogList blogs={blogs} />, index: true },
        {
          path: PATH.blog.article,
          element: <BlogArticle blogs={blogs} />,
          index: true,
        },
        { path: "*", element: <Navigate to={PATH.general.page404} replace /> },
      ],
    },
    { path: "*", element: <Navigate to={PATH.general.page404} replace /> },
  ]);
}

const PrivateRoute = ({
  // isAuthenticated,
  userRole,
  requiredRole,
  redirectTo,
  route,
}) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={redirectTo || PATH.general.signIn} />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to={PATH.general.page404} />;
  }

  return route;
};
