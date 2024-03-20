import { Navigate, useRoutes } from "react-router-dom";
import Layout from "../layouts";
import { LazyAi, LazyDashboard, LazyHistory, LazyLayout, LazyPrescription, LazyProfile, LazySpecialist } from "./components";
import { Page404 as NotFound, 
  Home, SignIn, DoctorSignUp, 
  SignUp as PatientSignUp,
  SignUpPointer,
} from "../pages/public"
import { DEFAULT_PATH, PATH } from "./path";

export default function Router() {
  return useRoutes([
    {
      path: DEFAULT_PATH,
      element: <LazyLayout />,
      children: [
        { element: <Home /> , index: true },
        { path: PATH.general.home, element: <Navigate to="/" replace />  },
        
        { path: PATH.general.signUp, element: <PatientSignUp /> },
        { path: PATH.general.doctorSignUp, element: <DoctorSignUp /> },
        { path: PATH.general.signUpPointer, element: <SignUpPointer /> },
        { path: PATH.general.signIn, element: <SignIn /> },
        { path: PATH.general.page404, element: <NotFound /> },
        { path: "*", element: <Navigate to={PATH.general.page404} replace /> },
      ],
    },
    {
      path: PATH.dashboard.default,
      element: <LazyLayout layout="patient" />,
      children: [
        { path: PATH.dashboard.dashboard, element: <LazyDashboard /> , index: true },
        { path: PATH.dashboard.profile, element: <LazyProfile /> },
        { path: PATH.dashboard.ai, element: <LazyAi /> },
        { path: PATH.dashboard.prescription, element: <LazyPrescription /> },
        { path: PATH.dashboard.specialist, element: <LazySpecialist /> },
        { path: PATH.dashboard.history, element: <LazyHistory /> },

        // { path: PATH.general.signUp, element: <PatientSignUp /> },
        { path: "*", element: <Navigate to={PATH.general.page404} replace /> },
      ],
    },
    { path: "*", element: <Navigate to={PATH.general.page404} replace /> },
  ]);
}