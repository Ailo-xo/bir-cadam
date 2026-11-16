import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Save, Trash2 } from 'lucide-react'
import AISourceList from './AISourceList'
import { useAppSettings } from '../context/AppSettingsContext'
import { getLocalizedCategories } from '../data/siteData'
import { callBIRAI, getAIErrorKey } from '../services/aiService'

const createDraft = (plan) => ({
  ...plan,
  steps: (plan.steps || []).map((step) => ({
    ...step,
    id: globalThis.crypto?.randomUUID?.() || `draft-${Date.now()}-${Math.random()}`,
  })),
})

const AIPlanPreview = ({ conversationId, messageId, plan, savedPlanId }) => {
  const { language, t } = useAppSettings()
  const [draft, setDraft] = useState(() => createDraft(plan))
  const [saving, setSaving] = useState(false)
  const [savedId, setSavedId] = useState(savedPlanId || '')
  const [error, setError] = useState('')
  const category = getLocalizedCategories(language).find((item) => item.id === draft.category)

  const updateStep = (stepId, field, value) => {
    setDraft((current) => ({
      ...current,
      steps: current.steps.map((step) => (step.id === stepId ? { ...step, [field]: value } : step)),
    }))
  }

  const save = async () => {
    setSaving(true)
    setError('')
    try {
      const result = await callBIRAI({
        action: 'savePlan',
        conversationId,
        messageId,
        plan: draft,
        language,
      })
      setSavedId(result.planId)
    } catch (saveError) {
      setError(t(getAIErrorKey(saveError)))
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="ai-plan-preview" aria-label={t('ai.planPreview')}>
      <div className="ai-plan-header">
        <div>
          <span className="eyebrow accent">{t('ai.planPreview')}</span>
          <h3>{t('ai.planTitle')}</h3>
        </div>
        <span className="resource-tag">{category?.title || t('common.uncategorized')}</span>
      </div>

      <label className="form-field">
        <span>{t('ai.planTitle')}</span>
        <input
          value={draft.title}
          maxLength={160}
          disabled={Boolean(savedId)}
          onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))}
        />
      </label>

      <div className="ai-plan-summary">
        <p><strong>{t('ai.goal')}:</strong> {draft.goal}</p>
        <p>{draft.description}</p>
      </div>

      <div className="ai-plan-steps">
        <div className="section-inline-title">
          <h4>{t('ai.steps')}</h4>
          {!savedId ? (
            <button
              type="button"
              className="secondary-button small-button"
              onClick={() =>
                setDraft((current) => ({
                  ...current,
                  steps: [
                    ...current.steps,
                    {
                      id: globalThis.crypto?.randomUUID?.() || `draft-${Date.now()}-${Math.random()}`,
                      title: '',
                      description: '',
                    },
                  ],
                }))
              }
            >
              <Plus size={14} /> {t('ai.addStep')}
            </button>
          ) : null}
        </div>

        {draft.steps.map((step, index) => (
          <div className="ai-plan-step" key={step.id}>
            <span className="ai-step-index">{index + 1}</span>
            <div className="ai-plan-step-fields">
              <label className="form-field">
                <span>{t('ai.stepTitle')}</span>
                <input
                  value={step.title}
                  maxLength={160}
                  disabled={Boolean(savedId)}
                  onChange={(event) => updateStep(step.id, 'title', event.target.value)}
                />
              </label>
              <label className="form-field">
                <span>{t('ai.stepDescription')}</span>
                <textarea
                  rows={2}
                  value={step.description}
                  maxLength={1200}
                  disabled={Boolean(savedId)}
                  onChange={(event) => updateStep(step.id, 'description', event.target.value)}
                />
              </label>
            </div>
            {!savedId && draft.steps.length > 1 ? (
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

      {draft.warnings ? <p className="ai-plan-warning">{draft.warnings}</p> : null}
      {draft.expectedOutcome ? (
        <p className="ai-plan-outcome"><strong>{t('ai.expectedOutcome')}:</strong> {draft.expectedOutcome}</p>
      ) : null}
      <AISourceList resources={draft.resources} />
      <p className="ai-source-note">{t('ai.sourceNote')}</p>
      {error ? <div className="message-box error">{error}</div> : null}

      {savedId ? (
        <Link className="primary-button button-link" to={`/my-plans/${savedId}`}>
          {t('ai.openSavedPlan')}
        </Link>
      ) : (
        <button
          type="button"
          className="primary-button"
          onClick={save}
          disabled={saving || !draft.title.trim() || !draft.steps.length || draft.steps.some((step) => !step.title.trim() || !step.description.trim())}
        >
          <Save size={16} /> {saving ? t('common.saving') : t('ai.savePlan')}
        </button>
      )}
    </section>
  )
}

export default AIPlanPreview
