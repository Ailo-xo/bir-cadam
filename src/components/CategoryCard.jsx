import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAppSettings } from '../context/AppSettingsContext'

const CategoryCard = ({ category }) => {
  const { language, t } = useAppSettings()
  const materialCount = Number(category.guides) || 0
  const materialPlural = language === 'ru'
    ? new Intl.PluralRules('ru').select(materialCount)
    : materialCount === 1 ? 'one' : 'other'
  const materialLabel = materialPlural === 'one'
    ? t('common.materialOne')
    : language === 'ru' && materialPlural === 'few'
      ? t('common.materialFew')
      : t('common.materials')

  return (
    <motion.article
      className="category-card"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -8, rotateX: 2, rotateY: -2 }}
      transition={{ duration: 0.28 }}
    >
      <div className="category-photo">
        <img src={category.image} alt="" loading="lazy" decoding="async" />
        <span className="category-icon" aria-hidden="true">{category.icon}</span>
      </div>
      <div className="category-meta">
        <h3>{category.title}</h3>
        <p>{category.description}</p>
      </div>
      <div className="card-footer">
        {category.guides ? (
          <span>
            {materialCount} {materialLabel}
          </span>
        ) : (
          <span>{t('common.readMore')}</span>
        )}
        <Link to={`/categories/${category.id}`}>
          {t('common.readMore')} <ArrowRight size={16} />
        </Link>
      </div>
    </motion.article>
  )
}

export default CategoryCard
