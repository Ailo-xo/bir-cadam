import { useAppSettings } from '../context/AppSettingsContext'

const ProgressBar = ({ value = 0, label, showValue = true }) => {
  const { t } = useAppSettings()
  const safeValue = Math.min(100, Math.max(0, Number(value) || 0))

  return (
    <div className="progress-block">
      {label ? (
        <div className="progress-meta">
          <span>{label}</span>
          {showValue && <strong>{Math.round(safeValue)}%</strong>}
        </div>
      ) : null}
      <div className="progress-track" role="progressbar" aria-label={label || t('common.progressBar')} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(safeValue)}>
        <div className="progress-fill" style={{ width: `${safeValue}%` }} />
      </div>
    </div>
  )
}

export default ProgressBar
