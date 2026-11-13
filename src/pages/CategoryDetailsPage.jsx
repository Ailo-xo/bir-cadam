import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import GuideCard from '../components/GuideCard'
import SearchBar from '../components/SearchBar'
import SectionHeading from '../components/SectionHeading'
import { categories, guides } from '../data/siteData'

const CategoryDetailsPage = () => {
  const { categoryId } = useParams()
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
  }, [category.id, search])

  return (
    <section className="page-section">
      <div className="detail-header">
        <div>
          <span className="eyebrow accent">Категория</span>
          <h1>{category.title}</h1>
        </div>
        <Link to="/categories" className="secondary-button button-link">
          Вернуться к категориям
        </Link>
      </div>

      <div className="category-summary-card">
        <div className="category-icon large" aria-hidden="true">{category.icon}</div>
        <div>
          <h3>{category.description}</h3>
          <p>
            Здесь собраны основные темы, понятные материалы и рекомендации, которые можно использовать
            как основу для личного плана.
          </p>
        </div>
      </div>

      <div className="filters-row compact-search">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Поиск по гиду или описанию"
        />
      </div>

      <SectionHeading eyebrow="Материалы" title="Связанные руководства" />
      <div className="resource-grid">
        {categoryGuides.map((guide) => (
          <GuideCard key={guide.id} guide={guide} />
        ))}
      </div>

      <SectionHeading eyebrow="Планы" title="Связанные действия" />
      <div className="plan-utility-grid">
        <div className="utility-card">
          <h3>Пошаговый план</h3>
          <p>Сформируйте простой маршрут действий и отмечайте прогресс по мере выполнения.</p>
          <Link to="/create-plan" className="text-link">
            Создать план →
          </Link>
        </div>
        <div className="utility-card">
          <h3>Личный кабинет</h3>
          <p>Сохраняйте всё в одном месте и возвращайтесь к своим актуальным задачам.</p>
          <Link to="/my-plans" className="text-link">
            Просмотреть планы →
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CategoryDetailsPage
