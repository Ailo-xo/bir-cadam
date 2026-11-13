import LoadingSpinner from './LoadingSpinner'

const PageLoader = ({ label = 'Загрузка...' }) => {
  return (
    <div className="page-loader">
      <LoadingSpinner label={label} />
    </div>
  )
}

export default PageLoader
