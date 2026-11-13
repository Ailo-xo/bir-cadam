import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, isFirebaseConfigured } from '../firebase/firebase'
import {
  getStoredUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUserProfile,
} from '../services/authService'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getStoredUser())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        const nextUser = firebaseUser
          ? {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName || 'BIR KADAM user',
            }
          : null

        setUser(nextUser)
        setLoading(false)
      })

      return () => unsubscribe()
    }

    setUser(getStoredUser())
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const nextUser = await loginUser({ email, password })
    setUser(nextUser)
    return nextUser
  }

  const register = async (name, email, password) => {
    const nextUser = await registerUser({ name, email, password })
    setUser(nextUser)
    return nextUser
  }

  const signOut = async () => {
    await logoutUser()
    setUser(null)
  }

  const updateProfileName = async (displayName) => {
    const nextUser = await updateUserProfile(displayName)
    setUser(nextUser)
    return nextUser
  }

  const value = useMemo(
    () => ({ user, loading, login, register, signOut, updateProfileName }),
    [user, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}
