import { useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, MoonStar, SunMedium, X } from 'lucide-react'
import { useAppSettings } from '../context/AppSettingsContext'
import { useAuth } from '../context/AuthContext'
import LanguageSwitcher from './LanguageSwitcher'

const Layout = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, signOut } = useAuth()
  const { theme, setTheme, t } = useAppSettings()
  const navigate = useNavigate()
  const location = useLocation()

  const handlePointerMove = (event) => {
    if (event.pointerType !== 'mouse') return

    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--pointer-x', `${((event.clientX - rect.left) / rect.width) * 100}%`)
    event.currentTarget.style.setProperty('--pointer-y', `${((event.clientY - rect.top) / rect.height) * 100}%`)
  }

  const navItems = [
    { to: '/', label: t('nav.home') },
    { to: '/ai', label: t('nav.ai') },
    { to: '/about', label: t('nav.about') },
    { to: '/categories', label: t('nav.categories') },
    { to: '/guides', label: t('nav.guides') },
    { to: '/my-plans', label: t('nav.myPlans') },
    { to: '/profile', label: t('nav.profile') },
  ]

  const handleLogout = async () => {
    setMenuOpen(false)
    await signOut()
    navigate('/login')
  }

  return (
    <div className="page-shell" onPointerMove={handlePointerMove}>
      <div className="ambient-layer" aria-hidden="true">
        <span className="orb orb-1" />
        <span className="orb orb-2" />
        <span className="orb orb-3" />
        <span className="mesh mesh-1" />
        <span className="mesh mesh-2" />
        <span className="floating-sticker sticker-1">✦</span>
        <span className="floating-sticker sticker-2">↗</span>
        <span className="floating-sticker sticker-3">◎</span>
      </div>

      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">B</div>
          <div className="brand-text">BIR KADAM</div>
        </div>

        <nav className={`main-nav ${menuOpen ? 'open' : ''}`} aria-label={t('settings.mainMenu')}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
          <div className="mobile-nav-actions">
            <Link to="/create-plan" className="primary-button button-link" onClick={() => setMenuOpen(false)}>
              {t('nav.getStarted')}
            </Link>
            {user ? (
              <button type="button" className="secondary-button" onClick={handleLogout}>
                {t('nav.logout')}
              </button>
            ) : (
              <Link to="/login" className="secondary-button button-link" onClick={() => setMenuOpen(false)}>
                {t('nav.login')}
              </Link>
            )}
          </div>
          <LanguageSwitcher className="mobile-language-switcher" />
        </nav>

        <div className="topbar-actions">
          <div className="theme-switcher" aria-label={t('settings.theme')}>
            <button
              type="button"
              className="icon-toggle"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              aria-label={t('settings.toggleTheme')}
            >
              {theme === 'light' ? <MoonStar size={15} /> : <SunMedium size={15} />}
            </button>
          </div>

          <LanguageSwitcher />

          {user ? (
            <>
              <Link to="/create-plan" className="primary-button small-button button-link">
                {t('nav.getStarted')}
              </Link>
              <button type="button" className="secondary-button small-button" onClick={handleLogout}>
                {t('nav.logout')}
              </button>
            </>
          ) : (
            <>
              <Link to="/create-plan" className="primary-button small-button button-link">
                {t('nav.getStarted')}
              </Link>
              <Link to="/login" className="secondary-button small-button button-link">
                {t('nav.login')}
              </Link>
            </>
          )}

          <button
            type="button"
            className="mobile-menu-button"
            aria-label={t('settings.openMenu')}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      <main className="main-content">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            className="route-transition"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {location.state?.googleProfileSyncFailed ? (
              <div className="message-box error" role="status">
                {t('auth.googleProfileSyncWarning')}
              </div>
            ) : null}
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="site-footer">
        <div>
          <div className="brand-wrap brand-footer">
            <div className="brand-mark">B</div>
            <div className="brand-text">BIR KADAM</div>
          </div>
          <p>{t('footer.tagline')}</p>
        </div>

        <div className="footer-links">
          <Link to="/">{t('nav.home')}</Link>
          <Link to="/ai">{t('nav.ai')}</Link>
          <Link to="/categories">{t('nav.categories')}</Link>
          <Link to="/guides">{t('nav.guides')}</Link>
          <Link to="/create-plan">{t('nav.getStarted')}</Link>
        </div>
      </footer>
    </div>
  )
}

export default Layout
