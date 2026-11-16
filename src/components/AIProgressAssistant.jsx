import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import { useAppSettings } from '../context/AppSettingsContext'
import { callBIRAI, getAIErrorKey, isAIAvailable } from '../services/aiService'
import AISourceList from './AISourceList'

const AIProgressAssistant = ({ planId }) => {
  const { language, t } = useAppSettings()
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')
  const [resources, setResources] = useState([])
  const [error, setError] = useState('')

  const getGuidance = async () => {
    setLoading(true)
    setError('')
    setContent('')
    setResources([])
    try {
      const result = await callBIRAI({ action: 'progress', planId, language })
      setContent(result.content)
      setResources(result.resources || [])
    } catch (requestError) {
      setError(t(getAIErrorKey(requestError)))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="ai-progress-assistant">
      <button type="button" className="secondary-button small-button" onClick={getGuidance} disabled={loading || !isAIAvailable}>
        <Sparkles size={14} /> {loading ? t('ai.progressLoading') : t('ai.progressAction')}
      </button>
      {content ? <p className="ai-progress-copy">{content}</p> : null}
      <AISourceList resources={resources} />
      {error ? <p className="ai-progress-error" role="status">{error}</p> : null}
    </div>
  )
}

export default AIProgressAssistant
