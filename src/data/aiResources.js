export const trustedResources = [
  {
    id: 'kg-government',
    name: 'Кабинет Министров Кыргызской Республики',
    url: 'https://www.gov.kg/ky',
    publisher: 'Кабинет Министров Кыргызской Республики',
    country: 'KG',
    languages: ['ky', 'ru', 'en'],
    lastVerified: '2026-11-15',
    verificationStatus: 'official-homepage-checked',
    topics: ['life', 'social', 'career'],
  },
  {
    id: 'kg-labor-ministry',
    name: 'Министерство труда, социального обеспечения и миграции Кыргызской Республики',
    url: 'https://mlsp.gov.kg/',
    publisher: 'Министерство труда, социального обеспечения и миграции Кыргызской Республики',
    country: 'KG',
    languages: ['ky', 'ru'],
    lastVerified: '2026-11-15',
    verificationStatus: 'official-homepage-checked',
    topics: ['career', 'social'],
  },
  {
    id: 'kg-education-ministry',
    name: 'Кыргыз Республикасынын агартуу министрлиги',
    url: 'https://edu.gov.kg/',
    publisher: 'Кыргыз Республикасынын агартуу министрлиги',
    country: 'KG',
    languages: ['ky'],
    lastVerified: '2026-11-15',
    verificationStatus: 'official-homepage-checked',
    topics: ['education'],
  },
  {
    id: 'kg-e-services',
    name: 'Государственный портал электронных услуг «Түндүк»',
    url: 'https://portal.tunduk.kg/',
    publisher: 'Государственный портал электронных услуг Кыргызской Республики',
    country: 'KG',
    languages: ['ky', 'ru'],
    lastVerified: '2026-11-15',
    verificationStatus: 'official-homepage-checked',
    topics: ['documents', 'social', 'life'],
  },
  {
    id: 'kg-national-bank',
    name: 'Национальный банк Кыргызской Республики',
    url: 'https://www.nbkr.kg/',
    publisher: 'Национальный банк Кыргызской Республики',
    country: 'KG',
    languages: ['ky', 'ru', 'en'],
    lastVerified: '2026-11-15',
    verificationStatus: 'official-homepage-checked',
    topics: ['finance'],
  },
]

export const getTrustedResources = (topic) =>
  trustedResources.filter((resource) => resource.topics.includes(topic))

export const resolveTrustedResources = (ids, topic) => {
  if (!Array.isArray(ids)) return []
  const allowed = topic ? getTrustedResources(topic) : trustedResources
  const requested = new Set(ids.filter((id) => typeof id === 'string'))
  return allowed.filter((resource) => requested.has(resource.id))
}
