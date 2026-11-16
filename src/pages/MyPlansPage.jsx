import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import AIProgressAssistant from '../components/AIProgressAssistant'
import FilterDropdown from '../components/FilterDropdown'
import PageLoader from '../components/PageLoader'
import PlanCard from '../components/PlanCard'
import SearchBar from '../components/SearchBar'
import { isAIAvailable } from '../services/aiService'
import { useAppSettings } from '../context/AppSettingsContext'
import { useAuth } from '../context/AuthContext'
import { getLocalizedCategories } from '../data/siteData'
import { getPlansForUser } from '../services/planService'

const MyPlansPage = () => {
  const { user } = useAuth()
  const { language, t } = useAppSettings()
  const categories = getLocalizedCategories(language)
  const [plans, setPlans] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [progress, setProgress] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadPlans = async () => {
      if (!user?.uid) return

      setLoading(true)
      setError('')
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

  const filteredPlans = useMemo(() => {
    return plans.filter((plan) => {
      const totalSteps = plan.steps?.length || 0
      const completedSteps = (plan.steps || []).filter((step) => step.completed).length
      const percent = totalSteps ? Math.round((completedSteps / totalSteps) * 100) : 0
      const matchesSearch = plan.title.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = category === 'all' || plan.category === category
      const matchesProgress =
        progress === 'all' ||
        (progress === 'started' && percent > 0) ||
        (progress === 'complete' && percent === 100) ||
        (progress === 'empty' && percent === 0)

      return matchesSearch && matchesCategory && matchesProgress
    })
  }, [plans, search, category, progress])

  return (
    <section className="page-section">
      <div className="detail-header">
        <div>
          <span className="eyebrow accent">{t('profile.personalAccount')}</span>
          <h1>{t('dashboard.myPlans')}</h1>
        </div>
        <Link to="/create-plan" className="primary-button button-link">
          {t('nav.getStarted')}
        </Link>
      </div>

      <div className="filters-row">
        <SearchBar value={search} onChange={setSearch} placeholder={t('profile.searchByTitle')} />
        <FilterDropdown
          label={t('dashboard.category')}
          value={category}
          onChange={setCategory}
          options={[
            { value: 'all', label: t('dashboard.allCategories') },
            ...categories.map((item) => ({ value: item.id, label: item.title })),
          ]}
        />
        <FilterDropdown
          label={t('dashboard.progress')}
          value={progress}
          onChange={setProgress}
          options={[
            { value: 'all', label: t('dashboard.allStatuses') },
            { value: 'started', label: t('dashboard.started') },
            { value: 'complete', label: t('dashboard.complete') },
            { value: 'empty', label: t('dashboard.empty') },
          ]}
        />
      </div>

      {error ? <div className="message-box error">{error}</div> : null}
      {!isAIAvailable ? <div className="message-box">{t('ai.notConfiguredShort')}</div> : null}

      {loading ? (
        <PageLoader label={t('dashboard.loadingPlans')} />
      ) : !error && filteredPlans.length === 0 ? (
        <EmptyState
          title={t('dashboard.noPlansTitle')}
          description={t('dashboard.noPlansDescription')}
          action={
            <Link to="/create-plan" className="primary-button button-link">
              {t('nav.getStarted')}
            </Link>
          }
        />
      ) : (
        <div className="plan-grid">
          {filteredPlans.map((plan) => (
            <div className="plan-dashboard-item" key={plan.id}>
              <PlanCard plan={plan} />
              <AIProgressAssistant planId={plan.id} />
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default MyPlansPage
