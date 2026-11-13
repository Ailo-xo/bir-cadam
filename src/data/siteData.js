export const categories = [
  {
    id: 'career',
    title: 'Работа и карьера',
    description: 'Резюме, поиск работы и подготовка к собеседованиям.',
    icon: '💼',
    guides: 8,
  },
  {
    id: 'education',
    title: 'Образование',
    description: 'Поступление, обучение и развитие профессиональных навыков.',
    icon: '🎓',
    guides: 6,
  },
  {
    id: 'documents',
    title: 'Документы',
    description: 'Оформление, восстановление и проверка необходимых документов.',
    icon: '📄',
    guides: 5,
  },
  {
    id: 'finance',
    title: 'Финансы',
    description: 'Личный бюджет, помощь и финансовая стабильность.',
    icon: '💰',
    guides: 7,
  },
  {
    id: 'life',
    title: 'Жизненные ситуации',
    description: 'Бытовые вопросы, переезд и адаптация в новых условиях.',
    icon: '🏠',
    guides: 9,
  },
  {
    id: 'social',
    title: 'Социальная помощь',
    description: 'Поддержка, льготы и доступ к социальным программам.',
    icon: '🤝',
    guides: 4,
  },
  {
    id: 'technology',
    title: 'Технологии',
    description: 'Компьютерная грамотность и простые цифровые решения.',
    icon: '💻',
    guides: 6,
  },
]

export const guides = [
  {
    id: 'guide-resume',
    title: 'Как составить сильное резюме для первой работы',
    description: 'Пошаговый план, который помогает структурировать опыт, слабые стороны и сильные стороны.',
    category: 'career',
    readTime: '5 минут',
    lastVerified: '2026-10-15',
    steps: [
      'Определите главную цель и тип работы.',
      'Соберите сведения о вашем опыте, образовании и навыках.',
      'Сделайте короткое и понятное описание.',
      'Проверьте, что контактные данные и формат читаются легко.',
    ],
    resources: ['CV template', 'Interview checklist'],
    sourceLinks: [
      { label: 'Шаблон резюме', href: 'https://example.com/cv-template' },
      { label: 'Список вопросов на собеседовании', href: 'https://example.com/interview-checklist' },
    ],
  },
  {
    id: 'guide-education',
    title: 'Как выбрать подходящее образование и направление',
    description: 'Разберитесь, какие критерии важно учитывать при выборе обучения и профессии.',
    category: 'education',
    readTime: '7 минут',
    lastVerified: '2026-09-01',
    steps: [
      'Определите, что вам интересно и что даётся легко.',
      'Сравните перспективы рынка и возможности обучения.',
      'Проверьте стоимость, график и уровень требований.',
      'Свяжитесь с преподавателями или специалистами для уточнений.',
    ],
    resources: ['Career map', 'Study guide'],
    sourceLinks: [
      { label: 'Карта карьерных направлений', href: 'https://example.com/career-map' },
      { label: 'Памятка по выбору обучения', href: 'https://example.com/study-guide' },
    ],
  },
  {
    id: 'guide-docs',
    title: 'Как восстановить утерянные документы',
    description: 'Действия, которые помогают понять, какие документы нужны и где их восстанавливать.',
    category: 'documents',
    readTime: '6 минут',
    lastVerified: '2026-08-24',
    steps: [
      'Сделайте список всех документов, которые были утеряны.',
      'Проверьте наличие копий и официальных записей.',
      'Подготовьте заявление и список необходимых бумаг.',
      'Следите за статусом запроса и сроками.',
    ],
    resources: ['Document checklist', 'Public service guide'],
    sourceLinks: [
      { label: 'Чек-лист документов', href: 'https://example.com/document-checklist' },
      { label: 'Гайд по государственным услугам', href: 'https://example.com/public-service-guide' },
    ],
  },
  {
    id: 'guide-finance',
    title: 'Как составить простой семейный бюджет',
    description: 'Планирование расходов и приоритетов на ближайшие месяцы без лишнего стресса.',
    category: 'finance',
    readTime: '8 минут',
    lastVerified: '2026-10-02',
    steps: [
      'Запишите ежемесячный доход и обязательные расходы.',
      'Выделите сумму на базовые нужды и накопления.',
      'Выберите 2–3 приоритета для ненужных трат.',
      'Проверяйте и корректируйте бюджет ежемесячно.',
    ],
    resources: ['Budget planner', 'Savings tracker'],
    sourceLinks: [
      { label: 'Планировщик бюджета', href: 'https://example.com/budget-planner' },
      { label: 'Трекер накоплений', href: 'https://example.com/savings-tracker' },
    ],
  },
  {
    id: 'guide-life',
    title: 'Как начать жизнь в новом городе',
    description: 'Практическая схема адаптации: жильё, работа, сеть контактов и базовые решения.',
    category: 'life',
    readTime: '9 минут',
    lastVerified: '2026-09-17',
    steps: [
      'Разделите задачу на жильё, работу и повседневные потребности.',
      'Подготовьте базовый список обязательных расходов.',
      'Найдите безопасные и понятные способы решения бытовых вопросов.',
      'Начните создавать сеть поддержки и привычки.',
    ],
    resources: ['Adaptation checklist', 'City guide'],
    sourceLinks: [
      { label: 'Чек-лист адаптации', href: 'https://example.com/adaptation-checklist' },
      { label: 'Путеводитель по городу', href: 'https://example.com/city-guide' },
    ],
  },
  {
    id: 'guide-social',
    title: 'Где искать поддержку и социальные услуги',
    description: 'Как понять, какая помощь доступна, и куда обращаться в сложной ситуации.',
    category: 'social',
    readTime: '6 минут',
    lastVerified: '2026-07-10',
    steps: [
      'Зафиксируйте основную проблему и тип поддержки.',
      'Ищите поддержку через местные организации и службы.',
      'Подготовьте документы и контактную информацию.',
      'Следите за сроками и корректируйте запрос при необходимости.',
    ],
    resources: ['Referral list', 'Support map'],
    sourceLinks: [
      { label: 'Список направлений поддержки', href: 'https://example.com/referral-list' },
      { label: 'Карта услуг', href: 'https://example.com/support-map' },
    ],
  },
]

export const categoryLabelMap = Object.fromEntries(
  categories.map((category) => [category.id, category.title]),
)

export const stepsTemplate = [
  'Опишите вашу ситуацию и выберите подходящую категорию.',
  'Добавьте важные шаги и сроки, которые реально помогут.',
  'Сохраните план и отмечайте выполненные пункты.',
]

export const demoPlans = [
  {
    id: 'plan-demo-1',
    userId: 'demo-user',
    title: 'Поиск первой работы',
    description: 'Составить понятный путь к работе без опыта и выбрать ближайший шаг.',
    category: 'career',
    createdAt: '2026-11-01T09:00:00.000Z',
    updatedAt: '2026-11-06T09:00:00.000Z',
    steps: [
      { id: 's-1', title: 'Определить сферу', completed: true, dueDate: '' },
      { id: 's-2', title: 'Подготовить резюме', completed: false, dueDate: '2026-11-14' },
      { id: 's-3', title: 'Подобрать вакансии', completed: false, dueDate: '2026-11-17' },
    ],
  },
]

export const categoriesWithIcons = categories
