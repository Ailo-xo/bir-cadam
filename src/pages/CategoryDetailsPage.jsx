import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import GuideCard from '../components/GuideCard'
import SearchBar from '../components/SearchBar'
import SectionHeading from '../components/SectionHeading'
import { useAppSettings } from '../context/AppSettingsContext'
import { getLocalizedCategories, getLocalizedGuides } from '../data/siteData'

const CategoryDetailsPage = () => {
  const { language, t } = useAppSettings()
  const { categoryId } = useParams()
  const categories = getLocalizedCategories(language)
  const guides = getLocalizedGuides(language)
  const category = categories.find((item) => item.id === categoryId) || categories[0]
  const [search, setSearch] = useState('')

  const categoryGuides = useMemo(() => {
    return guides.filter((guide) => {
      const matchesCategory = guide.category === category.id
      const matchesQuery =
        guide.title.toLowerCase().includes(search.toLowerCase()) ||
        guide.description.toLowerCase().includes(search.toLowerCase())
      return matchesCategory && matchesQuery
    })
  }, [category.id, guides, search])

  return (
    <section className="page-section">
      <div className="detail-header">
        <div>
          <span className="eyebrow accent">{t('materials.categoryLabel')}</span>
          <h1>{category.title}</h1>
        </div>
        <Link to="/categories" className="secondary-button button-link">
          {t('materials.backToCategories')}
        </Link>
      </div>

      <div className="category-summary-card">
        <div className="category-icon large" aria-hidden="true">{category.icon}</div>
        <div>
          <h3>{category.description}</h3>
          <p>{t('materials.descriptionSuffix')}</p>
        </div>
        <img className="category-summary-image" src={category.image} alt="" loading="lazy" decoding="async" />
      </div>

      <div className="filters-row compact-search">
        <SearchBar value={search} onChange={setSearch} placeholder={t('profile.searchByGuide')} />
      </div>

      <SectionHeading eyebrow={t('materials.category')} title={t('materials.relatedGuides')} />
      <div className="resource-grid">
        {categoryGuides.map((guide) => (
          <GuideCard key={guide.id} guide={guide} />
        ))}
      </div>

      <SectionHeading eyebrow={t('materials.category')} title={t('materials.relatedPlans')} />
      <div className="plan-utility-grid">
        <div className="utility-card">
          <h3>{t('materials.stepByStep')}</h3>
          <p>{t('materials.actionDescription')}</p>
          <Link to="/create-plan" className="text-link">
            {t('nav.getStarted')} →
          </Link>
        </div>
        <div className="utility-card">
          <h3>{t('profile.personalAccount')}</h3>
          <p>{t('materials.accountDescription')}</p>
          <Link to="/my-plans" className="text-link">
            {t('materials.viewPlans')} →
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CategoryDetailsPage
