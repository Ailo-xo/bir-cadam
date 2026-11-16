import { CalendarDays, CheckCircle2, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAppSettings } from '../context/AppSettingsContext'
import { getLocalizedCategories } from '../data/siteData'
import { formatLocalizedDate } from '../utils/formatDate'

const PlanCard = ({ plan }) => {
  const { language, t } = useAppSettings()
  const category = getLocalizedCategories(language).find((item) => item.id === plan.category)
  const completedSteps = plan.steps.filter((step) => step.completed).length
  const totalSteps = plan.steps.length
  const progress = totalSteps ? Math.round((completedSteps / totalSteps) * 100) : 0

  return (
    <article className="plan-card">
      <div className="plan-card-header">
        <div>
          <p className="plan-category">{category?.title || t('common.uncategorized')}</p>
          <h3>{plan.title}</h3>
        </div>
        <span className="percent-pill">{progress}%</span>
      </div>

      <p className="plan-card-copy">{plan.description}</p>

      <div className="meta-row">
        <span>
          <CalendarDays size={14} /> {formatLocalizedDate(plan.createdAt, language)}
        </span>
        <span>
          <CheckCircle2 size={14} /> {completedSteps}/{totalSteps} {completedSteps === 1 ? t('common.step') : t('common.steps')}
        </span>
      </div>

      <div className="plan-card-footer">
        <div className="mini-progress">
          <div className="mini-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <Link to={`/my-plans/${plan.id}`}>
          {t('common.open')} <ChevronRight size={16} />
        </Link>
      </div>
    </article>
  )
}

export default PlanCard
