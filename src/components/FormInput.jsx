const FormInput = ({ label, name, value, onChange, type = 'text', placeholder, error }) => {
  return (
    <label className="form-field">
      {label ? <span>{label}</span> : null}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={error ? 'input-error' : ''}
      />
      {error ? <small className="field-error">{error}</small> : null}
    </label>
  )
}

export default FormInput
