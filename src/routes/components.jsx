import { Suspense, lazy } from "react";
import { LoadingScreen } from "../components";

export const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

export const LazyLayout = Loadable(lazy(() => import("../layouts/index")))
export const LazyDashboard = Loadable(lazy(() => import("../pages/private/patient/PatientDashboard")))
export const LazyProfile = Loadable(lazy(() => import("../pages/private/patient/PatientProfile")))
export const LazyAi = Loadable(lazy(() => import("../pages/private/patient/AiPage")))
export const LazyPrescription = Loadable(lazy(() => import("../pages/private/patient/Prescription")))
export const LazySpecialist = Loadable(lazy(() => import("../pages/private/patient/Specialist")))
export const LazyHistory = Loadable(lazy(() => import("../pages/private/patient/MedicalHistory")))

