import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    source: '',
    destination: '',
    departureDate: '',
  })

  const popularRoutes = [
    { from: 'New York', to: 'Boston', price: '$45' },
    { from: 'Boston', to: 'Philadelphia', price: '$65' },
    { from: 'New York', to: 'Philadelphia', price: '$75' },
    { from: 'Philadelphia', to: 'Washington DC', price: '$55' },
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSearch = () => {
    if (formData.source && formData.destination) {
      const params = new URLSearchParams({
        source: formData.source,
        destination: formData.destination,
        departureDate: formData.departureDate,
      })
      navigate(`/search?${params.toString()}`)
    }
  }

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-12 px-8 text-center">
        <h1 className="text-5xl mb-4">Book Your Bus Ticket</h1>
        <p className="text-xl">Find and book buses to your favorite destinations</p>
      </div>

      {/* Search Section */}
      <div className="page-container">
        <div className="card mb-8">
          <div className="card-header">
            <h3>Search Trips</h3>
          </div>
          <div className="card-body">
            <div className="grid grid-cols-4 gap-4 items-end">
              <div className="form-group">
                <label>From</label>
                <input
                  type="text"
                  name="source"
                  value={formData.source}
                  onChange={handleInputChange}
                  placeholder="New York"
                />
              </div>
              <div className="form-group">
                <label>To</label>
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleInputChange}
                  placeholder="Boston"
                />
              </div>
              <div className="form-group">
                <label>Departure Date</label>
                <input
                  type="date"
                  name="departureDate"
                  value={formData.departureDate}
                  onChange={handleInputChange}
                />
              </div>
              <button className="btn btn-primary" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Popular Routes */}
        <div className="page-header">
          <h2>Popular Routes</h2>
          <p>Check out our most popular destinations</p>
        </div>

        <div className="grid grid-3">
          {popularRoutes.map((route, index) => (
            <div key={index} className="card">
              <div className="card-header">
                <h3>
                  {route.from} → {route.to}
                </h3>
              </div>
              <div className="card-body">
                <p className="text-2xl text-blue-600 font-bold">{route.price}</p>
              </div>
              <div className="card-footer">
                <button
                  className="btn btn-primary w-full"
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      source: route.from,
                      destination: route.to,
                    }))
                    navigate(
                      `/search?source=${route.from}&destination=${route.to}`
                    )
                  }}
                >
                  View Trips
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="mt-12">
          <div className="page-header">
            <h2>Special Offers</h2>
            <p>Don't miss our current deals</p>
          </div>

          <div className="grid grid-2">
            <div className="card">
              <div className="card-header">
                <h3>Travel Bonds</h3>
              </div>
              <div className="card-body">
                <p>Get exclusive discounts with our monthly travel bonds</p>
              </div>
              <div className="card-footer">
                <button
                  className="btn btn-primary w-full"
                  onClick={() => navigate('/bonds')}
                >
                  Explore Bonds
                </button>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <h3>Promotions</h3>
              </div>
              <div className="card-body">
                <p>Check out our latest sales and promotional offers</p>
              </div>
              <div className="card-footer">
                <button
                  className="btn btn-primary w-full"
                  onClick={() => navigate('/promos')}
                >
                  View Promos
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
