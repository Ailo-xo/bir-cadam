import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Trash2 } from 'lucide-react'
import AssistantPlaceholder from '../components/AssistantPlaceholder'
import FormInput from '../components/FormInput'
import TextArea from '../components/TextArea'
import { categories } from '../data/siteData'
import { useAuth } from '../context/AuthContext'
import { createPlan } from '../services/planService'

const initialStep = () => ({ id: `step-${Date.now()}-${Math.random()}`, title: '', dueDate: '', completed: false })

const CreatePlanPage = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: categories[0].id,
  })
  const [steps, setSteps] = useState([initialStep()])
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)

  const isValid = useMemo(() => {
    return (
      form.title.trim() &&
      form.description.trim() &&
      steps.some((step) => step.title.trim())
    )
  }, [form, steps])

  const updateField = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const updateStep = (index, field, value) => {
    setSteps((current) =>
      current.map((step, stepIndex) => (stepIndex === index ? { ...step, [field]: value } : step)),
    )
  }

  const addStep = () => setSteps((current) => [...current, initialStep()])

  const removeStep = (index) => {
    setSteps((current) => (current.length === 1 ? current : current.filter((_, stepIndex) => stepIndex !== index)))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const nextErrors = {}

    if (!form.title.trim()) nextErrors.title = 'Введите название плана.'
    if (!form.description.trim()) nextErrors.description = 'Опишите вашу ситуацию.'
    if (!steps.some((step) => step.title.trim())) nextErrors.steps = 'Добавьте хотя бы один шаг.'

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
    } catch (error) {
      setErrors({ submit: error.message || 'Не удалось сохранить план.' })
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="page-section">
      <div className="form-shell">
        <div className="form-header">
          <div>
            <span className="eyebrow accent">План</span>
            <h1>Создать новый маршрут</h1>
          </div>
        </div>

        <div className="form-progress-meta">
          <span>Шаг 1 из 3</span>
          <div className="progress-track small-track">
            <div className="progress-fill" style={{ width: `${Math.min(100, ((form.title.trim() ? 1 : 0) + (form.description.trim() ? 1 : 0) + (steps.some((step) => step.title.trim()) ? 1 : 0)) / 3 * 100)}%` }} />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="plan-form">
          <div className="form-grid two-col">
            <FormInput
              label="Название плана"
              name="title"
              value={form.title}
              onChange={updateField}
              placeholder="Например: Поиск работы"
              error={errors.title}
            />

            <label className="form-field">
              <span>Категория</span>
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
            label="Описание ситуации"
            name="description"
            value={form.description}
            onChange={updateField}
            placeholder="Опишите, что нужно решить и какой результат вы хотите получить."
            error={errors.description}
          />

          <div className="steps-panel">
            <div className="section-inline-title">
              <h3>Шаги плана</h3>
              <button type="button" className="secondary-button small-button" onClick={addStep}>
                <Plus size={14} /> Добавить шаг
              </button>
            </div>

            {steps.map((step, index) => (
              <div key={step.id} className="step-editor">
                <FormInput
                  label={`Шаг ${index + 1}`}
                  name={`step-${index}`}
                  value={step.title}
                  onChange={(event) => updateStep(index, 'title', event.target.value)}
                  placeholder="Например: Составить резюме"
                />
                <FormInput
                  label="Срок"
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
              {saving ? 'Сохранение...' : 'Сохранить план'}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default CreatePlanPage
