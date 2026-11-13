import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const navItems = [
  { to: '/', label: 'Главная' },
  { to: '/about', label: 'О проекте' },
  { to: '/categories', label: 'Категории' },
  { to: '/guides', label: 'Гайды' },
  { to: '/my-plans', label: 'Мои планы' },
  { to: '/profile', label: 'Профиль' },
]

const Layout = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    setMenuOpen(false)
  }, [navigate])

  const handleLogout = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">B</div>
          <div className="brand-text">BIR KADAM</div>
        </div>

        <nav className={`main-nav ${menuOpen ? 'open' : ''}`} aria-label="Главное меню">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="topbar-actions">
          <div className="language-switch" aria-label="Язык">
            <span>KY</span>
            <span>RU</span>
            <span>EN</span>
          </div>

          {user ? (
            <>
              <Link to="/create-plan" className="primary-button small-button button-link">
                Создать план
              </Link>
              <button type="button" className="secondary-button small-button" onClick={handleLogout}>
                Выйти
              </button>
            </>
          ) : (
            <>
              <Link to="/create-plan" className="primary-button small-button button-link">
                Get Started
              </Link>
              <Link to="/login" className="secondary-button small-button button-link">
                Войти
              </Link>
            </>
          )}

          <button
            type="button"
            className="mobile-menu-button"
            aria-label="Открыть меню"
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div>
          <div className="brand-wrap brand-footer">
            <div className="brand-mark">B</div>
            <div className="brand-text">BIR KADAM</div>
          </div>
          <p>Каждая проблема начинается с одного шага.</p>
        </div>

        <div className="footer-links">
          <Link to="/">Главная</Link>
          <Link to="/categories">Категории</Link>
          <Link to="/guides">Материалы</Link>
          <Link to="/create-plan">Создать план</Link>
        </div>
      </footer>
    </div>
  )
}

export default Layout
