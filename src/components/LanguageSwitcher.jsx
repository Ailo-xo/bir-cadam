import { useAppSettings } from '../context/AppSettingsContext'

const LanguageSwitcher = ({ className = '' }) => {
  const { language, setLanguage, t } = useAppSettings()

  return (
    <div className={`language-switch ${className}`} role="group" aria-label={t('settings.language')}>
      {['ky', 'ru', 'en'].map((option) => (
        <button
          key={option}
          type="button"
          className={language === option ? 'lang-button active' : 'lang-button'}
          aria-pressed={language === option}
          onClick={() => setLanguage(option)}
        >
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

export default LanguageSwitcher
