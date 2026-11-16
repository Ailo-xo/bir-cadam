const localizeText = (value, language = 'ru') => {
  if (typeof value === 'string') return value
  if (!value || typeof value !== 'object') return ''
  return value[language] || value.ru || ''
}

const localizeList = (value, language = 'ru') => {
  if (Array.isArray(value)) return value
  if (!value || typeof value !== 'object') return []
  return value[language] || value.ru || []
}

export const categories = [
  {
    id: 'career',
    title: {
      ru: 'Работа и карьера',
      en: 'Work and career',
      ky: 'Жумуш жана карьера',
    },
    description: {
      ru: 'Резюме, поиск работы и подготовка к собеседованиям.',
      en: 'CVs, job search, and interview preparation.',
      ky: 'Резюме, жумушка орношуу жана жолугушуу даярдыгы.',
    },
    icon: '💼',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80',
    guides: 8,
  },
  {
    id: 'education',
    title: {
      ru: 'Образование',
      en: 'Education',
      ky: 'Билим',
    },
    description: {
      ru: 'Поступление, обучение и развитие профессиональных навыков.',
      en: 'Admissions, study, and professional growth.',
      ky: 'Киришүү, окуу жана кесиптик чеберчилик.',
    },
    icon: '🎓',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
    guides: 6,
  },
  {
    id: 'documents',
    title: {
      ru: 'Документы',
      en: 'Documents',
      ky: 'Документтер',
    },
    description: {
      ru: 'Оформление, восстановление и проверка необходимых документов.',
      en: 'Registration, restoration, and verification of documents.',
      ky: 'Документтерди тапшыруу, калыбына келтирүү жана текшерүү.',
    },
    icon: '📄',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80',
    guides: 5,
  },
  {
    id: 'finance',
    title: {
      ru: 'Финансы',
      en: 'Finance',
      ky: 'Каржы',
    },
    description: {
      ru: 'Личный бюджет, помощь и финансовая стабильность.',
      en: 'Personal budget, support, and financial stability.',
      ky: 'Жеке бюджет, жардам жана каржылык туруктуулук.',
    },
    icon: '💰',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80',
    guides: 7,
  },
  {
    id: 'life',
    title: {
      ru: 'Жизненные ситуации',
      en: 'Life situations',
      ky: 'Жашоо кырдаалдары',
    },
    description: {
      ru: 'Бытовые вопросы, переезд и адаптация в новых условиях.',
      en: 'Household issues, relocation, and adaptation to new conditions.',
      ky: 'Күнүмдүк маселелер, көчүп баруу жана жаңы шарттарга көнүү.',
    },
    icon: '🏠',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
    guides: 9,
  },
  {
    id: 'social',
    title: {
      ru: 'Социальная помощь',
      en: 'Social support',
      ky: 'Социалдык жардам',
    },
    description: {
      ru: 'Поддержка, льготы и доступ к социальным программам.',
      en: 'Support, benefits, and access to social programs.',
      ky: 'Колдоо, жеңилдиктер жана социалдык программаларга жетүү.',
    },
    icon: '🤝',
    image: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=800&q=80',
    guides: 4,
  },
  {
    id: 'technology',
    title: {
      ru: 'Технологии',
      en: 'Technology',
      ky: 'Технология',
    },
    description: {
      ru: 'Компьютерная грамотность и простые цифровые решения.',
      en: 'Digital literacy and easy everyday tech solutions.',
      ky: 'Компьютердик сабаттуулук жана жөнөкөй санариптик чечимдер.',
    },
    icon: '💻',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    guides: 6,
  },
]

