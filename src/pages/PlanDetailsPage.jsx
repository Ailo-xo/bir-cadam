import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { PencilLine, Plus, Save, Trash2, X } from 'lucide-react'
import ConfirmDialog from '../components/ConfirmDialog'
import FormInput from '../components/FormInput'
import PageLoader from '../components/PageLoader'
import ProgressBar from '../components/ProgressBar'
import TextArea from '../components/TextArea'
import { useAppSettings } from '../context/AppSettingsContext'
import { useAuth } from '../context/AuthContext'
import { getLocalizedCategories } from '../data/siteData'
import { deletePlan, getPlanById, toggleStepCompletion, updatePlan } from '../services/planService'
import { formatLocalizedDate } from '../utils/formatDate'

const PlanDetailsPage = () => {
  const { planId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { language, t } = useAppSettings()
  const categories = getLocalizedCategories(language)
  const [plan, setPlan] = useState(null)
  const [loading, setLoading] = useState(true)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadPlan = async () => {
      if (!user?.uid) return

      try {
        const data = await getPlanById(planId, user.uid)
        setPlan(data)
      } catch {
        setError(t('forms.operationFailed'))
      } finally {
        setLoading(false)
      }
    }

    loadPlan()
  }, [planId, user, t])

  const finishedSteps = useMemo(() => (plan?.steps || []).filter((step) => step.completed).length, [plan])
  const totalSteps = plan?.steps?.length || 0
  const progress = totalSteps ? Math.round((finishedSteps / totalSteps) * 100) : 0

  const startEditing = () => {
    setDraft({
      title: plan.title,
      description: plan.description,
      steps: (plan.steps || []).map((step) => ({ ...step })),
    })
    setEditing(true)
    setError('')
  }

  const cancelEditing = () => {
    setEditing(false)
    setDraft(null)
    setError('')
  }

  const updateDraftStep = (stepId, field, value) => {
    setDraft((current) => ({
      ...current,
      steps: current.steps.map((step) => (step.id === stepId ? { ...step, [field]: value } : step)),
    }))
  }

  const handleToggle = async (stepId) => {
    setSaving(true)
    setError('')
    try {
      const nextPlan = await toggleStepCompletion(planId, stepId, user.uid)
      setPlan(nextPlan)
    } catch {
      setError(t('forms.operationFailed'))
    } finally {
      setSaving(false)
    }
  }

  const handleUpdate = async () => {
    if (!draft?.title.trim() || !draft.steps.length || draft.steps.some((step) => !step.title.trim())) {
      setError(!draft?.title.trim() ? t('forms.validationTitle') : t('forms.validationSteps'))
      return
    }
    setSaving(true)
    setError('')
    try {
      const nextPlan = await updatePlan(
        planId,
        {
          title: draft.title.trim(),
          description: draft.description.trim(),
          steps: draft.steps.map((step) => ({
            ...step,
            title: step.title.trim(),
            description: (step.description || '').trim(),
          })),
        },
        user.uid,
      )
      setPlan((current) => ({ ...current, ...nextPlan }))
      setEditing(false)
      setDraft(null)
    } catch {
      setError(t('forms.operationFailed'))
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    try {
      const deleted = await deletePlan(planId, user.uid)
      if (deleted) navigate('/my-plans')
    } catch {
      setError(t('forms.operationFailed'))
      setDeleteOpen(false)
    }
  }

  if (loading) return <PageLoader label={t('dashboard.loadingPlans')} />
  if (!plan) {
    return (
      <div className="page-section">
        <div className={`message-box ${error ? 'error' : ''}`}>{error || t('forms.planNotFound')}</div>
      </div>
    )
  }

  const category = categories.find((item) => item.id === plan.category)

  return (
    <section className="page-section">
      <div className="detail-header">
        <div>
          <span className="eyebrow accent">{t('forms.planLabel')}</span>
          <h1>{plan.title}</h1>
        </div>
        <div className="action-inline">
          {editing ? (
            <>
              <button type="button" className="primary-button small-button" onClick={handleUpdate} disabled={saving}>
                <Save size={14} /> {saving ? t('common.saving') : t('common.save')}
              </button>
              <button type="button" className="secondary-button small-button" onClick={cancelEditing} disabled={saving}>
                <X size={14} /> {t('common.cancel')}
              </button>
            </>
          ) : (
            <button type="button" className="secondary-button small-button" onClick={startEditing}>
              <PencilLine size={14} /> {t('forms.editPlan')}
            </button>
          )}
          <button type="button" className="secondary-button small-button danger" onClick={() => setDeleteOpen(true)}>
            <Trash2 size={14} /> {t('forms.deletePlan')}
          </button>
        </div>
      </div>

      <div className="plan-detail-shell">
        <div className="article-panel">
          <div className="meta-row large-gap">
            <span className="resource-tag">{category?.title || t('common.uncategorized')}</span>
            <span>{formatLocalizedDate(plan.createdAt, language)}</span>
          </div>

          {error ? <div className="message-box error">{error}</div> : null}

          {editing ? (
            <div className="plan-edit-fields">
              <FormInput
                label={t('forms.planName')}
                name="title"
                value={draft.title}
                onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))}
              />
              <TextArea
                label={t('forms.situationDescription')}
                name="description"
                value={draft.description || ''}
                onChange={(event) => setDraft((current) => ({ ...current, description: event.target.value }))}
              />
              <div className="section-inline-title">
                <h3>{t('forms.planSteps')}</h3>
                <button
                  type="button"
                  className="secondary-button small-button"
                  onClick={() =>
                    setDraft((current) => ({
                      ...current,
                      steps: [
                        ...current.steps,
                        {
                          id: globalThis.crypto?.randomUUID?.() || `step-${Date.now()}-${Math.random()}`,
                          title: '',
                          description: '',
                          completed: false,
                          dueDate: '',
                        },
                      ],
                    }))
                  }
                >
                  <Plus size={14} /> {t('forms.addStep')}
                </button>
              </div>
              {draft.steps.map((step, index) => (
                <div className="ai-plan-step saved-plan-step" key={step.id}>
                  <span className="ai-step-index">{index + 1}</span>
                  <div className="ai-plan-step-fields">
                    <FormInput
                      label={`${t('forms.stepLabel')} ${index + 1}`}
                      name={`step-title-${step.id}`}
                      value={step.title}
                      onChange={(event) => updateDraftStep(step.id, 'title', event.target.value)}
                    />
                    <label className="form-field">
                      <span>{t('ai.stepDescription')}</span>
                      <textarea
                        rows={2}
                        value={step.description || ''}
                        onChange={(event) => updateDraftStep(step.id, 'description', event.target.value)}
                      />
                    </label>
                  </div>
                  {draft.steps.length > 1 ? (
                    <button
                      type="button"
                      className="icon-button danger"
                      aria-label={t('ai.removeStep')}
                      onClick={() =>
                        setDraft((current) => ({
                          ...current,
                          steps: current.steps.filter((item) => item.id !== step.id),
                        }))
                      }
                    >
                      <Trash2 size={15} />
                    </button>
                  ) : null}
                </div>
              ))}
            </div>
          ) : (
            <>
              <p className="lead-copy">{plan.description}</p>
              {plan.goal ? <p className="ai-plan-detail"><strong>{t('ai.goal')}:</strong> {plan.goal}</p> : null}
              {plan.warnings ? <p className="ai-plan-warning">{plan.warnings}</p> : null}
              {plan.expectedOutcome ? (
                <p className="ai-plan-detail"><strong>{t('ai.expectedOutcome')}:</strong> {plan.expectedOutcome}</p>
              ) : null}
            </>
          )}

          <ProgressBar value={progress} label={t('forms.planProgress')} />

          <div className="step-list-panel">
            {editing
              ? draft.steps.map((step) => (
                  <label key={step.id} className={`step-item ${step.completed ? 'done' : ''}`}>
                    <input type="checkbox" checked={step.completed} readOnly />
                    <div>
                      <strong>{step.title || t('forms.stepLabel')}</strong>
                      {step.description ? <p className="plan-step-description">{step.description}</p> : null}
                    </div>
                  </label>
                ))
              : plan.steps.map((step) => (
                  <label key={step.id} className={`step-item ${step.completed ? 'done' : ''}`}>
                    <input type="checkbox" checked={step.completed} onChange={() => handleToggle(step.id)} disabled={saving} />
                    <div>
                      <strong>{step.title}</strong>
                      {step.description ? <p className="plan-step-description">{step.description}</p> : null}
                      {step.dueDate ? (
                        <span>
                          {t('forms.due')} {step.dueDate}
                        </span>
                      ) : (
                        <span>{t('forms.noDeadline')}</span>
                      )}
                    </div>
                  </label>
                ))}
          </div>
        </div>

        <aside className="sidebar-panel">
          <h3>{t('forms.planLabel')}</h3>
          <ul className="side-list">
            <li>
              <strong>{t('profile.completed')}:</strong> {finishedSteps}/{totalSteps}
            </li>
            <li>
              <strong>{t('dashboard.progress')}:</strong>{' '}
              {progress === 100 ? t('dashboard.complete') : t('dashboard.started')}
            </li>
            <li>
              <strong>{t('forms.chooseCategory')}:</strong> {category?.title || t('common.uncategorized')}
            </li>
          </ul>

          <Link to="/my-plans" className="secondary-button button-link full-width">
            {t('dashboard.myPlans')}
          </Link>
        </aside>
      </div>

      <ConfirmDialog
        isOpen={deleteOpen}
        title={t('forms.deleteConfirm')}
        message={t('forms.deleteText')}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
      />
    </section>
  )
}

export default PlanDetailsPage
