function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOT = "/";
const DOCTOR = `/doctor/`
const PATIENT = `/patient/`
const BLOG = `/blog/`

export const PATH = {
  root: ROOT,
  general: {
    page404: path(ROOT, "404"),
    home: path(ROOT, ""),
    doctors: path(ROOT, "doctors"),
    about: path(ROOT, "about"),
    signUp: path(ROOT, "sign-up"),
    doctorSignUp: path(ROOT, "sign-up/doctors"),
    signUpPointer: path(ROOT, "sign-up/pointer"),
    signIn: path(ROOT, "sign-in"),
  },
  dashboard: {
    default: PATIENT,
    dashboard: path(PATIENT, "dashboard"),
    profile: path(PATIENT, "profile"),
    ai: path(PATIENT, "ai"),
    prescription: path(PATIENT, "prescription"),
    consultant: path(PATIENT, "consultant"),
    history: path(PATIENT, "history")
  },
  doctor: {
    default: DOCTOR,
    dashboard: path(DOCTOR, "dashboard"),
    profile: path(DOCTOR, "calender"),
    chat: path(DOCTOR, "chat"),
  },
  blog: {
    default: BLOG,
    article: path(BLOG, ":id")
  }
};

export const DEFAULT_PATH = PATH.general.home