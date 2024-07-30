function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOT = "/";
const DOCTOR = `/doctor/`
const PATIENT = `/user/`
const BLOG = `/blog/`
const CHAT = `/chat/`
const ADMIN = `/admin/`

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
    loginCrossroad: path(ROOT, "auth/sign-in/crossroad"),
    signIn: path(ROOT, "auth/sign-in"),
    specialistSignIn: path(ROOT, "auth/sign-in/specialist"),
    congratulations: path(ROOT, "congratulations"),
    privacy: path(ROOT, "privacy-policy"),
    cookie: path(ROOT, "cookie-policy"),
    terms: path(ROOT, "terms"),
  },
  checkout: path(PATIENT, "checkout"),
  dashboard: {
    default: PATIENT,
    profile: path(PATIENT, "profile"),
    edit: path(PATIENT, "profile/edit-profile"),
    ai: path(PATIENT, "ai"),
    prescription: path(PATIENT, "prescription"),
    consultant: path(PATIENT, "specialist"),
    history: path(PATIENT, "history"),
    callDetail: path(PATIENT, "history/call-detail"),
  },
  doctor: {
    default: DOCTOR,
    dashboard: path(DOCTOR, "dashboard"),
    profile: path(DOCTOR, "profile"),
    chat: path(DOCTOR, "chat"),
    awaitingApproval: path(DOCTOR, "awaiting-approval"),
    history: path(DOCTOR, "history"),
    callDetail: path(DOCTOR, "history/call-detail")
  },
  blog: {
    default: BLOG,
    article: path(BLOG, ":id")
  },
  chat: {
    default: CHAT,
  },
  admin: {
    dashboard: ADMIN,
    login: path(ADMIN, 'login')
  },
};

export const DEFAULT_PATH = PATH.general.home