import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const Search = () => {
  const [searchParams] = useSearchParams()
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    departureDate: searchParams.get('departureDate') || '',
    returnDate: searchParams.get('returnDate') || '',
    passengers: searchParams.get('passengers') || '1',
  })

  const source = searchParams.get('source') || 'New York'
  const destination = searchParams.get('destination') || 'Boston'

  const handleSearch = async () => {
    setLoading(true)
    try {
      // TODO: Implement API call to search trips
      // const response = await fetch(`/api/search?source=${source}&destination=${destination}&date=${filters.departureDate}`)
      // const data = await response.json()
      // setResults(data)
      setResults([
        {
          id: 1,
          departure: '08:00',
          arrival: '12:30',
          duration: '4h 30m',
          bus: 'Mercedes Sprinter',
          available: 12,
          price: '$45',
        },
        {
          id: 2,
          departure: '14:00',
          arrival: '18:15',
          duration: '4h 15m',
          bus: 'Volvo B12',
          available: 5,
          price: '$55',
        },
        {
          id: 3,
          departure: '19:30',
          arrival: '23:45',
          duration: '4h 15m',
          bus: 'Mercedes Sprinter',
          available: 20,
          price: '$35',
        },
      ])
    } catch (err) {
      console.error('Error searching trips:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectTrip = (tripId) => {
    // TODO: Navigate to booking page
    console.log('Select trip:', tripId)
  }

  return (
    <div className="app-container">
      <div className="page-container">
        <div className="page-header">
          <h1>Search Results</h1>
          <p>
            {source} → {destination}
          </p>
        </div>

      <div className="card mb-8">
        <div className="card-header">
          <h3>Search Filters</h3>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="form-group">
              <label>Departure Date</label>
              <input
                type="date"
                value={filters.departureDate}
                onChange={(e) => setFilters((prev) => ({ ...prev, departureDate: e.target.value }))}
              />
            </div>
            <div className="form-group">
              <label>Return Date (Optional)</label>
              <input
                type="date"
                value={filters.returnDate}
                onChange={(e) => setFilters((prev) => ({ ...prev, returnDate: e.target.value }))}
              />
            </div>
            <div className="form-group">
              <label>Passengers</label>
              <input
                type="number"
                min="1"
                max="9"
                value={filters.passengers}
                onChange={(e) => setFilters((prev) => ({ ...prev, passengers: e.target.value }))}
              />
            </div>
            <div className="flex items-end">
              <button className="btn btn-primary w-full" onClick={handleSearch}>
                Search Trips
              </button>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loading">Searching available trips...</div>
      ) : results.length === 0 ? (
        <div className="empty-state">
          <h3>No trips found</h3>
          <p>Try adjusting your search criteria or filters</p>
        </div>
      ) : (
        <div>
          {results.map((trip) => (
            <div key={trip.id} className="card mb-4">
              <div className="grid grid-cols-5 gap-4 items-center">
                <div>
                  <p className="text-lg font-bold">{trip.departure}</p>
                  <p className="text-slate-600 text-sm">Departure</p>
                </div>
                <div>
                  <p className="text-slate-600">━ {trip.duration} ━</p>
                  <p className="text-slate-500 text-sm">{trip.bus}</p>
                </div>
                <div>
                  <p className="text-lg font-bold">{trip.arrival}</p>
                  <p className="text-slate-600 text-sm">Arrival</p>
                </div>
                <div>
                  <p className="text-green-500 font-bold">{trip.available} seats</p>
                  <p className="text-lg font-bold text-blue-500">{trip.price}</p>
                </div>
                <button className="btn btn-primary" onClick={() => handleSelectTrip(trip.id)}>
                  Select
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  )
}

export default Search