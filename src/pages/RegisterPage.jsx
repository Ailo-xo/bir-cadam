import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FormInput from '../components/FormInput'
import { useAuth } from '../context/AuthContext'

const RegisterPage = () => {
  const navigate = useNavigate()
  const { register } = useAuth()
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
      setError('Введите имя пользователя.')
      return
    }

    if (form.password.length < 6) {
      setError('Пароль должен содержать не менее 6 символов.')
      return
    }

    if (form.password !== form.confirmPassword) {
      setError('Пароли не совпадают.')
      return
    }

    setLoading(true)

    try {
      await register(form.name.trim(), form.email, form.password)
      navigate('/my-plans')
    } catch (err) {
      setError(err.message || 'Не удалось создать аккаунт.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <span className="eyebrow accent">Регистрация</span>
          <h1>Создайте аккаунт</h1>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <FormInput label="Имя" name="name" value={form.name} onChange={updateField} placeholder="Ваше имя" />
          <FormInput
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={updateField}
            placeholder="name@example.com"
          />
          <FormInput
            label="Пароль"
            name="password"
            type="password"
            value={form.password}
            onChange={updateField}
            placeholder="Минимум 6 символов"
          />
          <FormInput
            label="Подтвердите пароль"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={updateField}
            placeholder="Повторите пароль"
          />

          {error ? <div className="message-box error">{error}</div> : null}

          <button type="submit" className="primary-button full-width" disabled={loading}>
            {loading ? 'Создаём аккаунт...' : 'Зарегистрироваться'}
          </button>
        </form>

        <p className="auth-switcher">
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </p>
      </div>
    </section>
  )
}

export default RegisterPage
