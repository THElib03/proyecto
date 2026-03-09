import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Profile = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUserProfile()
  }, [])

  const fetchUserProfile = async () => {
    try {
      // TODO: Implement API call to fetch user profile
      // const response = await fetch('/api/profile')
      // const data = await response.json()
      // setUser(data)
      setUser({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '555-0001',
        joinDate: '2024-01-15',
        totalTickets: 5,
      })
    } catch (err) {
      console.error('Error fetching profile:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading">Loading your profile...</div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>My Profile</h1>
        <p>View and manage your personal information</p>
      </div>

      {user && (
        <div className="grid grid-2">
          <div className="card">
            <div className="card-header">
              <h3>Personal Information</h3>
            </div>
            <div className="card-body">
              <div style={{ marginBottom: '1rem' }}>
                <p>
                  <strong>Name:</strong> {user.name}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Phone:</strong> {user.phone}
                </p>
                <p>
                  <strong>Member Since:</strong> {user.joinDate}
                </p>
              </div>
            </div>
            <div className="card-footer">
              <Link to="/settings" className="btn btn-primary" style={{ textDecoration: 'none' }}>
                Edit Profile
              </Link>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Quick Stats</h3>
            </div>
            <div className="card-body">
              <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                <div style={{ fontSize: '2.5rem', color: '#007bff', marginBottom: '0.5rem' }}>{user.totalTickets}</div>
                <p style={{ color: '#666' }}>Total Tickets Booked</p>
              </div>
            </div>
            <div className="card-footer">
              <Link to="/my-tickets" className="btn btn-primary" style={{ textDecoration: 'none', width: '100%', textAlign: 'center' }}>
                View My Tickets
              </Link>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Account Settings</h3>
            </div>
            <div className="card-body">
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '0.75rem' }}>
                  <Link to="/settings" style={{ color: '#007bff', textDecoration: 'none' }}>
                    ⚙️ Settings
                  </Link>
                </li>
                <li style={{ marginBottom: '0.75rem' }}>
                  <Link to="/my-tickets" style={{ color: '#007bff', textDecoration: 'none' }}>
                    🎫 My Tickets
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile