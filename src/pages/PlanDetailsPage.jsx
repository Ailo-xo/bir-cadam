import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { CheckCircle2, PencilLine, Trash2 } from 'lucide-react'
import ConfirmDialog from '../components/ConfirmDialog'
import ProgressBar from '../components/ProgressBar'
import { useAuth } from '../context/AuthContext'
import { categories } from '../data/siteData'
import { deletePlan, getPlanById, toggleStepCompletion, updatePlan } from '../services/planService'

const PlanDetailsPage = () => {
  const { planId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [plan, setPlan] = useState(null)
  const [loading, setLoading] = useState(true)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const loadPlan = async () => {
      if (!user?.uid) return

      const data = await getPlanById(planId, user.uid)
      setPlan(data)
      setLoading(false)
    }

    loadPlan()
  }, [planId, user])

  const finishedSteps = useMemo(
    () => (plan?.steps || []).filter((step) => step.completed).length,
    [plan],
  )

  const totalSteps = plan?.steps?.length || 0
  const progress = totalSteps ? Math.round((finishedSteps / totalSteps) * 100) : 0

  const handleToggle = async (stepId) => {
    setSaving(true)
    const nextPlan = await toggleStepCompletion(planId, stepId, user.uid)
    setPlan(nextPlan)
    setSaving(false)
  }

  const handleUpdate = async () => {
    if (!plan) return

    const nextTitle = window.prompt('Введите новое название плана', plan.title)
    if (!nextTitle) return

    const nextPlan = await updatePlan(planId, { title: nextTitle.trim() }, user.uid)
    setPlan((current) => ({ ...current, ...nextPlan }))
  }

  const handleDelete = async () => {
    const deleted = await deletePlan(planId, user.uid)
    if (deleted) navigate('/my-plans')
  }

  if (loading) return <div className="page-loader">Загрузка плана...</div>
  if (!plan) return <div className="page-loader">План не найден.</div>

  const category = categories.find((item) => item.id === plan.category)

  return (
    <section className="page-section">
      <div className="detail-header">
        <div>
          <span className="eyebrow accent">План</span>
          <h1>{plan.title}</h1>
        </div>
        <div className="action-inline">
          <button type="button" className="secondary-button small-button" onClick={handleUpdate}>
            <PencilLine size={14} /> Редактировать
          </button>
          <button type="button" className="secondary-button small-button danger" onClick={() => setDeleteOpen(true)}>
            <Trash2 size={14} /> Удалить
          </button>
        </div>
      </div>

      <div className="plan-detail-shell">
        <div className="article-panel">
          <div className="meta-row large-gap">
            <span className="resource-tag">{category?.title || plan.category}</span>
            <span>{new Date(plan.createdAt).toLocaleDateString('ru-RU')}</span>
          </div>

          <p className="lead-copy">{plan.description}</p>

          <ProgressBar value={progress} label="Прогресс плана" />

          <div className="step-list-panel">
            {plan.steps.map((step) => (
              <label key={step.id} className={`step-item ${step.completed ? 'done' : ''}`}>
                <input
                  type="checkbox"
                  checked={step.completed}
                  onChange={() => handleToggle(step.id)}
                  disabled={saving}
                />
                <div>
                  <strong>{step.title}</strong>
                  {step.dueDate ? <span>До: {step.dueDate}</span> : <span>Без даты</span>}
                </div>
              </label>
            ))}
          </div>
        </div>

        <aside className="sidebar-panel">
          <h3>План</h3>
          <ul className="side-list">
            <li>
              <strong>Выполнено:</strong> {finishedSteps}/{totalSteps}
            </li>
            <li>
              <strong>Статус:</strong> {progress === 100 ? 'Завершён' : 'В процессе'}
            </li>
            <li>
              <strong>Категория:</strong> {category?.title || plan.category}
            </li>
          </ul>

          <Link to="/my-plans" className="secondary-button button-link full-width">
            К списку планов
          </Link>
        </aside>
      </div>

      <ConfirmDialog
        isOpen={deleteOpen}
        title="Удалить план"
        message="Вы уверены, что хотите удалить этот план? Это действие нельзя отменить."
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
      />
    </section>
  )
}

export default PlanDetailsPage
