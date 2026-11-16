const asDate = (value) => {
  if (value === null || value === undefined || value === '') return null
  if (value instanceof Date) return value
  if (value && typeof value.toDate === 'function') return value.toDate()
  return new Date(value)
}

export const formatLocalizedDate = (value, language) => {
  const date = asDate(value)
  if (!date || Number.isNaN(date.getTime())) return ''

  const locale = language === 'en' ? 'en-US' : language === 'ky' ? 'ky-KG' : 'ru-RU'
  return new Intl.DateTimeFormat(locale).format(date)
}
