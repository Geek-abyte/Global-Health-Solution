import { Navigate, useLocation, useRoutes } from "react-router-dom";
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
  LoginCrossroad,
} from "../pages/public";
import { DEFAULT_PATH, PATH } from "./path";
import { LoadingScreen } from "../components";

import { blogs } from "../data/blogs";
import DoctorDashboard from "../pages/private/doctor/DoctorDashboard";
import { ChatRoom, Setup } from "../pages/private/chat";
import { useDispatch, useSelector } from "react-redux";
import { AwaitingApproval, SpecialistProfile } from "../pages/private/doctor";
import { fetchUserProfile } from "../states/user/authSlice";
import { useEffect, useState } from "react";
import { connectSocket, disconnectSocket } from "../services/sockets";
import SpecialistSignIn from "../pages/public/SpecialistSignIn";
import { CallDetail } from "../pages/private/patient";


const AuthWrapper = ({ children }) => {
  const dispatch = useDispatch();

  const { user, isAuthenticated, loading } = useSelector(
    (state) => state.auth
  );
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !isInitialized && !loading) {
      dispatch(fetchUserProfile()).then(() => {
        setIsInitialized(true);
      });
    } else if (!isAuthenticated) {
      setIsInitialized(true);
    }
  }, [dispatch, isAuthenticated, isInitialized, loading]);

  if (!isInitialized && !user) {
    return <LoadingScreen dark/>;
  }    


  return children;
};

export default function Router() {
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      connectSocket(user._id);
    }
    return () => {
      disconnectSocket();
    };
  }, [user]);

  return useRoutes([
    {
      path: DEFAULT_PATH,
      element: (
        <AuthWrapper>
          <LazyLayout />
        </AuthWrapper>
      ),
      children: [
        { element: <Home />, index: true },
        { path: PATH.general.home, element: <Navigate to="/" replace /> },
        { path: PATH.general.signUp, element: <PatientSignUp /> },
        { path: PATH.general.about, element: <About /> },
        { path: PATH.general.doctors, element: <Doctors /> },
        { path: PATH.general.doctorSignUp, element: <DoctorSignUp /> },
        { path: PATH.general.congratulations, element: <LazyCongrats /> },
        { path: PATH.general.loginCrossroad, element: <LoginCrossroad /> },
        { path: PATH.general.signIn, element: <SignIn /> },
        { path: PATH.general.specialistSignIn, element: <SpecialistSignIn /> },
        { path: PATH.general.privacy, element: <PrivacyPolicy /> },
        { path: PATH.general.cookie, element: <CookiePolicy /> },
        { path: PATH.general.terms, element: <Terms /> },
        { path: PATH.doctor.awaitingApproval, element: <AwaitingApproval /> },

        { path: PATH.general.page404, element: <NotFound /> },
        { path: "*", element: <Navigate to={PATH.general.page404} replace /> },
      ],
    },
    {
      path: PATH.chat.default,
      element: (
        <AuthWrapper>
          <Setup userId={user?._id} />
        </AuthWrapper>
      ),
    },
    {
      path: PATH.chat.default + ":callId",
      element: (
        <PrivateRoute userRole="all" requiredRole="all" route={<LazyChat />} />
      ),
    },
    {
      path: PATH.dashboard.default,
      element: (
        <AuthWrapper>
          <PrivateRoute
            userRole={user?.role}
            requiredRole="user"
            route={<LazyLayout layout="patient" />}
          />
        </AuthWrapper>
      ),
      children: [
        {
          element: <LazyDashboard />,
          index: true,
        },
        { path: PATH.dashboard.profile, element: <LazyProfile /> },
        { path: PATH.dashboard.edit, element: <LazyEditProfile /> },
        { path: PATH.dashboard.ai, element: <LazyAi /> },
        { path: PATH.dashboard.prescription, element: <LazyPrescription /> },
        { path: PATH.dashboard.consultant, element: <LazySpecialist /> },
        { path: PATH.dashboard.history, element: <LazyHistory /> },
        { path: PATH.dashboard.callDetail + "/:id", element: <CallDetail /> },
        { path: "*", element: <Navigate to={PATH.general.page404} replace /> },
      ],
    },
    {
      path: PATH.doctor.default,
      element: (
        <AuthWrapper>
          <PrivateRoute
            userRole={user?.role}
            requiredRole="specialist"
            route={<LazyLayout layout="doctor" />}
            isApproved={user?.isApproved}
          />
        </AuthWrapper>
      ),
      children: [
        {
          path: PATH.doctor.dashboard,
          element: <DoctorDashboard />,
          index: true,
        },
        { path: PATH.doctor.profile, element: <SpecialistProfile /> },
        { path: "*", element: <Navigate to={PATH.general.page404} replace /> },
      ],
    },
    {
      path: PATH.blog.default,
      element: (
        <AuthWrapper>
          <LazyLayout />
        </AuthWrapper>
      ),
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
  userRole,
  requiredRole,
  isApproved,
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

  if (userRole === "specialist" && !isApproved) {
    return <Navigate to={PATH.doctor.awaitingApproval} />;
  }

  return route;
};
