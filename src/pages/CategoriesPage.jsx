import { Link } from 'react-router-dom'
import CategoryCard from '../components/CategoryCard'
import SectionHeading from '../components/SectionHeading'
import { useAppSettings } from '../context/AppSettingsContext'
import { getLocalizedCategories } from '../data/siteData'

const CategoriesPage = () => {
  const { language, t } = useAppSettings()
  const categories = getLocalizedCategories(language)

  return (
    <section className="page-section">
      <SectionHeading eyebrow={t('nav.categories')} title={t('home.chooseTopic')} />

      <div className="category-grid narrow-grid">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>

      <div className="cta-banner">
        <div>
          <span className="eyebrow accent">{t('home.supportTitle')}</span>
          <h3>{t('home.supportText')}</h3>
        </div>
        <Link to="/create-plan" className="primary-button button-link">
          {t('nav.getStarted')}
        </Link>
      </div>
    </section>
  )
}

export default CategoriesPage
