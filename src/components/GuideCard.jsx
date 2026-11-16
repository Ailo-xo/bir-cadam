import { motion } from 'framer-motion'
import { ArrowRight, Clock3 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAppSettings } from '../context/AppSettingsContext'

const GuideCard = ({ guide }) => {
  const { t } = useAppSettings()

  return (
    <motion.article
      className="guide-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -8, scale: 1.01, rotateX: 2 }}
      transition={{ duration: 0.3 }}
    >
      <div className="guide-topline">
        <span className="resource-tag">{guide.categoryLabel || guide.category}</span>
        <span className="inline-pill">
          <Clock3 size={14} /> {guide.readTime}
        </span>
      </div>
      <h3>{guide.title}</h3>
      <p>{guide.description}</p>
      <div className="card-footer">
        <span>
          {t('common.verified')}: {guide.lastVerified}
        </span>
        <Link to={`/guides/${guide.id}`}>
          {t('home.read')} <ArrowRight size={16} />
        </Link>
      </div>
    </motion.article>
  )
}

export default GuideCard
