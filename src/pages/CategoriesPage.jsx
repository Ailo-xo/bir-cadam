import { Link } from 'react-router-dom'
import CategoryCard from '../components/CategoryCard'
import SectionHeading from '../components/SectionHeading'
import { categories } from '../data/siteData'

const CategoriesPage = () => {
  return (
    <section className="page-section">
      <SectionHeading eyebrow="Категории" title="Выберите тему, которая подходит вашему запросу" />

      <div className="category-grid narrow-grid">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>

      <div className="cta-banner">
        <div>
          <span className="eyebrow accent">Помощь в пути</span>
          <h3>Нужна система, а не случайный список советов?</h3>
        </div>
        <Link to="/create-plan" className="primary-button button-link">
          Создать план
        </Link>
      </div>
    </section>
  )
}

export default CategoriesPage
