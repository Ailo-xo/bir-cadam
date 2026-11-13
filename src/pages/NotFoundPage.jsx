import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <section className="not-found-page">
      <div className="not-found-card">
        <span className="eyebrow accent">404</span>
        <h1>Страница не найдена</h1>
        <p>Такой страницы не существует, но вы всё ещё можете вернуться к главной.</p>
        <Link to="/" className="primary-button button-link">
          На главную
        </Link>
      </div>
    </section>
  )
}

export default NotFoundPage
