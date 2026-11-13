const ProgressBar = ({ value = 0, label, showValue = true }) => {
  const safeValue = Math.min(100, Math.max(0, Number(value) || 0))

  return (
    <div className="progress-block">
      {label ? (
        <div className="progress-meta">
          <span>{label}</span>
          {showValue && <strong>{Math.round(safeValue)}%</strong>}
        </div>
      ) : null}
      <div className="progress-track" aria-label="Progress bar">
        <div className="progress-fill" style={{ width: `${safeValue}%` }} />
      </div>
    </div>
  )
}

export default ProgressBar
