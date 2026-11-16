import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Sparkles, Target, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import CategoryCard from '../components/CategoryCard'
import GuideCard from '../components/GuideCard'
import SectionHeading from '../components/SectionHeading'
import { useAppSettings } from '../context/AppSettingsContext'
import { getLocalizedCategories, getLocalizedGuides } from '../data/siteData'

const HomePage = () => {
  const { language, t } = useAppSettings()
  const categories = getLocalizedCategories(language)
  const guides = getLocalizedGuides(language)

  const stats = [
    { label: t('home.statsCategories'), value: categories.length },
    { label: t('home.statsGuides'), value: guides.length },
    { label: t('home.statsLanguages'), value: 3 },
  ]

  const flowSteps = [t('home.step1'), t('home.step2'), t('home.step3')]

  const features = [
    {
      icon: <Target size={18} />,
      title: t('home.featureClarityTitle'),
      text: t('home.featureClarity'),
    },
    {
      icon: <Sparkles size={18} />,
      title: t('home.featureMaterialsTitle'),
      text: t('home.featureMaterials'),
    },
    {
      icon: <TrendingUp size={18} />,
      title: t('home.featureProgressTitle'),
      text: t('home.featureProgress'),
    },
  ]

  return (
    <>
      <motion.section
        className="hero-section"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="hero-copy">
          <span className="eyebrow">{t('home.eyebrow')}</span>
          <h1>{t('home.title')}</h1>
          <p className="hero-text">{t('home.subtitle')}</p>

          <div className="cta-row">
            <Link to="/create-plan" className="primary-button button-link">
              {t('home.ctaPrimary')} <ArrowRight size={18} />
            </Link>
            <Link to="/categories" className="secondary-button button-link">
              {t('home.ctaSecondary')}
            </Link>
            <Link to="/ai" className="secondary-button button-link">
              <Sparkles size={16} /> {t('home.aiCta')}
            </Link>
          </div>

          <ul className="proof-list" aria-label={t('home.sections.features')}>
            <li>
              <CheckCircle2 size={16} /> {t('home.list1')}
            </li>
            <li>
              <CheckCircle2 size={16} /> {t('home.list2')}
            </li>
            <li>
              <CheckCircle2 size={16} /> {t('home.list3')}
            </li>
          </ul>
        </div>

        <div className="hero-visual" aria-label={t('home.actionPlan')}>
          <div className="assistant-card">
            <div className="card-header">
              <span className="status-dot" />
              <span>{t('home.actionPlan')}</span>
            </div>

            <div className="chat-box">
              <div className="message user-message">{t('home.userMessage')}</div>
              <div className="message bot-message">{t('home.botMessage')}</div>
            </div>

            <div className="mini-plan">
              <span>{t('home.sampleRoute')}</span>
              <ul>
                <li>{t('home.definePath')}</li>
                <li>{t('home.prepareCv')}</li>
                <li>{t('home.findOpportunities')}</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section className="info-section stats-section" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.4 }}>
        <div className="stats-grid">
          {stats.map((item) => (
            <div key={item.label} className="stat-card">
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section className="info-section" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.4 }}>
        <SectionHeading eyebrow={t('home.sections.how')} title={t('home.whyIntro')} />

        <div className="flow-grid">
          {flowSteps.map((step, index) => (
            <motion.div
              key={step}
              className="flow-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
            >
              <span className="step-number">0{index + 1}</span>
              <p>{step}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section className="info-section" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.4 }}>
        <SectionHeading eyebrow={t('home.sections.categories')} title={t('home.findSolution')} />

        <div className="category-grid">
          {categories.slice(0, 6).map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </motion.section>

      <motion.section className="info-section" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.4 }}>
        <SectionHeading eyebrow={t('home.sections.features')} title={t('home.whyTitle')} />

        <div className="feature-grid">
          {features.map((feature, index) => (
            <motion.article
              key={feature.title}
              className="feature-card"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.32, delay: index * 0.08 }}
              whileHover={{ y: -8 }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </motion.article>
          ))}
        </div>
      </motion.section>

      <motion.section className="info-section resource-section" id="about" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.4 }}>
        <SectionHeading eyebrow={t('home.sections.guides')} title={t('home.materialsTitle')} />

        <div className="resource-grid">
          {guides.slice(0, 3).map((guide) => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
        </div>
      </motion.section>

      <motion.section className="info-section" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.4 }}>
        <div className="cta-banner expanded-cta">
          <div>
            <span className="eyebrow accent">{t('home.sections.cta')}</span>
            <h3>{t('home.ctaTitle')}</h3>
          </div>
          <Link to="/create-plan" className="primary-button button-link">
            {t('home.ctaPrimary')}
          </Link>
        </div>
      </motion.section>
    </>
  )
}

export default HomePage
