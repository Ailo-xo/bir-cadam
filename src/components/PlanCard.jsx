import { CalendarDays, CheckCircle2, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const PlanCard = ({ plan }) => {
  const completedSteps = plan.steps.filter((step) => step.completed).length
  const totalSteps = plan.steps.length
  const progress = totalSteps ? Math.round((completedSteps / totalSteps) * 100) : 0

  return (
    <article className="plan-card">
      <div className="plan-card-header">
        <div>
          <p className="plan-category">{plan.category}</p>
          <h3>{plan.title}</h3>
        </div>
        <span className="percent-pill">{progress}%</span>
      </div>

      <p className="plan-card-copy">{plan.description}</p>

      <div className="meta-row">
        <span>
          <CalendarDays size={14} /> {new Date(plan.createdAt).toLocaleDateString('ru-RU')}
        </span>
        <span>
          <CheckCircle2 size={14} /> {completedSteps}/{totalSteps} шагов
        </span>
      </div>

      <div className="plan-card-footer">
        <div className="mini-progress">
          <div className="mini-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <Link to={`/my-plans/${plan.id}`}>
          Открыть <ChevronRight size={16} />
        </Link>
      </div>
    </article>
  )
}

export default PlanCard
