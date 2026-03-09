import { useState, useEffect } from 'react'

const Routes = () => {
  const [routes, setRoutes] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    duration: '',
    distance: '',
    price: '',
  })

  useEffect(() => {
    fetchRoutes()
  }, [])

  const fetchRoutes = async () => {
    setLoading(true)
    try {
      // TODO: Implement API call to fetch routes
      // const response = await fetch('/api/routes')
      // const data = await response.json()
      // setRoutes(data)
      setRoutes([
        { id: 1, origin: 'New York', destination: 'Boston', duration: '4 hours', distance: '215 km', price: '$45' },
        { id: 2, origin: 'Boston', destination: 'Philadelphia', duration: '6 hours', distance: '380 km', price: '$65' },
      ])
    } catch (err) {
      console.error('Error fetching routes:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    try {
      // TODO: Implement API call to save/update route
      console.log('Save route:', formData)
      setShowForm(false)
      setFormData({ origin: '', destination: '', duration: '', distance: '', price: '' })
      setEditingId(null)
    } catch (err) {
      console.error('Error saving route:', err)
    }
  }

  const handleDelete = async (id) => {
    if (confirm('Are you sure?')) {
      try {
        // TODO: Implement API call to delete route
        setRoutes((prev) => prev.filter((route) => route.id !== id))
      } catch (err) {
        console.error('Error deleting route:', err)
      }
    }
  }

  const filteredRoutes = routes.filter(
    (route) =>
      route.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.destination.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Routes Management</h1>
        <p>Manage travel routes and schedules</p>
      </div>

      <div className="btn-group">
        <button
          className="btn btn-primary"
          onClick={() => {
            setShowForm(true)
            setEditingId(null)
            setFormData({ origin: '', destination: '', duration: '', distance: '', price: '' })
          }}
        >
          + Add Route
        </button>
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div className="card-header">
            <h3>{editingId ? 'Edit Route' : 'Add New Route'}</h3>
          </div>
          <div className="card-body">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label>Origin</label>
                <input
                  type="text"
                  name="origin"
                  value={formData.origin}
                  onChange={handleInputChange}
                  placeholder="New York"
                />
              </div>
              <div className="form-group">
                <label>Destination</label>
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleInputChange}
                  placeholder="Boston"
                />
              </div>
              <div className="form-group">
                <label>Duration</label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  placeholder="4 hours"
                />
              </div>
              <div className="form-group">
                <label>Distance (km)</label>
                <input
                  type="number"
                  name="distance"
                  value={formData.distance}
                  onChange={handleInputChange}
                  placeholder="215"
                />
              </div>
              <div className="form-group">
                <label>Base Price ($)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="45"
                />
              </div>
            </div>
          </div>
          <div className="card-footer">
            <div className="btn-group">
              <button className="btn btn-success" onClick={handleSave}>
                Save
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setShowForm(false)
                  setEditingId(null)
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ marginBottom: '1.5rem' }}>
        <input
          type="text"
          className="search-input"
          placeholder="Search by origin or destination..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="loading">Loading routes...</div>
      ) : filteredRoutes.length === 0 ? (
        <div className="empty-state">
          <h3>No routes found</h3>
          <p>Start by adding your first route to the system</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Origin</th>
                <th>Destination</th>
                <th>Duration</th>
                <th>Distance</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRoutes.map((route) => (
                <tr key={route.id}>
                  <td>{route.origin}</td>
                  <td>{route.destination}</td>
                  <td>{route.duration}</td>
                  <td>{route.distance} km</td>
                  <td>{route.price}</td>
                  <td>
                    <div className="table-actions">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => {
                          setFormData(route)
                          setEditingId(route.id)
                          setShowForm(true)
                        }}
                      >
                        Edit
                      </button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(route.id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Routes