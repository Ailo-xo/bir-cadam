import { Link } from 'react-router-dom'

const values = [
  'Понимание сложных жизненных ситуаций без перегруза информацией.',
  'Пошаговые маршруты, которые помогают перевести мысли в действия.',
  'Доверительный и понятный стиль коммуникации для пользователей в Кыргызстане.',
]

const AboutPage = () => {
  return (
    <section className="page-section">
      <div className="about-shell">
        <div className="about-copy">
          <span className="eyebrow accent">О проекте</span>
          <h1>BIR KADAM — инструмент для уверенных шагов.</h1>
          <p>
            Мы помогаем людям разбираться в повседневных ситуациях, формировать план действий и
            делать первый шаг без ощущения хаоса. Платформа соединяет структурированную информацию,
            личный кабинет и понятный маршрут решения задачи.
          </p>
          <ul className="proof-list">
            {values.map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
          <div className="cta-row">
            <Link to="/create-plan" className="primary-button button-link">
              Создать план
            </Link>
            <Link to="/guides" className="secondary-button button-link">
              Смотреть материалы
            </Link>
          </div>
        </div>

        <div className="about-side-card">
          <h3>Наша идея</h3>
          <p>
            Каждая проблема становится понятной, когда она разбита на реальные шаги, сроки и
            личные приоритеты.
          </p>
          <div className="value-grid">
            <div>
              <strong>7</strong>
              <span>категорий</span>
            </div>
            <div>
              <strong>6</strong>
              <span>примеров гайд-материалов</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutPage
