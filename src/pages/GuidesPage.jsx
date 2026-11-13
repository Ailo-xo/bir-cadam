import { useMemo, useState } from 'react'
import GuideCard from '../components/GuideCard'
import SearchBar from '../components/SearchBar'
import SectionHeading from '../components/SectionHeading'
import { categories, guides } from '../data/siteData'

const GuidesPage = () => {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredGuides = useMemo(() => {
    return guides.filter((guide) => {
      const matchesQuery =
        guide.title.toLowerCase().includes(search.toLowerCase()) ||
        guide.description.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || guide.category === selectedCategory
      return matchesQuery && matchesCategory
    })
  }, [search, selectedCategory])

  return (
    <section className="page-section">
      <SectionHeading eyebrow="Гайды" title="Полезные материалы и инструкции" />

      <div className="filters-row">
        <SearchBar value={search} onChange={setSearch} placeholder="Поиск по названию или описанию" />
        <label className="filter-wrap compact">
          <span>Категория</span>
          <select value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)}>
            <option value="all">Все категории</option>
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
