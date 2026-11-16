import { useAppSettings } from '../context/AppSettingsContext'

const PageLoader = ({ label }) => {
  const { t } = useAppSettings()

  return (
    <div className="page-loader skeleton-loader" role="status" aria-live="polite">
      <span className="loading-label">{label || t('common.loading')}</span>
      <div className="skeleton-grid" aria-hidden="true">
        <span className="skeleton-line wide" />
        <span className="skeleton-line" />
        <span className="skeleton-line short" />
      </div>
    </div>
  )
}

export default PageLoader
