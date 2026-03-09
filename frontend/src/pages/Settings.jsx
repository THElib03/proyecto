import { useState, useEffect } from 'react'

const Settings = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [theme, setTheme] = useState('light')
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchUserSettings()
  }, [])

  const fetchUserSettings = async () => {
    try {
      // TODO: Implement API call to fetch user settings
      // const response = await fetch('/api/settings')
      // const data = await response.json()
      // setUser(data.user)
      // setTheme(data.theme)
      // setNotifications(data.notifications)
      setUser({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '555-0001',
        password: '',
        newPassword: '',
        confirmPassword: '',
      })
      setTheme('light')
      setNotifications({
        email: true,
        sms: false,
        push: true,
      })
    } catch (err) {
      console.error('Error fetching settings:', err)
    }
  }

  const handleUserChange = (e) => {
    const { name, value } = e.target
    setUser((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target
    setNotifications((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSaveProfile = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      // TODO: Implement API call to save profile
      console.log('Save profile:', user)
      setMessage('Profile updated successfully!')
      setTimeout(() => setMessage(''), 3000)
    } catch (err) {
      setMessage('Error updating profile')
    } finally {
      setLoading(false)
    }
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    if (user.newPassword !== user.confirmPassword) {
      setMessage('Passwords do not match')
      setLoading(false)
      return
    }

    try {
      // TODO: Implement API call to change password
      console.log('Change password')
      setMessage('Password changed successfully!')
      setUser((prev) => ({
        ...prev,
        password: '',
        newPassword: '',
        confirmPassword: '',
      }))
      setTimeout(() => setMessage(''), 3000)
    } catch (err) {
      setMessage('Error changing password')
    } finally {
      setLoading(false)
    }
  }

  const handleApplyTheme = async () => {
    try {
      // TODO: Implement API call to save theme preference
      console.log('Apply theme:', theme)
      document.documentElement.setAttribute('data-theme', theme)
      setMessage('Theme updated successfully!')
      setTimeout(() => setMessage(''), 3000)
    } catch (err) {
      setMessage('Error updating theme')
    }
  }

  const handleNotificationsSave = async () => {
    setLoading(true)
    try {
      // TODO: Implement API call to save notification preferences
      console.log('Save notifications:', notifications)
      setMessage('Notification preferences updated!')
      setTimeout(() => setMessage(''), 3000)
    } catch (err) {
      setMessage('Error updating preferences')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Settings</h1>
        <p>Manage your account preferences and settings</p>
      </div>

      {message && (
        <div className={`alert ${message.includes('Error') ? 'alert-error' : 'alert-success'}`}>
          {message}
        </div>
      )}

      <div className="grid grid-2" style={{ maxWidth: '900px' }}>
        {/* Profile Settings */}
        <div className="card">
          <div className="card-header">
            <h3>Profile Information</h3>
          </div>
          <form onSubmit={handleSaveProfile}>
            <div className="card-body">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={user.firstName}
                    onChange={handleUserChange}
                    placeholder="John"
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={user.lastName}
                    onChange={handleUserChange}
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleUserChange}
                  placeholder="john@example.com"
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={user.phone}
                  onChange={handleUserChange}
                  placeholder="555-0001"
                />
              </div>
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>

        {/* Password Settings */}
        <div className="card">
          <div className="card-header">
            <h3>Change Password</h3>
          </div>
          <form onSubmit={handleChangePassword}>
            <div className="card-body">
              <div className="form-group">
                <label>Current Password</label>
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleUserChange}
                  placeholder="••••••••"
                />
              </div>
              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={user.newPassword}
                  onChange={handleUserChange}
                  placeholder="••••••••"
                />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={user.confirmPassword}
                  onChange={handleUserChange}
                  placeholder="••••••••"
                />
              </div>
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          </form>
        </div>

        {/* Theme Settings */}
        <div className="card">
          <div className="card-header">
            <h3>Theme Preferences</h3>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label>Select Theme</label>
              <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                <option value="light">Light Mode</option>
                <option value="dark">Dark Mode</option>
                <option value="auto">Auto (System)</option>
              </select>
            </div>
            <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '0.5rem' }}>
              Current: <strong>{theme.charAt(0).toUpperCase() + theme.slice(1)} Mode</strong>
            </p>
          </div>
          <div className="card-footer">
            <button type="button" className="btn btn-primary" onClick={handleApplyTheme}>
              Apply Theme
            </button>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="card">
          <div className="card-header">
            <h3>Notification Preferences</h3>
          </div>
          <div className="card-body">
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginBottom: '0.75rem' }}>
                <input
                  type="checkbox"
                  name="email"
                  checked={notifications.email}
                  onChange={handleNotificationChange}
                  style={{ marginRight: '0.75rem', width: 'auto', padding: 0 }}
                />
                <span>Email Notifications</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginBottom: '0.75rem' }}>
                <input
                  type="checkbox"
                  name="sms"
                  checked={notifications.sms}
                  onChange={handleNotificationChange}
                  style={{ marginRight: '0.75rem', width: 'auto', padding: 0 }}
                />
                <span>SMS Notifications</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  name="push"
                  checked={notifications.push}
                  onChange={handleNotificationChange}
                  style={{ marginRight: '0.75rem', width: 'auto', padding: 0 }}
                />
                <span>Push Notifications</span>
              </label>
            </div>
          </div>
          <div className="card-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleNotificationsSave}
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Preferences'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings