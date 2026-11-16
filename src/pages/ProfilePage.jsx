import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageLoader from '../components/PageLoader'
import { useAppSettings } from '../context/AppSettingsContext'
import { useAuth } from '../context/AuthContext'
import { getPlansForUser } from '../services/planService'

const ProfilePage = () => {
  const { user, signOut, updateProfileName } = useAuth()
  const { t } = useAppSettings()
  const navigate = useNavigate()
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [profileForm, setProfileForm] = useState({ displayName: user?.displayName || '' })

  useEffect(() => {
    const loadPlans = async () => {
      if (!user?.uid) return
      try {
        const data = await getPlansForUser(user.uid)
        setPlans(data)
      } catch {
        setError(t('forms.operationFailed'))
      } finally {
        setLoading(false)
      }
    }

    loadPlans()
  }, [user, t])

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
    const nextName = profileForm.displayName.trim() || user.displayName || t('auth.userFallback')
    setSaving(true)
    setError('')
    try {
      await updateProfileName(nextName)
      setProfileForm({ displayName: nextName })
    } catch {
      setError(t('forms.operationFailed'))
    } finally {
      setSaving(false)
    }
  }

  if (!user) return <div className="page-loader">{t('profile.unavailable')}</div>

  return (
    <section className="page-section profile-page">
      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar">{(user.displayName || 'U').slice(0, 1).toUpperCase()}</div>
          <div>
            <span className="eyebrow accent">{t('profile.title')}</span>
            <h1>{user.displayName || t('profile.userFallback')}</h1>
          </div>
        </div>

        <div className="profile-grid">
          <div className="detail-block">
            <strong>{t('profile.email')}</strong>
            <span>{user.email}</span>
          </div>
          <div className="detail-block">
            <strong>{t('profile.plans')}</strong>
            <span>{summary.totalPlans}</span>
          </div>
          <div className="detail-block">
            <strong>{t('profile.totalSteps')}</strong>
            <span>{summary.totalSteps}</span>
          </div>
          <div className="detail-block">
            <strong>{t('profile.completed')}</strong>
            <span>{summary.completedSteps}</span>
          </div>
        </div>

        <form className="profile-form" onSubmit={handleProfileUpdate}>
          <label className="form-field">
            <span>{t('auth.name')}</span>
            <input
              type="text"
              value={profileForm.displayName}
              onChange={(event) => setProfileForm({ displayName: event.target.value })}
            />
          </label>
          <button type="submit" className="secondary-button" disabled={saving}>
            {saving ? t('common.saving') : t('profile.save')}
          </button>
        </form>

        {error ? <div className="message-box error">{error}</div> : null}

        <div className="profile-actions">
          <button type="button" className="primary-button" onClick={handleLogout}>
            {t('profile.logout')}
          </button>
        </div>

        {loading ? <PageLoader label={t('profile.loading')} /> : null}
      </div>
    </section>
  )
}

export default ProfilePage
