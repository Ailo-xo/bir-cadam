import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getRedirectResult,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { doc, runTransaction, setDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db, isFirebaseConfigured } from '../firebase/firebase'

const localUserKey = 'bir-kadam-user'
const localUsersKey = 'bir-kadam-users'

const readLocalUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(localUsersKey) || '[]')
  } catch {
    return []
  }
}

const writeLocalUsers = (users) => {
  localStorage.setItem(localUsersKey, JSON.stringify(users))
}

const createLocalUser = ({ uid, email, displayName }) => ({
  uid,
  email,
  displayName,
  createdAt: new Date().toISOString(),
})

export const getStoredUser = () => {
  if (!isFirebaseConfigured) {
    try {
      const raw = localStorage.getItem(localUserKey)
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  }

  return auth?.currentUser
    ? {
        uid: auth.currentUser.uid,
        email: auth.currentUser.email,
        displayName: auth.currentUser.displayName || 'BIR KADAM user',
      }
    : null
}

export const loginUser = async ({ email, password }) => {
  if (!isFirebaseConfigured) {
    const users = readLocalUsers()
    const match = users.find(
      (user) => user.email.toLowerCase() === String(email).trim().toLowerCase(),
    )

    if (!match) {
      throw Object.assign(new Error('User not found'), { code: 'auth/user-not-found' })
    }

    if (match.password !== password) {
      throw Object.assign(new Error('Invalid credentials'), { code: 'auth/invalid-credential' })
    }

    const user = createLocalUser({
      uid: match.uid,
      email: match.email,
      displayName: match.displayName,
    })

    localStorage.setItem(localUserKey, JSON.stringify(user))
    return user
  }

  const credentials = await signInWithEmailAndPassword(auth, email, password)
  const user = {
    uid: credentials.user.uid,
    email: credentials.user.email,
    displayName: credentials.user.displayName || 'BIR KADAM user',
  }
  localStorage.setItem(localUserKey, JSON.stringify(user))
  return user
}

export const signInWithGoogle = async () => {
  if (!isFirebaseConfigured || !auth || !db) {
    throw Object.assign(new Error('Google sign-in requires Firebase'), {
      code: 'auth/operation-not-allowed',
    })
  }

  const provider = new GoogleAuthProvider()
  provider.setCustomParameters({ prompt: 'select_account' })
  await signInWithRedirect(auth, provider)
}

export const completeGoogleSignIn = async () => {
  if (!isFirebaseConfigured || !auth || !db) return null

  const credentials = await getRedirectResult(auth)
  if (!credentials) return null

  const firebaseUser = credentials.user
  const user = {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName || 'BIR KADAM user',
  }
  const profileRef = doc(db, 'users', firebaseUser.uid)
  let profileSyncFailed = false

  try {
    await runTransaction(db, async (transaction) => {
      const profileSnapshot = await transaction.get(profileRef)
      const profile = {
        displayName: user.displayName,
        email: user.email,
        updatedAt: serverTimestamp(),
      }

      if (!profileSnapshot.exists()) {
        profile.createdAt = serverTimestamp()
      }

      transaction.set(profileRef, profile, { merge: true })
    })
  } catch (error) {
    profileSyncFailed = true
    console.error('Google sign-in succeeded, but the Firestore profile could not be saved.', error)
  }

  localStorage.setItem(localUserKey, JSON.stringify(user))
  return { user, profileSyncFailed }
}

export const registerUser = async ({ name, email, password }) => {
  if (!isFirebaseConfigured) {
    const users = readLocalUsers()
    const exists = users.some(
      (user) => user.email.toLowerCase() === String(email).trim().toLowerCase(),
    )

    if (exists) {
      throw Object.assign(new Error('Email already in use'), { code: 'auth/email-already-in-use' })
    }

    const uid = `local-${Date.now()}-${Math.random().toString(16).slice(2)}`
    const user = createLocalUser({ uid, email, displayName: name || 'BIR KADAM user' })

    users.push({ ...user, password })
    writeLocalUsers(users)
    localStorage.setItem(localUserKey, JSON.stringify(user))
    return user
  }

  const credentials = await createUserWithEmailAndPassword(auth, email, password)
  await updateProfile(credentials.user, { displayName: name })

  const user = {
    uid: credentials.user.uid,
    email: credentials.user.email,
    displayName: name || 'BIR KADAM user',
  }

  await setDoc(doc(db, 'users', credentials.user.uid), {
    displayName: name,
    email,
    createdAt: serverTimestamp(),
  })

  localStorage.setItem(localUserKey, JSON.stringify(user))
  return user
}

export const updateUserProfile = async (displayName) => {
  const trimmedName = String(displayName || '').trim()

  if (!isFirebaseConfigured) {
    const currentUser = getStoredUser()
    if (!currentUser) return null

    const updatedUser = {
      ...currentUser,
      displayName: trimmedName || currentUser.displayName || 'BIR KADAM user',
    }

    localStorage.setItem(localUserKey, JSON.stringify(updatedUser))
    return updatedUser
  }

  if (!auth?.currentUser) return null

  await updateProfile(auth.currentUser, { displayName: trimmedName || auth.currentUser.displayName || 'BIR KADAM user' })

  const updatedUser = {
    uid: auth.currentUser.uid,
    email: auth.currentUser.email,
    displayName: auth.currentUser.displayName || 'BIR KADAM user',
  }

  localStorage.setItem(localUserKey, JSON.stringify(updatedUser))
  return updatedUser
}

export const logoutUser = async () => {
  if (!isFirebaseConfigured) {
    localStorage.removeItem(localUserKey)
    return
  }

  await signOut(auth)
  localStorage.removeItem(localUserKey)
}
