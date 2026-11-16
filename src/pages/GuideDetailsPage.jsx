import { Link, useParams } from 'react-router-dom'
import { Clock3, ExternalLink, ShieldCheck } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import { useAppSettings } from '../context/AppSettingsContext'
import { getLocalizedCategories, getLocalizedGuides } from '../data/siteData'

const GuideDetailsPage = () => {
  const { language, t } = useAppSettings()
  const { guideId } = useParams()
  const guides = getLocalizedGuides(language)
  const categories = getLocalizedCategories(language)
  const guide = guides.find((item) => item.id === guideId) || guides[0]
  const category = categories.find((item) => item.id === guide.category)

  return (
    <section className="page-section">
      <div className="detail-header">
        <div>
          <span className="eyebrow accent">{t('materials.guide')}</span>
          <h1>{guide.title}</h1>
        </div>
        <Link to="/guides" className="secondary-button button-link">
          {t('materials.allMaterials')}
        </Link>
      </div>

      <div className="article-shell">
        <div className="article-panel">
          <div className="article-meta">
            <span className="resource-tag">{category?.title || t('materials.category')}</span>
            <span className="inline-pill">
              <Clock3 size={14} /> {guide.readTime}
            </span>
          </div>

          <p className="lead-copy">{guide.description}</p>

          <div className="article-section">
            <h3>{t('materials.stepByStep')}</h3>
            <ol className="step-list">
              {guide.steps.map((step, index) => (
                <li key={`${step}-${index}`}>{step}</li>
              ))}
            </ol>
          </div>

          <div className="article-section">
            <h3>{t('materials.usefulResources')}</h3>
            <ul className="inline-list">
              {guide.resources.map((resource) => (
                <li key={resource}>{resource}</li>
              ))}
            </ul>
          </div>

          <div className="article-section">
            <h3>{t('materials.usefulLinks')}</h3>
            <ul className="inline-list">
              {(guide.sourceLinks || []).map((link) => (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="article-note">
            <ShieldCheck size={18} />
            <span>{t('materials.demoNote')}</span>
          </div>
        </div>

        <aside className="sidebar-panel">
          <SectionHeading eyebrow={t('materials.information')} title={t('materials.keyDetails')} />
          <ul className="side-list">
            <li>
              <strong>{t('materials.categoryLabel')}:</strong> {category?.title}
            </li>
            <li>
              <strong>{t('materials.readingTime')}:</strong> {guide.readTime}
            </li>
            <li>
              <strong>{t('materials.verification')}:</strong> {guide.lastVerified}
            </li>
          </ul>

          <Link to="/create-plan" className="primary-button button-link full-width">
            {t('materials.createMyPlan')} <ExternalLink size={16} />
          </Link>
        </aside>
      </div>
    </section>
  )
}

export default GuideDetailsPage
