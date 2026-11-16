import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import FormInput from '../components/FormInput'
import { useAppSettings } from '../context/AppSettingsContext'
import { useAuth } from '../context/AuthContext'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { getAuthErrorMessage } from '../utils/authErrorMessage'
import { completeGoogleSignIn } from '../services/authService'

const googleRedirectTargetKey = 'bir-kadam-google-redirect-target'

const GoogleIcon = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
    <path
      fill="#4285F4"
      d="M43.6 24.5c0-1.6-.1-3.1-.4-4.6H24v8.7h11c-.5 2.8-2.1 5.2-4.5 6.8V41h7.3c4.3-4 6.8-9.9 6.8-16.5Z"
    />
    <path
      fill="#34A853"
      d="M24 44c5.9 0 10.9-2 14.5-5.4l-7.3-5.6c-2 1.3-4.4 2.1-7.2 2.1-5.5 0-10.2-3.7-11.9-8.7H4.6v5.8C8.2 39.2 15.5 44 24 44Z"
    />
    <path
      fill="#FBBC05"
      d="M12.1 26.4a12 12 0 0 1 0-4.8v-5.8H4.6a20 20 0 0 0 0 16.4l7.5-5.8Z"
    />
    <path
      fill="#EA4335"
      d="M24 12.9c3.2 0 6 1.1 8.2 3.2l6.2-6.2C34.9 6.3 29.9 4 24 4 15.5 4 8.2 8.8 4.6 15.8l7.5 5.8c1.7-5 6.4-8.7 11.9-8.7Z"
    />
  </svg>
)

const LoginPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, loginWithGoogle } = useAuth()
  const { t } = useAppSettings()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const redirectResultHandled = useRef(false)
  const isBusy = loading || googleLoading
  const redirectTo = location.state?.from?.pathname || '/my-plans'

  useEffect(() => {
    if (redirectResultHandled.current) return
    redirectResultHandled.current = true

    completeGoogleSignIn()
      .then((googleUser) => {
        if (!googleUser) {
          sessionStorage.removeItem(googleRedirectTargetKey)
          return
        }

        const target = sessionStorage.getItem(googleRedirectTargetKey) || '/my-plans'
        sessionStorage.removeItem(googleRedirectTargetKey)
        navigate(target, {
          replace: true,
          state: googleUser.profileSyncFailed ? { googleProfileSyncFailed: true } : undefined,
        })
      })
      .catch((err) => {
        sessionStorage.removeItem(googleRedirectTargetKey)
        setError(getAuthErrorMessage(err, 'auth.loginFailed', t))
      })
  }, [navigate, t])

  const updateField = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      await login(form.email, form.password)
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setError(getAuthErrorMessage(err, 'auth.loginFailed', t))
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setGoogleLoading(true)
    setError('')
    sessionStorage.setItem(googleRedirectTargetKey, redirectTo)

    try {
      await loginWithGoogle()
    } catch (err) {
      sessionStorage.removeItem(googleRedirectTargetKey)
      setError(getAuthErrorMessage(err, 'auth.loginFailed', t))
    } finally {
      setGoogleLoading(false)
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <span className="eyebrow accent">{t('auth.loginLabel')}</span>
          <h1>{t('auth.loginTitle')}</h1>
          <LanguageSwitcher />
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <FormInput
            label={t('auth.email')}
            name="email"
            type="email"
            value={form.email}
            onChange={updateField}
            placeholder={t('common.emailPlaceholder')}
          />

          <label className="form-field password-field">
            <span>{t('auth.password')}</span>
            <div className="password-wrap">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={updateField}
                placeholder={t('auth.enterPassword')}
              />
              <button type="button" className="eye-button" onClick={() => setShowPassword((value) => !value)}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </label>

          {error ? <div className="message-box error">{error}</div> : null}

          <button type="submit" className="primary-button full-width" disabled={isBusy}>
            {loading ? t('auth.loadingLogin') : t('auth.loginButton')}
          </button>
          <div className="auth-divider" aria-hidden="true">{t('auth.or')}</div>
          <button
            type="button"
            className="google-auth-button"
            onClick={handleGoogleLogin}
            disabled={isBusy}
          >
            <GoogleIcon />
            {googleLoading ? t('auth.loadingGoogle') : t('auth.continueWithGoogle')}
          </button>
        </form>

        <p className="auth-switcher">
          {t('auth.noAccount')} <Link to="/register">{t('auth.registerButton')}</Link>
        </p>
      </div>
    </section>
  )
}

export default LoginPage
