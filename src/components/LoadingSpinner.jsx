import { useAppSettings } from '../context/AppSettingsContext'

const LoadingSpinner = ({ label }) => {
  const { t } = useAppSettings()
  const resolvedLabel = label || t('common.loading')

  return (
    <div className="spinner-wrap" role="status" aria-live="polite">
      <span className="spinner" />
      <span>{resolvedLabel}</span>
    </div>
  )
}

export default LoadingSpinner
