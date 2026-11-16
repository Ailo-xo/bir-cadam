import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FormInput from '../components/FormInput'
import { useAppSettings } from '../context/AppSettingsContext'
import { useAuth } from '../context/AuthContext'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { getAuthErrorMessage } from '../utils/authErrorMessage'

const RegisterPage = () => {
  const navigate = useNavigate()
  const { register } = useAuth()
  const { t } = useAppSettings()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const updateField = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (!form.name.trim()) {
      setError(t('auth.nameRequired'))
      return
    }

    if (form.password.length < 6) {
      setError(t('auth.passwordMin'))
      return
    }

    if (form.password !== form.confirmPassword) {
      setError(t('auth.passwordMismatch'))
      return
    }

    setLoading(true)

    try {
      await register(form.name.trim(), form.email, form.password)
      navigate('/my-plans')
    } catch (err) {
      setError(getAuthErrorMessage(err, 'auth.registerFailed', t))
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <span className="eyebrow accent">{t('auth.registerLabel')}</span>
          <h1>{t('auth.registerTitle')}</h1>
          <LanguageSwitcher />
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <FormInput
            label={t('auth.name')}
            name="name"
            value={form.name}
            onChange={updateField}
            placeholder={t('auth.yourName')}
          />
          <FormInput
            label={t('auth.email')}
            name="email"
            type="email"
            value={form.email}
            onChange={updateField}
            placeholder={t('common.emailPlaceholder')}
          />
          <FormInput
            label={t('auth.password')}
            name="password"
            type="password"
            value={form.password}
            onChange={updateField}
            placeholder={t('auth.minPassword')}
          />
          <FormInput
            label={t('auth.confirmPassword')}
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={updateField}
            placeholder={t('auth.repeatPassword')}
          />

          {error ? <div className="message-box error">{error}</div> : null}

          <button type="submit" className="primary-button full-width" disabled={loading}>
            {loading ? t('auth.loadingRegister') : t('auth.registerButton')}
          </button>
        </form>

        <p className="auth-switcher">
          {t('auth.hasAccount')} <Link to="/login">{t('auth.loginButton')}</Link>
        </p>
      </div>
    </section>
  )
}

export default RegisterPage
