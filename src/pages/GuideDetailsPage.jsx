import { Link, useParams } from 'react-router-dom'
import { Clock3, ExternalLink, ShieldCheck } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import { categories, guides } from '../data/siteData'

const GuideDetailsPage = () => {
  const { guideId } = useParams()
  const guide = guides.find((item) => item.id === guideId) || guides[0]
  const category = categories.find((item) => item.id === guide.category)

  return (
    <section className="page-section">
      <div className="detail-header">
        <div>
          <span className="eyebrow accent">Гид</span>
          <h1>{guide.title}</h1>
        </div>
        <Link to="/guides" className="secondary-button button-link">
          Все материалы
        </Link>
      </div>

      <div className="article-shell">
        <div className="article-panel">
          <div className="article-meta">
            <span className="resource-tag">{category?.title || 'Категория'}</span>
            <span className="inline-pill">
              <Clock3 size={14} /> {guide.readTime}
            </span>
          </div>

          <p className="lead-copy">{guide.description}</p>

          <div className="article-section">
            <h3>Пошаговый план</h3>
            <ol className="step-list">
              {guide.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>

          <div className="article-section">
            <h3>Полезные ресурсы</h3>
            <ul className="inline-list">
              {guide.resources.map((resource) => (
                <li key={resource}>{resource}</li>
              ))}
            </ul>
          </div>

          <div className="article-section">
            <h3>Полезные ссылки</h3>
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
            <span>Это демонстрационный материал для интерфейса и проверки структуры.</span>
          </div>
        </div>

        <aside className="sidebar-panel">
          <SectionHeading eyebrow="Информация" title="Важные детали" />
          <ul className="side-list">
            <li>
              <strong>Категория:</strong> {category?.title}
            </li>
            <li>
              <strong>Время чтения:</strong> {guide.readTime}
            </li>
            <li>
              <strong>Проверка:</strong> {guide.lastVerified}
            </li>
          </ul>

          <Link to="/create-plan" className="primary-button button-link full-width">
            Создать мой план <ExternalLink size={16} />
          </Link>
        </aside>
      </div>
    </section>
  )
}

export default GuideDetailsPage
