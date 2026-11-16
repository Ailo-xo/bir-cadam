import { Search } from 'lucide-react'
import { useAppSettings } from '../context/AppSettingsContext'

const SearchBar = ({ value, onChange, placeholder }) => {
  const { t } = useAppSettings()

  return (
    <label className="search-bar">
      <Search size={16} />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder || t('common.searchPlaceholder')}
      />
    </label>
  )
}

export default SearchBar
