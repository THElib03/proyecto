import { useNavigate } from 'react-router-dom'

const Error = () => {
  const navigate = useNavigate()
  const errorCode = 404
  const errorTitle = 'Page Not Found'
  const errorDescription = 'The page you are looking for does not exist or has been moved.'

  return (
    <div className="page-container">
      <div style={{ textAlign: 'center', padding: '3rem 0' }}>
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>⚠️</div>
        <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem', color: '#dc3545' }}>{errorCode}</h1>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#333' }}>{errorTitle}</h2>
        <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
          {errorDescription}
        </p>
        <div className="btn-group" style={{ justifyContent: 'center' }}>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Go to Home
          </button>
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}

export default Error