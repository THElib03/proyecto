import { useState, useEffect } from 'react'

const Buses = () => {
  const [buses, setBuses] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    licensePlate: '',
    model: '',
    capacity: '',
    status: 'active',
  })

  useEffect(() => {
    fetchBuses()
  }, [])

  const fetchBuses = async () => {
    setLoading(true)
    try {
      // TODO: Implement API call to fetch buses
      // const response = await fetch('/api/buses')
      // const data = await response.json()
      // setBuses(data)
      setBuses([
        { id: 1, licensePlate: 'ABC-123', model: 'Mercedes Sprinter', capacity: 50, status: 'active' },
        { id: 2, licensePlate: 'DEF-456', model: 'Volvo B12', capacity: 55, status: 'active' },
      ])
    } catch (err) {
      console.error('Error fetching buses:', err)
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
      // TODO: Implement API call to save/update bus
      console.log('Save bus:', formData)
      setShowForm(false)
      setFormData({ licensePlate: '', model: '', capacity: '', status: 'active' })
      setEditingId(null)
    } catch (err) {
      console.error('Error saving bus:', err)
    }
  }

  const handleDelete = async (id) => {
    if (confirm('Are you sure?')) {
      try {
        // TODO: Implement API call to delete bus
        setBuses((prev) => prev.filter((bus) => bus.id !== id))
      } catch (err) {
        console.error('Error deleting bus:', err)
      }
    }
  }

  const filteredBuses = buses.filter(
    (bus) =>
      bus.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bus.model.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="app-container">
      <div className="page-container">
        <div className="page-header">
          <h1>Buses Management</h1>
          <p>Manage your bus fleet</p>
        </div>

      <div className="btn-group">
        <button
          className="btn btn-primary"
          onClick={() => {
            setShowForm(true)
            setEditingId(null)
            setFormData({ licensePlate: '', model: '', capacity: '', status: 'active' })
          }}
        >
          + Add Bus
        </button>
      </div>

      {showForm && (
        <div className="card mb-8">
          <div className="card-header">
            <h3>{editingId ? 'Edit Bus' : 'Add New Bus'}</h3>
          </div>
          <div className="card-body">
            <div className="grid grid-cols-2 gap-4">
              <div className="form-group">
                <label>License Plate</label>
                <input
                  type="text"
                  name="licensePlate"
                  value={formData.licensePlate}
                  onChange={handleInputChange}
                  placeholder="ABC-123"
                />
              </div>
              <div className="form-group">
                <label>Model</label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  placeholder="Mercedes Sprinter"
                />
              </div>
              <div className="form-group">
                <label>Capacity</label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  placeholder="50"
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select name="status" value={formData.status} onChange={handleInputChange}>
                  <option value="active">Active</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="inactive">Inactive</option>
                </select>
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

      <div className="mb-6">
        <input
          type="text"
          className="search-input"
          placeholder="Search by license plate or model..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="loading">Loading buses...</div>
      ) : filteredBuses.length === 0 ? (
        <div className="empty-state">
          <h3>No buses found</h3>
          <p>Start by adding your first bus to the system</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>License Plate</th>
                <th>Model</th>
                <th>Capacity</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBuses.map((bus) => (
                <tr key={bus.id}>
                  <td>{bus.licensePlate}</td>
                  <td>{bus.model}</td>
                  <td>{bus.capacity}</td>
                  <td>{bus.status}</td>
                  <td>
                    <div className="table-actions">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => {
                          setFormData(bus)
                          setEditingId(bus.id)
                          setShowForm(true)
                        }}
                      >
                        Edit
                      </button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(bus.id)}>
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
    </div>
  )
}

export default Buses