import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import FilterDropdown from '../components/FilterDropdown'
import PlanCard from '../components/PlanCard'
import SearchBar from '../components/SearchBar'
import SectionHeading from '../components/SectionHeading'
import { useAuth } from '../context/AuthContext'
import { categories } from '../data/siteData'
import { getPlansForUser } from '../services/planService'

const MyPlansPage = () => {
  const { user } = useAuth()
  const [plans, setPlans] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [progress, setProgress] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPlans = async () => {
      if (!user?.uid) return

      setLoading(true)
      const data = await getPlansForUser(user.uid)
      setPlans(data)
      setLoading(false)
    }

    loadPlans()
  }, [user])

  const filteredPlans = useMemo(() => {
    return plans.filter((plan) => {
      const totalSteps = plan.steps?.length || 0
      const completedSteps = (plan.steps || []).filter((step) => step.completed).length
      const percent = totalSteps ? Math.round((completedSteps / totalSteps) * 100) : 0
      const matchesSearch = plan.title.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = category === 'all' || plan.category === category
      const matchesProgress =
        progress === 'all' ||
        (progress === 'started' && percent > 0) ||
        (progress === 'complete' && percent === 100) ||
        (progress === 'empty' && percent === 0)

      return matchesSearch && matchesCategory && matchesProgress
    })
  }, [plans, search, category, progress])

  return (
    <section className="page-section">
      <div className="detail-header">
        <div>
          <span className="eyebrow accent">Личный кабинет</span>
          <h1>Мои планы</h1>
        </div>
        <Link to="/create-plan" className="primary-button button-link">
          Создать план
        </Link>
      </div>

      <div className="filters-row">
        <SearchBar value={search} onChange={setSearch} placeholder="Поиск по названию" />
        <FilterDropdown
          label="Категория"
          value={category}
          onChange={setCategory}
          options={[{ value: 'all', label: 'Все категории' }, ...categories.map((item) => ({ value: item.id, label: item.title }))]}
        />
        <FilterDropdown
          label="Прогресс"
          value={progress}
          onChange={setProgress}
          options={[
            { value: 'all', label: 'Все статусы' },
            { value: 'started', label: 'В процессе' },
            { value: 'complete', label: 'Завершён' },
            { value: 'empty', label: 'Не начат' },
          ]}
        />
      </div>

      {loading ? (
        <div className="page-loader">Загрузка планов...</div>
      ) : filteredPlans.length === 0 ? (
        <EmptyState
          title="У вас пока нет планов"
          description="Создайте первый маршрут и начинайте двигаться к заметным результатам."
          action={<Link to="/create-plan" className="primary-button button-link">Создать план</Link>}
        />
      ) : (
        <div className="plan-grid">
          {filteredPlans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      )}
    </section>
  )
}

export default MyPlansPage
