import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const CategoryCard = ({ category }) => {
  return (
    <article className="category-card">
      <div className="category-icon" aria-hidden="true">{category.icon}</div>
      <div className="category-meta">
        <h3>{category.title}</h3>
        <p>{category.description}</p>
      </div>
      <div className="card-footer">
        {category.guides ? <span>{category.guides} материалов</span> : <span>Материалы</span>}
        <Link to={`/categories/${category.id}`}>
          Подробнее <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  )
}

export default CategoryCard
