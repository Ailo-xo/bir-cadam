import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Trash2 } from 'lucide-react'
import AssistantPlaceholder from '../components/AssistantPlaceholder'
import FormInput from '../components/FormInput'
import TextArea from '../components/TextArea'
import { useAppSettings } from '../context/AppSettingsContext'
import { useAuth } from '../context/AuthContext'
import { getLocalizedCategories } from '../data/siteData'
import { createPlan } from '../services/planService'

const initialStep = () => ({ id: `step-${Date.now()}-${Math.random()}`, title: '', dueDate: '', completed: false })

const CreatePlanPage = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { language, t } = useAppSettings()
  const categories = getLocalizedCategories(language)
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: categories[0].id,
  })
  const [steps, setSteps] = useState([initialStep()])
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)

  const isValid = useMemo(
    () => form.title.trim() && form.description.trim() && steps.some((step) => step.title.trim()),
    [form, steps],
  )

  const updateField = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const updateStep = (index, field, value) => {
    setSteps((current) => current.map((step, stepIndex) => (stepIndex === index ? { ...step, [field]: value } : step)))
  }

  const addStep = () => setSteps((current) => [...current, initialStep()])

  const removeStep = (index) => {
    setSteps((current) => (current.length === 1 ? current : current.filter((_, stepIndex) => stepIndex !== index)))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const nextErrors = {}

    if (!form.title.trim()) nextErrors.title = t('forms.validationTitle')
    if (!form.description.trim()) nextErrors.description = t('forms.validationDescription')
    if (!steps.some((step) => step.title.trim())) nextErrors.steps = t('forms.validationSteps')

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setSaving(true)

    try {
      await createPlan({
        userId: user?.uid || 'guest-user',
        title: form.title.trim(),
        description: form.description.trim(),
        category: form.category,
        steps: steps
          .filter((step) => step.title.trim())
          .map((step) => ({
            id: step.id,
            title: step.title.trim(),
            completed: false,
            dueDate: step.dueDate,
          })),
      })

      navigate('/my-plans')
    } catch {
      setErrors({ submit: t('forms.saveFailed') })
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="page-section">
      <div className="form-shell">
        <div className="form-header">
          <div>
            <span className="eyebrow accent">{t('forms.planLabel')}</span>
            <h1>{t('forms.createNewRoute')}</h1>
          </div>
        </div>

        <div className="form-progress-meta">
          <span>
            {t('common.step')} 1 {t('common.of')} 3
          </span>
          <div className="progress-track small-track">
            <div
              className="progress-fill"
              style={{
                width: `${Math.min(100, ((form.title.trim() ? 1 : 0) + (form.description.trim() ? 1 : 0) + (steps.some((step) => step.title.trim()) ? 1 : 0)) / 3 * 100)}%`,
              }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="plan-form">
          <div className="form-grid two-col">
            <FormInput
              label={t('forms.planName')}
              name="title"
              value={form.title}
              onChange={updateField}
              placeholder={t('forms.planTitlePlaceholder')}
              error={errors.title}
            />

            <label className="form-field">
              <span>{t('forms.chooseCategory')}</span>
              <select name="category" value={form.category} onChange={updateField}>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <TextArea
            label={t('forms.situationDescription')}
            name="description"
            value={form.description}
            onChange={updateField}
            placeholder={t('forms.situationPlaceholder')}
            error={errors.description}
          />

          <div className="steps-panel">
            <div className="section-inline-title">
              <h3>{t('forms.planSteps')}</h3>
              <button type="button" className="secondary-button small-button" onClick={addStep}>
                <Plus size={14} /> {t('forms.addStep')}
              </button>
            </div>

            {steps.map((step, index) => (
              <div key={step.id} className="step-editor">
                <FormInput
                  label={`${t('forms.stepLabel')} ${index + 1}`}
                  name={`step-${index}`}
                  value={step.title}
                  onChange={(event) => updateStep(index, 'title', event.target.value)}
                  placeholder={t('forms.stepPlaceholder')}
                />
                <FormInput
                  label={t('forms.deadline')}
                  type="date"
                  name={`deadline-${index}`}
                  value={step.dueDate}
                  onChange={(event) => updateStep(index, 'dueDate', event.target.value)}
                />
                <button type="button" className="icon-button" onClick={() => removeStep(index)}>
                  <Trash2 size={15} />
                </button>
              </div>
            ))}

            {errors.steps ? <small className="field-error">{errors.steps}</small> : null}
          </div>

          {errors.submit ? <div className="message-box error">{errors.submit}</div> : null}

          <AssistantPlaceholder />

          <div className="form-actions">
            <button type="submit" className="primary-button" disabled={!isValid || saving}>
              {saving ? t('common.saving') : t('common.savePlan')}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default CreatePlanPage
