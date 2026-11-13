const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const variantClass = variant === 'secondary' ? 'secondary-button' : 'primary-button'
  return (
    <button type="button" className={`${variantClass} ${className}`.trim()} {...props}>
      {children}
    </button>
  )
}

export default Button
