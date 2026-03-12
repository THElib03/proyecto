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
      <div className="app-container">
        <div className="page-container">
          <div className="loading">Loading your profile...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="app-container">
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
              <div className="mb-4">
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
              <Link to="/settings" className="btn btn-primary text-white!">
                Edit Profile
              </Link>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Quick Stats</h3>
            </div>
            <div className="card-body">
              <div className="text-center py-4">
                <div className="text-5xl text-blue-500 mb-2">{user.totalTickets}</div>
                <p className="text-slate-600">Total Tickets Booked</p>
              </div>
            </div>
            <div className="card-footer">
              <Link to="/my-tickets" className="btn btn-primary text-white! w-full text-center">
                View My Tickets
              </Link>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Account Settings</h3>
            </div>
            <div className="card-body">
              <ul className="list-none p-0">
                <li className="mb-3">
                  <Link to="/settings" className="text-blue-500 no-underline">
                    ⚙️ Settings
                  </Link>
                </li>
                <li className="mb-3">
                  <Link to="/my-tickets" className="text-blue-500 no-underline">
                    🎫 My Tickets
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  )
}

export default Profile