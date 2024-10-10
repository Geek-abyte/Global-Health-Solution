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
  Feedback,
} from "../pages/public";
import { DEFAULT_PATH, PATH } from "./path";
import { LoadingScreen } from "../components";

import { blogs } from "../data/blogs";
import DoctorDashboard from "../pages/private/doctor/DoctorDashboard";
import { ChatRoom, Setup } from "../pages/private/chat";
import { useDispatch, useSelector } from "react-redux";
import {
  AwaitingApproval,
  DoctorCallDetail,
  DoctorHistory,
  SpecialistProfile,
} from "../pages/private/doctor";
import { fetchUserProfile } from "../states/user/authSlice";
import { useEffect, useState } from "react";
import { connectSocket, disconnectSocket } from "../services/sockets";
import SpecialistSignIn from "../pages/public/SpecialistSignIn";
import { CallDetail } from "../pages/private/patient";
import AdminLayout from "../layouts/AdminLayout";
import { AdminAllUsers, AdminDashboard, AdminLogin, AdminManageSpecialists, AdminSpecialistDetail, AdminBlogs, CreateEditBlog, BlogPreview } from "../pages/private/admin";
import EditSpecialistProfile from "../pages/private/doctor/EditSpecialistPage";
import SpecialistAppointments from "../pages/private/doctor/SpecialistAppointment";
import Appointments from "../pages/private/patient/Appointment";
import CreateAppointment from '../pages/private/patient/CreateAppointment';

const AuthWrapper = ({ children }) => {
  const dispatch = useDispatch();

  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
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
    return <LoadingScreen dark />;
  }

  return children;
};

export default function Router() {
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      connectSocket(user._id);
    }
    // return () => {
    //   disconnectSocket();
    // };
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
        { path: PATH.general.feedback, element: <Feedback /> },
        { path: PATH.general.page404, element: <NotFound /> },
        { path: "*", element: <Navigate to={PATH.general.page404} replace /> },
      ],
    },
    {
      path: PATH.chat.setup + "/:callId",
      element: (
        <AuthWrapper>
          <Setup />
        </AuthWrapper>
      ),
    },
    {
      path: PATH.chat.chatroom + "/:callId",
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
        { path: PATH.dashboard.appointments, element: < Appointments /> },
        { path: PATH.dashboard.createAppointment, element: <CreateAppointment /> },
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
        { path: PATH.doctor.edit, element: <EditSpecialistProfile /> },
        { path: "*", element: <Navigate to={PATH.general.page404} replace /> },
        {
          path: PATH.doctor.callDetail + "/:id",
          element: <DoctorCallDetail />,
        },
        { path: PATH.doctor.history, element: <DoctorHistory /> },
        { path: PATH.doctor.appointments, element: <SpecialistAppointments /> },
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
    {
      path: PATH.admin.dashboard,
      element: (
        <AuthWrapper>
          <PrivateRoute
            userRole={user?.role}
            requiredRole="admin"
            route={<AdminLayout />}
            redirectTo={PATH.admin.login}
          />
        </AuthWrapper>
      ),
      children: [
        { element: <AdminDashboard />, index: true },
        { path: PATH.admin.manage, element: <AdminManageSpecialists /> },
        { path: PATH.admin.specialist + "/:id", element: <AdminSpecialistDetail /> },
        { path: PATH.admin.users, element: <AdminAllUsers /> },
        { path: PATH.admin.blogs, element: <AdminBlogs /> },
        { path: PATH.admin.createBlog, element: <CreateEditBlog /> },
        { path: PATH.admin.editBlog + "/:id", element: <CreateEditBlog /> },
        { path: PATH.admin.previewBlog + "/:id", element: <BlogPreview /> },
      ],
    },
    { path: PATH.admin.login, element: <AdminLogin /> },
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
  // const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to={redirectTo || PATH.general.signIn} />;
  } else if (requiredRole && userRole !== requiredRole) {
    return <Navigate to={PATH.general.page404} />;
  } else if (userRole === "specialist" && !isApproved) {
    return <Navigate to={PATH.doctor.awaitingApproval} />;
  }

  return route;
};
