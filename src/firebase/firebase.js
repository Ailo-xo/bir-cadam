import { initializeApp, getApps } from 'firebase/app'
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
}
const appCheckSiteKey = import.meta.env.VITE_FIREBASE_APPCHECK_SITE_KEY || ''
const appCheckDebugEnabled = import.meta.env.DEV && import.meta.env.VITE_FIREBASE_APPCHECK_DEBUG === 'true'

export const isFirebaseConfigured = Object.values(firebaseConfig).every(Boolean)

let app = null
let auth = null
let db = null
let appCheck = null

if (isFirebaseConfigured) {
  app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig)
  if (appCheckDebugEnabled) {
    globalThis.FIREBASE_APPCHECK_DEBUG_TOKEN = true
  }
  if (appCheckSiteKey || appCheckDebugEnabled) {
    appCheck = initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(appCheckSiteKey || 'debug'),
      isTokenAutoRefreshEnabled: true,
    })
  }
  auth = getAuth(app)
  db = getFirestore(app)
}

export { app, appCheck, auth, db, firebaseConfig }