export const guides = [
  {
    id: 'guide-resume',
    title: {
      ru: 'Как составить сильное резюме для первой работы',
      en: 'How to write a strong CV for your first job',
      ky: 'Биринчи жумушка ылайыктуу күчтүү резюме түзүү',
    },
    description: {
      ru: 'Пошаговый план, который помогает структурировать опыт, сильные стороны и цели.',
      en: 'A step-by-step plan for structuring your experience, strengths, and goals.',
      ky: 'Тажрыйбаңыз, күчтүү жактарыңыз жана максаттарыңызды структуралаштырууга жардам берчү кадам-кадам план.',
    },
    category: 'career',
    readTime: { ru: '5 минут', en: '5 min', ky: '5 мүнөт' },
    lastVerified: { ru: '2026-10-15', en: '2026-10-15', ky: '2026-10-15' },
    steps: {
      ru: [
        'Определите главную цель и тип работы.',
        'Соберите сведения о вашем опыте, образовании и навыках.',
        'Сделайте короткое и понятное описание.',
        'Проверьте, что контактные данные и формат читаются легко.',
      ],
      en: [
        'Define the main goal and type of work.',
        'Collect information about your experience, education, and skills.',
        'Write a short and clear description.',
        'Check that your contact details and layout are easy to read.',
      ],
      ky: [
        'Башкы максатты жана жумуштун түрүн аныктаңыз.',
        'Тажрыйбаңыз, билим, дағдылар жөнүндө маалымат жыйнаңыз.',
        'Кыска жана түшүнүктүү сүрөттөмө түзүңүз.',
        'Байланыш маалыматтары жана форматтар оңой окулушун текшериңиз.',
      ],
    },
    resources: {
      ru: ['Резюме: шаблон', 'Список вопросов для собеседования'],
      en: ['CV template', 'Interview checklist'],
      ky: ['Резюменин үлгүсү', 'Маектешүүгө даярдык тизмеси'],
    },
    sourceLinks: {
      ru: [
        { label: 'Шаблон резюме', href: 'https://example.com/cv-template' },
        { label: 'Список вопросов на собеседовании', href: 'https://example.com/interview-checklist' },
      ],
      en: [
        { label: 'CV template', href: 'https://example.com/cv-template' },
        { label: 'Interview checklist', href: 'https://example.com/interview-checklist' },
      ],
      ky: [
        { label: 'Резюменин үлгүсү', href: 'https://example.com/cv-template' },
        { label: 'Маектешүү үчүн суроолордун тизмеси', href: 'https://example.com/interview-checklist' },
      ],
    },
  },
  {
    id: 'guide-education',
    title: {
      ru: 'Как выбрать подходящее образование и направление',
      en: 'How to choose the right education and field',
      ky: 'Туура билим жана багытты кантип тандаш керек',
    },
    description: {
      ru: 'Разберитесь, какие критерии важно учитывать при выборе обучения и профессии.',
      en: 'Understand which criteria matter when choosing a study path and profession.',
      ky: 'Окуу жана кесип тандоодо кандай критерийлер маанилүү экенин түшүнүңүз.',
    },
    category: 'education',
    readTime: { ru: '7 минут', en: '7 min', ky: '7 мүнөт' },
    lastVerified: { ru: '2026-09-01', en: '2026-09-01', ky: '2026-09-01' },
    steps: {
      ru: [
        'Определите, что вам интересно и что даётся легко.',
        'Сравните перспективы рынка и возможности обучения.',
        'Проверьте стоимость, график и уровень требований.',
        'Свяжитесь с преподавателями или специалистами для уточнений.',
      ],
      en: [
        'Decide what interests you and what comes naturally.',
        'Compare market prospects and study opportunities.',
        'Check the cost, schedule, and requirements.',
        'Consult teachers or specialists for clarification.',
      ],
      ky: [
        'Эмне сизге кызыктуу жана эмнеге оңой келет, аны аныктаңыз.',
        'Базардын мүмкүнчүлүктөрүн жана окуу варианттарын салыштырыңыз.',
        'Баасын, графигин жана талаптарды текшериңиз.',
        'Көбүрөөк маалымат алуу үчүн мугалимдер же адистер менен байланышыңыз.',
      ],
    },
    resources: {
      ru: ['Карта профессиональных направлений', 'Памятка по выбору обучения'],
      en: ['Career map', 'Study guide'],
      ky: ['Кесиптик багыттардын картасы', 'Окууну тандоо боюнча колдонмо'],
    },
    sourceLinks: {
      ru: [
        { label: 'Карта карьерных направлений', href: 'https://example.com/career-map' },
        { label: 'Памятка по выбору обучения', href: 'https://example.com/study-guide' },
      ],
      en: [
        { label: 'Career map', href: 'https://example.com/career-map' },
        { label: 'Study guide', href: 'https://example.com/study-guide' },
      ],
      ky: [
        { label: 'Кесип багытынын картасы', href: 'https://example.com/career-map' },
        { label: 'Окуу багытын тандоо боюнча колдонмо', href: 'https://example.com/study-guide' },
      ],
    },
  },
  {
    id: 'guide-docs',
    title: {
      ru: 'Как восстановить утерянные документы',
      en: 'How to restore lost documents',
      ky: 'Жоголгон документтерди кантип калыбына келтирүү керек',
    },
    description: {
      ru: 'Действия, которые помогают понять, какие документы нужны и где их восстанавливать.',
      en: 'Steps to understand which documents are missing and where to restore them.',
      ky: 'Кайсы документтер жетишсиз экенин жана аларды кайда калыбына келтирүү керектигин түшүнүүгө жардам берүүчү кадамдар.',
    },
    category: 'documents',
    readTime: { ru: '6 минут', en: '6 min', ky: '6 мүнөт' },
    lastVerified: { ru: '2026-08-24', en: '2026-08-24', ky: '2026-08-24' },
    steps: {
      ru: [
        'Сделайте список всех документов, которые были утеряны.',
        'Проверьте наличие копий и официальных записей.',
        'Подготовьте заявление и список необходимых бумаг.',
        'Следите за статусом запроса и сроками.',
      ],
      en: [
        'List every document that was lost.',
        'Check whether copies or official records exist.',
        'Prepare the application and required documents.',
        'Track the status of your request and deadlines.',
      ],
      ky: [
        'Жоголгон бардык документтердин тизмесін түзүңүз.',
        'Көчүрмөлөр жана расмий жазуулар бар-жоктугун текшериңиз.',
        'Мыйзамдуу өтүнмө жана талап кылынган документтерди даярдаңыз.',
        'Суранышыңыздын абалы менен мөөнөтүн көзөмөлдөңүз.',
      ],
    },
    resources: {
      ru: ['Список документов', 'Руководство по государственным услугам'],
      en: ['Document checklist', 'Public service guide'],
      ky: ['Документтерди текшерүү тизмеси', 'Мамлекеттик кызматтар боюнча колдонмо'],
    },
    sourceLinks: {
      ru: [
        { label: 'Чек-лист документов', href: 'https://example.com/document-checklist' },
        { label: 'Руководство по государственным услугам', href: 'https://example.com/public-service-guide' },
      ],
      en: [
        { label: 'Document checklist', href: 'https://example.com/document-checklist' },
        { label: 'Public service guide', href: 'https://example.com/public-service-guide' },
      ],
      ky: [
        { label: 'Документтердин тизмеси', href: 'https://example.com/document-checklist' },
        { label: 'Мамлекеттик кызматтар боюнча колдонмо', href: 'https://example.com/public-service-guide' },
      ],
    },
  },
  {
    id: 'guide-finance',
    title: {
      ru: 'Как составить простой семейный бюджет',
      en: 'How to build a simple family budget',
      ky: 'Жөнөкөй үй-бүлөлүк бюджетти кантип түзүү керек',
    },
    description: {
      ru: 'Планирование расходов и приоритетов на ближайшие месяцы без лишнего стресса.',
      en: 'Plan spending and priorities for the next months without unnecessary stress.',
      ky: 'Кийинки айлар үчүн чыгымдарды жана басымдуулуктарды стресссиз пландаштыруу.',
    },
    category: 'finance',
    readTime: { ru: '8 минут', en: '8 min', ky: '8 мүнөт' },
    lastVerified: { ru: '2026-10-02', en: '2026-10-02', ky: '2026-10-02' },
    steps: {
      ru: [
        'Запишите ежемесячный доход и обязательные расходы.',
        'Выделите сумму на базовые нужды и накопления.',
        'Выберите 2–3 приоритета для ненужных трат.',
        'Проверяйте и корректируйте бюджет ежемесячно.',
      ],
      en: [
        'Write down your monthly income and mandatory expenses.',
        'Set aside money for essential needs and savings.',
        'Choose 2–3 priorities for non-essential spending.',
        'Review and adjust the budget monthly.',
      ],
      ky: [
        'Айлык кирешеңизди жана мажбурдуу чыгымдарыңызды жазып алыңыз.',
        'Негизги муктаждыктар жана үнемдөө үчүн сумманы бөлүңүз.',
        'Өтө जरूरी эмес чыгымдар үчүн 2–3 приоритет тандаңыз.',
        'Бюджетти ай сайын текшериңиз жана тууралаңыз.',
      ],
    },
    resources: {
      ru: ['Планировщик бюджета', 'Учёт накоплений'],
      en: ['Budget planner', 'Savings tracker'],
      ky: ['Бюджетти пландоо куралы', 'Үнөмдөө көрсөткүчү'],
    },
    sourceLinks: {
      ru: [
        { label: 'Планировщик бюджета', href: 'https://example.com/budget-planner' },
        { label: 'Трекер накоплений', href: 'https://example.com/savings-tracker' },
      ],
      en: [
        { label: 'Budget planner', href: 'https://example.com/budget-planner' },
        { label: 'Savings tracker', href: 'https://example.com/savings-tracker' },
      ],
      ky: [
        { label: 'Бюджетти пландоо куралы', href: 'https://example.com/budget-planner' },
        { label: 'Үнөмдөө көрсөткүчү', href: 'https://example.com/savings-tracker' },
      ],
    },
  },
  {
    id: 'guide-life',
    title: {
      ru: 'Как начать жизнь в новом городе',
      en: 'How to start life in a new city',
      ky: 'Жаңы шаарда жашоону кантип баштоо керек',
    },
    description: {
      ru: 'Практическая схема адаптации: жильё, работа, сеть контактов и базовые решения.',
      en: 'A practical adaptation plan for housing, work, networking, and everyday decisions.',
      ky: 'Турак жай, жумуш, байланыштар жана күнүмдүк чечимдер боюнча көнүгүүнүн практикалык планы.',
    },
    category: 'life',
    readTime: { ru: '9 минут', en: '9 min', ky: '9 мүнөт' },
    lastVerified: { ru: '2026-09-17', en: '2026-09-17', ky: '2026-09-17' },
    steps: {
      ru: [
        'Разделите задачу на жильё, работу и повседневные потребности.',
        'Подготовьте базовый список обязательных расходов.',
        'Найдите безопасные и понятные способы решения бытовых вопросов.',
        'Начните создавать сеть поддержки и привычки.',
      ],
      en: [
        'Split the task into housing, work, and daily needs.',
        'Prepare a basic list of essential expenses.',
        'Find safe and practical ways to solve everyday issues.',
        'Start building a support network and routines.',
      ],
      ky: [
        'Маселени турак жай, жумуш жана күнүмдүк муктаждыктарга бөлүңүз.',
        'Негизги чыгымдардын базалык тизмесин даярдаңыз.',
        'Күнүмдүк көйгөйлөрдү чечүүнүн коопсуз жана түшүнүктүү ыкмаларын табыңыз.',
        'Колдоо тармагы менен көндүмдөрдү түзүүгө киришиңиз.',
      ],
    },
    resources: {
      ru: ['Список дел для адаптации', 'Путеводитель по городу'],
      en: ['Adaptation checklist', 'City guide'],
      ky: ['Ыңгайлашуу үчүн иштердин тизмеси', 'Шаар боюнча колдонмо'],
    },
    sourceLinks: {
      ru: [
        { label: 'Чек-лист адаптации', href: 'https://example.com/adaptation-checklist' },
        { label: 'Путеводитель по городу', href: 'https://example.com/city-guide' },
      ],
      en: [
        { label: 'Adaptation checklist', href: 'https://example.com/adaptation-checklist' },
        { label: 'City guide', href: 'https://example.com/city-guide' },
      ],
      ky: [
        { label: 'Ыңгайлашуу үчүн иштердин тизмеси', href: 'https://example.com/adaptation-checklist' },
        { label: 'Шаар боюнча колдонмо', href: 'https://example.com/city-guide' },
      ],
    },
  },
  {
    id: 'guide-social',
    title: {
      ru: 'Где искать поддержку и социальные услуги',
      en: 'Where to find support and social services',
      ky: 'Колдоону жана социалдык кызматтарды кайдан табуу керек',
    },
    description: {
      ru: 'Как понять, какая помощь доступна, и куда обращаться в сложной ситуации.',
      en: 'Learn what support is available and where to turn in a difficult situation.',
      ky: 'Кайсы жардам бар жана кыйын кырдаалда кайда кайрылуу керектигин түшүнүңүз.',
    },
    category: 'social',
    readTime: { ru: '6 минут', en: '6 min', ky: '6 мүнөт' },
    lastVerified: { ru: '2026-07-10', en: '2026-07-10', ky: '2026-07-10' },
    steps: {
      ru: [
        'Зафиксируйте основную проблему и тип поддержки.',
        'Ищите поддержку через местные организации и службы.',
        'Подготовьте документы и контактную информацию.',
        'Следите за сроками и корректируйте запрос при необходимости.',
      ],
      en: [
        'Define the main problem and the type of support needed.',
        'Look for support through local organizations and services.',
        'Prepare your documents and contact details.',
        'Track deadlines and adjust your request if needed.',
      ],
      ky: [
        'Негизги көйгөйдү жана керекті колдоону аныктаңыз.',
        'Жергиликтүү уюмдар жана кызматтар аркылуу жардам сураңыз.',
        'Документтериңизди жана байланыш маалыматыңызды даярдаңыз.',
        'Мөөнөттөрдү көзөмөлдөп, керек болсо өтүнмеңизди тууралаңыз.',
      ],
    },
    resources: {
      ru: ['Список организаций помощи', 'Карта доступных услуг'],
      en: ['Referral list', 'Support map'],
      ky: ['Жардам көрсөтүүчү уюмдардын тизмеси', 'Кызматтардын картасы'],
    },
    sourceLinks: {
      ru: [
        { label: 'Список направлений поддержки', href: 'https://example.com/referral-list' },
        { label: 'Карта услуг', href: 'https://example.com/support-map' },
      ],
      en: [
        { label: 'Referral list', href: 'https://example.com/referral-list' },
        { label: 'Support map', href: 'https://example.com/support-map' },
      ],
      ky: [
        { label: 'Колдоо багыттарынын тизмеси', href: 'https://example.com/referral-list' },
        { label: 'Кызматтардын картасы', href: 'https://example.com/support-map' },
      ],
    },
  },
]

export const getLocalizedCategories = (language = 'ru') =>
  categories.map((category) => ({
    ...category,
    title: localizeText(category.title, language),
    description: localizeText(category.description, language),
    guides: guides.filter((guide) => guide.category === category.id).length,
  }))

export const getLocalizedGuides = (language = 'ru') =>
  guides.map((guide) => ({
    ...guide,
    title: localizeText(guide.title, language),
    description: localizeText(guide.description, language),
    readTime: localizeText(guide.readTime, language),
    lastVerified: localizeText(guide.lastVerified, language),
    steps: localizeList(guide.steps, language),
    resources: localizeList(guide.resources, language),
    sourceLinks: localizeList(guide.sourceLinks, language),
    categoryLabel: localizeText(
      categories.find((category) => category.id === guide.category)?.title || {},
      language,
    ),
  }))

export const categoryLabelMap = Object.fromEntries(
  categories.map((category) => [category.id, localizeText(category.title, 'ru')]),
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
