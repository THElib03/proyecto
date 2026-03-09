import { useState, useEffect } from 'react'

const Bonds = () => {
  const [bonds, setBonds] = useState([])
  const [loading, setLoading] = useState(false)
  const [sourceFilter, setSourceFilter] = useState('')
  const [destFilter, setDestFilter] = useState('')
  const [stations, setStations] = useState([])

  useEffect(() => {
    fetchBonds()
    fetchStations()
  }, [])

  const fetchBonds = async () => {
    setLoading(true)
    try {
      // TODO: Implement API call to fetch bonds
      // const response = await fetch('/api/bonds')
      // const data = await response.json()
      // setBonds(data)
      setBonds([
        {
          id: 1,
          route: 'New York → Boston',
          source: 'New York',
          destination: 'Boston',
          discount: '15%',
          description: 'Monthly travel pass with special discounts',
          price: '$99/month',
        },
        {
          id: 2,
          route: 'Boston → Philadelphia',
          source: 'Boston',
          destination: 'Philadelphia',
          discount: '20%',
          description: 'Frequently traveled route with extra savings',
          price: '/month $149',
        },
        {
          id: 3,
          route: 'New York → Philadelphia',
          source: 'New York',
          destination: 'Philadelphia',
          discount: '25%',
          description: 'Premium bond with unlimited trips',
          price: '$199/month',
        },
      ])
      setStations(['New York', 'Boston', 'Philadelphia'])
    } catch (err) {
      console.error('Error fetching bonds:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchStations = async () => {
    try {
      // TODO: Implement API call to fetch stations for filters
    } catch (err) {
      console.error('Error fetching stations:', err)
    }
  }

  const handlePurchaseBond = (bondId) => {
    // TODO: Implement bond purchase
    console.log('Purchase bond:', bondId)
  }

  const filteredBonds = bonds.filter(
    (bond) =>
      (sourceFilter === '' || bond.source === sourceFilter) &&
      (destFilter === '' || bond.destination === destFilter)
  )

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Travel Bonds</h1>
        <p>Exclusive discounts and offers on frequent routes</p>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <div className="card-header">
          <h3>Search Bonds</h3>
        </div>
        <div className="card-body">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>From</label>
              <select value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value)}>
                <option value="">All Stations</option>
                {stations.map((station) => (
                  <option key={station} value={station}>
                    {station}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>To</label>
              <select value={destFilter} onChange={(e) => setDestFilter(e.target.value)}>
                <option value="">All Stations</option>
                {stations.map((station) => (
                  <option key={station} value={station}>
                    {station}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setSourceFilter('')
                  setDestFilter('')
                }}
                style={{ width: '100%' }}
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading bonds...</div>
      ) : filteredBonds.length === 0 ? (
        <div className="empty-state">
          <h3>No bonds available</h3>
          <p>Try adjusting your search filters</p>
        </div>
      ) : (
        <div className="grid grid-2">
          {filteredBonds.map((bond) => (
            <div key={bond.id} className="card">
              <div className="card-header">
                <h3>{bond.route}</h3>
              </div>
              <div className="card-body">
                <p style={{ marginBottom: '1rem' }}>{bond.description}</p>
                <div style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#e7f3ff', borderRadius: '4px', borderLeft: '4px solid #007bff' }}>
                  <p style={{ color: '#007bff', fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
                    Save {bond.discount}
                  </p>
                  <p style={{ color: '#666', fontSize: '0.9rem' }}>Monthly price: <strong>{bond.price}</strong></p>
                </div>
              </div>
              <div className="card-footer">
                <button className="btn btn-primary" onClick={() => handlePurchaseBond(bond.id)} style={{ width: '100%' }}>
                  Purchase Bond
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Bonds