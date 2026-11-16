import { Navigate, useLocation } from 'react-router-dom'
import { useAppSettings } from '../context/AppSettingsContext'
import { useAuth } from '../context/AuthContext'
import PageLoader from './PageLoader'

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()
  const { t } = useAppSettings()
  const location = useLocation()

  if (loading) {
    return <PageLoader label={t('auth.checkingAccess')} />
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default ProtectedRoute
