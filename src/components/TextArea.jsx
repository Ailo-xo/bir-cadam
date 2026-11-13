const TextArea = ({ label, name, value, onChange, placeholder, error, rows = 4 }) => {
  return (
    <label className="form-field">
      {label ? <span>{label}</span> : null}
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={error ? 'input-error' : ''}
      />
      {error ? <small className="field-error">{error}</small> : null}
    </label>
  )
}

export default TextArea
