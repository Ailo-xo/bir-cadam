import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getPlansForUser } from '../services/planService'

const ProfilePage = () => {
  const { user, signOut, updateProfileName } = useAuth()
  const navigate = useNavigate()
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const [profileForm, setProfileForm] = useState({ displayName: user?.displayName || '' })

  useEffect(() => {
    const loadPlans = async () => {
      if (!user?.uid) return
      const data = await getPlansForUser(user.uid)
      setPlans(data)
      setLoading(false)
    }

    loadPlans()
  }, [user])

  useEffect(() => {
    setProfileForm({ displayName: user?.displayName || '' })
  }, [user])

  const summary = useMemo(() => {
    const totalSteps = plans.reduce((sum, plan) => sum + (plan.steps?.length || 0), 0)
    const completedSteps = plans.reduce(
      (sum, plan) => sum + (plan.steps || []).filter((step) => step.completed).length,
      0,
    )

    return {
      totalPlans: plans.length,
      totalSteps,
      completedSteps,
    }
  }, [plans])

  const handleLogout = async () => {
    await signOut()
    navigate('/login')
  }

  const handleProfileUpdate = async (event) => {
    event.preventDefault()
    const nextName = profileForm.displayName.trim() || user.displayName || 'Пользователь'
    await updateProfileName(nextName)
    setProfileForm({ displayName: nextName })
  }

  if (!user) return <div className="page-loader">Профиль недоступен.</div>

  return (
    <section className="page-section profile-page">
      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar">{(user.displayName || 'U').slice(0, 1).toUpperCase()}</div>
          <div>
            <span className="eyebrow accent">Профиль</span>
            <h1>{user.displayName || 'Пользователь'}</h1>
          </div>
        </div>

        <div className="profile-grid">
          <div className="detail-block">
            <strong>Email</strong>
            <span>{user.email}</span>
          </div>
          <div className="detail-block">
            <strong>Планов</strong>
            <span>{summary.totalPlans}</span>
          </div>
          <div className="detail-block">
            <strong>Всего шагов</strong>
            <span>{summary.totalSteps}</span>
          </div>
          <div className="detail-block">
            <strong>Выполнено</strong>
            <span>{summary.completedSteps}</span>
          </div>
        </div>

        <form className="profile-form" onSubmit={handleProfileUpdate}>
          <label className="form-field">
            <span>Имя</span>
            <input
              type="text"
              value={profileForm.displayName}
              onChange={(event) => setProfileForm({ displayName: event.target.value })}
            />
          </label>
          <button type="submit" className="secondary-button">
            Сохранить профиль
          </button>
        </form>

        <div className="profile-actions">
          <button type="button" className="primary-button" onClick={handleLogout}>
            Выйти из аккаунта
          </button>
        </div>

        {loading ? <div className="page-loader small">Обновление данных...</div> : null}
      </div>
    </section>
  )
}

export default ProfilePage
