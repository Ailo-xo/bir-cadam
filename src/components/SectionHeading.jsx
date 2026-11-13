const SectionHeading = ({ eyebrow, title, align = 'left' }) => {
  return (
    <div className={`section-heading ${align === 'center' ? 'center' : ''}`}>
      <span className="eyebrow accent">{eyebrow}</span>
      <h2>{title}</h2>
    </div>
  )
}

export default SectionHeading
