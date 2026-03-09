import { useState, useEffect } from 'react'

const Promos = () => {
  const [promos, setPromos] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchPromos()
  }, [])

  const fetchPromos = async () => {
    setLoading(true)
    try {
      // TODO: Implement API call to fetch promos
      // const response = await fetch('/api/promos')
      // const data = await response.json()
      // setPromos(data)
      setPromos([
        {
          id: 1,
          title: 'Summer Sale - 20% Off',
          description: 'Get 20% discount on all routes this summer',
          discount: '20%',
          expiry: '2024-08-31',
          code: 'SUMMER20',
        },
        {
          id: 2,
          title: 'Weekend Getaway',
          description: 'Special pricing for weekend trips',
          discount: '15%',
          expiry: '2024-04-30',
          code: 'WEEKEND15',
        },
        {
          id: 3,
          title: 'Early Bird Special',
          description: 'Book 7 days in advance and save',
          discount: '$10 off',
          expiry: '2024-12-31',
          code: 'EARLY10',
        },
      ])
    } catch (err) {
      console.error('Error fetching promos:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleApplyPromo = (promoCode) => {
    // TODO: Implement promo application
    console.log('Apply promo:', promoCode)
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Current Promotions</h1>
        <p>Check out our latest sales and special offers</p>
      </div>

      {loading ? (
        <div className="loading">Loading promotions...</div>
      ) : promos.length === 0 ? (
        <div className="empty-state">
          <h3>No promotions available</h3>
          <p>Check back soon for our latest offers!</p>
        </div>
      ) : (
        <div className="grid grid-2">
          {promos.map((promo) => (
            <div key={promo.id} className="card">
              <div className="card-header">
                <h3>{promo.title}</h3>
              </div>
              <div className="card-body">
                <p style={{ marginBottom: '1rem' }}>{promo.description}</p>
                <div style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                  <p style={{ textAlign: 'center', color: '#007bff', fontSize: '1.5rem', fontWeight: 'bold' }}>
                    {promo.discount}
                  </p>
                  <p style={{ textAlign: 'center', color: '#666', fontSize: '0.9rem' }}>Code: <strong>{promo.code}</strong></p>
                </div>
                <p style={{ color: '#999', fontSize: '0.9rem' }}>Expires: {promo.expiry}</p>
              </div>
              <div className="card-footer">
                <button className="btn btn-primary" onClick={() => handleApplyPromo(promo.code)} style={{ width: '100%' }}>
                  Apply Code
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Promos