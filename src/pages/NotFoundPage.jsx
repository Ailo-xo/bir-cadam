import { Link } from 'react-router-dom'
import { useAppSettings } from '../context/AppSettingsContext'
import LanguageSwitcher from '../components/LanguageSwitcher'

const NotFoundPage = () => {
  const { t } = useAppSettings()

  return (
    <section className="not-found-page">
      <div className="not-found-card">
        <span className="eyebrow accent">404</span>
        <h1>{t('notFound.title')}</h1>
        <p>{t('notFound.description')}</p>
        <LanguageSwitcher />
        <Link to="/" className="primary-button button-link">
          {t('notFound.home')}
        </Link>
      </div>
    </section>
  )
}

export default NotFoundPage
