const authErrorKeys = {
  'auth/invalid-email': 'auth.errors.invalidEmail',
  'auth/user-not-found': 'auth.errors.userNotFound',
  'auth/wrong-password': 'auth.errors.invalidCredentials',
  'auth/invalid-credential': 'auth.errors.invalidCredentials',
  'auth/email-already-in-use': 'auth.errors.emailInUse',
  'auth/weak-password': 'auth.errors.weakPassword',
  'auth/too-many-requests': 'auth.errors.tooManyRequests',
  'auth/network-request-failed': 'auth.errors.network',
  'auth/popup-blocked': 'auth.errors.popupBlocked',
  'auth/unauthorized-domain': 'auth.errors.unauthorizedDomain',
  'auth/account-exists-with-different-credential': 'auth.errors.accountExistsWithDifferentCredential',
  'auth/operation-not-allowed': 'auth.errors.googleNotConfigured',
}

export const getAuthErrorMessage = (error, fallback, t) =>
  authErrorKeys[error?.code] ? t(authErrorKeys[error.code]) : t(fallback)
