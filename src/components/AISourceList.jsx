import { ExternalLink } from 'lucide-react'
import { useAppSettings } from '../context/AppSettingsContext'
import { formatLocalizedDate } from '../utils/formatDate'

const AISourceList = ({ resources = [] }) => {
  const { language, t } = useAppSettings()
  if (!resources.length) return null

  return (
    <section className="ai-source-list" aria-label={t('ai.verifiedSources')}>
      <h4>{t('ai.verifiedSources')}</h4>
      {resources.map((resource) => (
        <article className="ai-source-item" key={resource.id}>
          <a href={resource.url} target="_blank" rel="noopener noreferrer">
            {resource.name} <ExternalLink size={13} />
          </a>
          <p><strong>{t('ai.publisher')}:</strong> {resource.publisher}</p>
          <p><strong>{t('ai.country')}:</strong> {t('ai.countryKG')}</p>
          <p>
            <strong>{t('ai.languages')}:</strong>{' '}
            {resource.languages.map((item) => t(`ai.languageNames.${item}`)).join(', ')}
          </p>
          <p><strong>{t('ai.lastVerified')}:</strong> {formatLocalizedDate(resource.lastVerified, language)}</p>
          <p><strong>{t('ai.verificationStatus')}:</strong> {t('ai.officialHomepageChecked')}</p>
        </article>
      ))}
    </section>
  )
}

export default AISourceList
