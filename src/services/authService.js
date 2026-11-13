import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
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
      throw new Error('Пользователь не найден. Проверьте email или зарегистрируйтесь.')
    }

    if (match.password !== password) {
      throw new Error('Неверный пароль. Попробуйте ещё раз.')
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

export const registerUser = async ({ name, email, password }) => {
  if (!isFirebaseConfigured) {
    const users = readLocalUsers()
    const exists = users.some(
      (user) => user.email.toLowerCase() === String(email).trim().toLowerCase(),
    )

    if (exists) {
      throw new Error('Пользователь с таким email уже существует.')
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
