function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOT = "/";
const DOCTOR = `/doctor/`
const PATIENT = `/patient/`
const BLOG = `/blog/`
const CHAT = `/chat/`

export const PATH = {
  root: ROOT,
  general: {
    page404: path(ROOT, "404"),
    home: path(ROOT, ""),
    about: path(ROOT, "about"),
    doctors: path(ROOT, "our-doctors"),
    signUp: path(ROOT, "auth/sign-up"),
    doctorSignUp: path(ROOT, "auth/sign-up/doctors"),
    signUpPointer: path(ROOT, "auth/sign-up/pointer"),
    signIn: path(ROOT, "auth/sign-in"),
  },
  dashboard: {
    default: PATIENT,
    dashboard: path(PATIENT, "dashboard"),
    profile: path(PATIENT, "profile"),
    ai: path(PATIENT, "ai"),
    prescription: path(PATIENT, "prescription/:key?"),
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
  },
  chat: {
    default: CHAT,
  }
};

export const DEFAULT_PATH = PATH.general.home