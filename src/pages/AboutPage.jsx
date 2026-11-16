import { Link } from 'react-router-dom'
import { useAppSettings } from '../context/AppSettingsContext'
import { getLocalizedCategories, getLocalizedGuides } from '../data/siteData'

const AboutPage = () => {
  const { language, t } = useAppSettings()
  const categories = getLocalizedCategories(language)
  const guides = getLocalizedGuides(language)

  const values = [t('about.value1'), t('about.value2'), t('about.value3')]

  return (
    <section className="page-section">
      <div className="about-shell">
        <div className="about-copy">
          <span className="eyebrow accent">{t('nav.about')}</span>
          <h1>{t('about.title')}</h1>
          <p>{t('about.text')}</p>
          <ul className="proof-list">
            {values.map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
          <div className="cta-row">
            <Link to="/create-plan" className="primary-button button-link">
              {t('nav.getStarted')}
            </Link>
            <Link to="/guides" className="secondary-button button-link">
              {t('about.view')}
            </Link>
          </div>
        </div>

        <div className="about-side-card">
          <h3>{t('about.idea')}</h3>
          <p>{t('about.ideaText')}</p>
          <div className="value-grid">
            <div>
              <strong>{categories.length}</strong>
              <span>{t('about.categories')}</span>
            </div>
            <div>
              <strong>{guides.length}</strong>
              <span>{t('about.guideExamples')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutPage
