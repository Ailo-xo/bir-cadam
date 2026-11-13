import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import AboutPage from './pages/AboutPage'
import CategoriesPage from './pages/CategoriesPage'
import CategoryDetailsPage from './pages/CategoryDetailsPage'
import CreatePlanPage from './pages/CreatePlanPage'
import GuideDetailsPage from './pages/GuideDetailsPage'
import GuidesPage from './pages/GuidesPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import MyPlansPage from './pages/MyPlansPage'
import NotFoundPage from './pages/NotFoundPage'
import PlanDetailsPage from './pages/PlanDetailsPage'
import ProfilePage from './pages/ProfilePage'
import RegisterPage from './pages/RegisterPage'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/categories/:categoryId" element={<CategoryDetailsPage />} />
          <Route path="/guides" element={<GuidesPage />} />
          <Route path="/guides/:guideId" element={<GuideDetailsPage />} />
          <Route path="/create-plan" element={<CreatePlanPage />} />
          <Route
            path="/my-plans"
            element={
              <ProtectedRoute>
                <MyPlansPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-plans/:planId"
            element={
              <ProtectedRoute>
                <PlanDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
