import { ArrowRight, Clock3 } from 'lucide-react'
import { Link } from 'react-router-dom'

const GuideCard = ({ guide }) => {
  return (
    <article className="guide-card">
      <div className="guide-topline">
        <span className="resource-tag">{guide.category}</span>
        <span className="inline-pill">
          <Clock3 size={14} /> {guide.readTime}
        </span>
      </div>
      <h3>{guide.title}</h3>
      <p>{guide.description}</p>
      <div className="card-footer">
        <span>Проверено: {guide.lastVerified}</span>
        <Link to={`/guides/${guide.id}`}>
          Читать <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  )
}

export default GuideCard
