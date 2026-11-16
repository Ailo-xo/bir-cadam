import { useAppSettings } from '../context/AppSettingsContext'
import { Link } from 'react-router-dom'

const AssistantPlaceholder = () => {
  const { t } = useAppSettings()

  return (
    <div className="assistant-placeholder">
      <div className="assistant-badge">{t('assistant.badge')}</div>
      <h3>{t('assistant.title')}</h3>
      <p>{t('assistant.description')}</p>
      <Link to="/ai" className="secondary-button button-link">{t('assistant.open')}</Link>
    </div>
  )
}

export default AssistantPlaceholder
