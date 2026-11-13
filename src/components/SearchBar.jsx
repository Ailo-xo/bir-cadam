import { Search } from 'lucide-react'

const SearchBar = ({ value, onChange, placeholder = 'Поиск...' }) => {
  return (
    <label className="search-bar">
      <Search size={16} />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </label>
  )
}

export default SearchBar
