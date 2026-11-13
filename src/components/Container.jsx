const Container = ({ children, className = '' }) => {
  return <div className={`shell-container ${className}`.trim()}>{children}</div>
}

export default Container
