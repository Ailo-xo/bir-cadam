import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Sparkles, Target, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import CategoryCard from '../components/CategoryCard'
import GuideCard from '../components/GuideCard'
import SectionHeading from '../components/SectionHeading'
import { categories, guides } from '../data/siteData'

const stats = [
  { label: 'Категорий', value: '7' },
  { label: 'Проверенных материалов', value: '24+' },
  { label: 'Пошаговых планов', value: 'Готово' },
]

const flowSteps = [
  'Опишите конкретную жизненную ситуацию и запрос.',
  'Выберите нужную категорию и сохраняйте важные материалы.',
  'Постройте практический план и отмечайте прогресс.',
]

const features = [
  {
    icon: <Target size={18} />,
    title: 'Чёткая структура',
    text: 'Преобразуем сложный вопрос в понятный пошаговый маршрут.',
  },
  {
    icon: <Sparkles size={18} />,
    title: 'Проверенные материалы',
    text: 'Каждый гид подаётся как демонстрационный, полезный и понятный контент.',
  },
  {
    icon: <TrendingUp size={18} />,
    title: 'Прогресс и мотивация',
    text: 'Отмечайте задачи, сохраняйте результат и идите по шагам без перегруза.',
  },
]

const HomePage = () => {
  return (
    <>
      <motion.section
        className="hero-section"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="hero-copy">
          <span className="eyebrow">Кыргызстан → ясный путь</span>
          <h1>Каждая проблема начинается с одного шага.</h1>
          <p className="hero-text">
            BIR KADAM помогает понять сложные жизненные ситуации, найти подходящую информацию и
            превратить неопределённость в понятный план действий.
          </p>

          <div className="cta-row">
            <Link to="/create-plan" className="primary-button button-link">
              Создать план <ArrowRight size={18} />
            </Link>
            <Link to="/categories" className="secondary-button button-link">
              Изучить возможности
            </Link>
          </div>

          <ul className="proof-list" aria-label="Преимущества платформы">
            <li>
              <CheckCircle2 size={16} /> Проверенные инструкции и пошаговые рекомендации
            </li>
            <li>
              <CheckCircle2 size={16} /> Личный план действий с отслеживанием прогресса
            </li>
            <li>
              <CheckCircle2 size={16} /> Простота и понятность для повседневных задач
            </li>
          </ul>
        </div>

        <div className="hero-visual" aria-label="Панель плана действий">
          <div className="assistant-card">
            <div className="card-header">
              <span className="status-dot" />
              <span>План действий</span>
            </div>

            <div className="chat-box">
              <div className="message user-message">Хочу найти работу, но опыта пока мало.</div>
              <div className="message bot-message">
                Начнём с основы: выберите направление, подготовьте резюме и сформируйте первый шаг.
              </div>
            </div>

            <div className="mini-plan">
              <span>Пример маршрута</span>
              <ul>
                <li>Определить сферу</li>
                <li>Подготовить резюме</li>
                <li>Подобрать вакансии</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      <section className="info-section stats-section">
        <div className="stats-grid">
          {stats.map((item) => (
            <div key={item.label} className="stat-card">
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="info-section">
        <SectionHeading eyebrow="Как это работает" title="Пошаговый маршрут решения проблемы" />

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
      </section>

      <section className="info-section">
        <SectionHeading eyebrow="Категории" title="Найдите решение по вашему вопросу" />

        <div className="category-grid">
          {categories.slice(0, 6).map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      <section className="info-section">
        <SectionHeading eyebrow="Преимущества" title="Почему люди выбирают BIR KADAM" />

        <div className="feature-grid">
          {features.map((feature) => (
            <article key={feature.title} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="info-section resource-section" id="about">
        <SectionHeading eyebrow="Полезные материалы" title="Полезные гайды и инструкции" />

        <div className="resource-grid">
          {guides.slice(0, 3).map((guide) => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
        </div>
      </section>

      <section className="info-section">
        <div className="cta-banner expanded-cta">
          <div>
            <span className="eyebrow accent">Готовы начать?</span>
            <h3>Сформируйте первый шаг для своей ситуации уже сегодня.</h3>
          </div>
          <Link to="/create-plan" className="primary-button button-link">
            Создать план
          </Link>
        </div>
      </section>
    </>
  )
}

export default HomePage
