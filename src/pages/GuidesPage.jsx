import { useMemo, useState } from 'react'
import GuideCard from '../components/GuideCard'
import SearchBar from '../components/SearchBar'
import SectionHeading from '../components/SectionHeading'
import { useAppSettings } from '../context/AppSettingsContext'
import { getLocalizedCategories, getLocalizedGuides } from '../data/siteData'

const GuidesPage = () => {
  const { language, t } = useAppSettings()
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const categories = getLocalizedCategories(language)
  const guides = getLocalizedGuides(language)

  const filteredGuides = useMemo(() => {
    return guides.filter((guide) => {
      const matchesQuery =
        guide.title.toLowerCase().includes(search.toLowerCase()) ||
        guide.description.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || guide.category === selectedCategory
      return matchesQuery && matchesCategory
    })
  }, [guides, search, selectedCategory])

  return (
    <section className="page-section">
      <SectionHeading eyebrow={t('guidesPage.eyebrow')} title={t('guidesPage.title')} />

      <div className="filters-row">
        <SearchBar value={search} onChange={setSearch} placeholder={t('guidesPage.placeholder')} />
        <label className="filter-wrap compact">
          <span>{t('guidesPage.filterCategory')}</span>
          <select value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)}>
            <option value="all">{t('common.allCategories')}</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="resource-grid">
        {filteredGuides.map((guide) => (
          <GuideCard key={guide.id} guide={guide} />
        ))}
      </div>
    </section>
  )
}

export default GuidesPage
