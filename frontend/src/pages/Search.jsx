import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const Search = () => {
    const [searchParams] = useSearchParams();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [stations, setStations] = useState([]); // State to hold all stations
    const [originStation, setOriginStation] = useState(null); // Resolved origin station object
    const [destinationStation, setDestinationStation] = useState(null); // Resolved destination station object
    const [selectedOutbound, setSelectedOutbound] = useState(null); // Track selected outbound leg
    const navigate = useNavigate();

    const fromName = searchParams.get("from"); // Renamed for clarity, as it's a name string
    const toName = searchParams.get("to");     // Renamed for clarity, as it's a name string
    const dateParam = searchParams.get("date");

    const today = new Date().toLocaleDateString('en-CA'); // Corrected date format

    const [filters, setFilters] = useState({
        departureDate: dateParam || "",
        returnDate: searchParams.get("returnDate") || "",
        passengers: searchParams.get("passengers") || "1",
    });

    useEffect(() => {
        const token = localStorage.getItem('sessionToken');
        if (!token) {
            alert("You must be logged in to search and buy trips.");
            navigate("/login?message=Please log in to book your trip");
            return; 
        }

        const fetchAllStations = async () => {
            try {
                const response = await fetch("/api/station");
                if (!response.ok) throw new Error("Failed to fetch stations");
                const data = await response.json();
                setStations(Array.isArray(data) ? data : data.data || []);
            } catch (err) {
                console.error("Error fetching all stations:", err);
            }
        };
        fetchAllStations();
    }, []);

    // Resolve origin and destination station details when search params or stations change
    useEffect(() => {
        if (stations.length > 0 && fromName && toName) {
            const fromId = parseInt(fromName);
            const toId = parseInt(toName);
            const foundOrigin = stations.find(s => s.id === fromId);
            const foundDestination = stations.find(s => s.id === toId);
            setOriginStation(foundOrigin || null);
            setDestinationStation(foundDestination || null);
        }
    }, [stations, fromName, toName]);

    useEffect(() => {
        if (fromName && toName && dateParam) {
            handleSearch(true);
        }
    }, [searchParams]);

    // forceRefresh resets results if user changes filters
    const handleSearch = async (forceRefresh = false) => {
        setLoading(true);
        if (forceRefresh) setSelectedOutbound(null);

        try {
            const isReturnStep = !forceRefresh && selectedOutbound && filters.returnDate;
            
            const fromId = isReturnStep ? parseInt(toName) : parseInt(fromName);
            const toId = isReturnStep ? parseInt(fromName) : parseInt(toName);
            const searchDate = isReturnStep ? filters.returnDate : filters.departureDate;
            
            if (!fromId || !toId) {
                throw new Error("Invalid station IDs");
            }
            
            const response = await fetch(
                `/api/travel/search?from=${fromId}&to=${toId}&date=${searchDate}`
            );
            if (!response.ok) throw new Error("Failed to fetch trips");
            const rawData = await response.json();
            
            const processedData = (Array.isArray(rawData) ? rawData : []).map(trip => {
                let price = 0;
                if (trip.duration) {
                    const matches = trip.duration.match(/(\d+)h\s+(\d+)m/);
                    const [hours, minutes] = matches ? [parseInt(matches[1]), parseInt(matches[2])] : [0, 0];
                    const totalMinutes = hours * 60 + minutes;
                    price = (totalMinutes / 12.3).toFixed(2);
                }
                return { ...trip, price, travelDate: searchDate };
            });
            setResults(processedData);
        } catch (err) {
            console.error("Error searching trips:", err);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    // Automatically fetch return results once an outbound trip is selected
    useEffect(() => {
        if (selectedOutbound) {
            handleSearch(false);
        }
    }, [selectedOutbound]);

    const handleSelectTrip = (trip) => {
        if (filters.returnDate && !selectedOutbound) {
            setSelectedOutbound(trip);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            const params = new URLSearchParams();
            // Determine outbound and return details from the trip objects
            const outbound = selectedOutbound || trip;
            
            params.append("outboundTravelId", outbound.travel_id);
            params.append("outboundBusId", outbound.bus_id);
            params.append("outboundStat1", originStation.id);
            params.append("outboundStat2", destinationStation.id);
            params.append("outboundDate", outbound.travelDate);
            params.append("outboundDuration", outbound.duration);
            params.append("outboundDeparture", outbound.userDeparture);
            params.append("outboundArrival", outbound.userArrival);
            
            if (selectedOutbound) {
                params.append("returnTravelId", trip.travel_id);
                params.append("returnBusId", trip.bus_id);
                params.append("returnStat1", destinationStation.id);
                params.append("returnStat2", originStation.id);
                params.append("returnDate", trip.travelDate);
                params.append("returnDuration", trip.duration);
                params.append("returnDeparture", trip.userDeparture);
                params.append("returnArrival", trip.userArrival);
            }
            
            params.append("passengers", filters.passengers);
            navigate(`/book?${params.toString()}`);
        }
    };

    return (
        <div className="app-container">
            <div className="page-container">
                <div className="page-header">
                    <h1>{selectedOutbound ? "Select Return Trip" : "Select Outbound Trip"}</h1>
                </div>

                {selectedOutbound && (
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-bold text-blue-800">Outbound Selected:</p>
                                <p className="text-blue-700 text-sm">{selectedOutbound.userDeparture} → {selectedOutbound.userArrival} ({selectedOutbound.busPlate})</p>
                            </div>
                            <button 
                                className="btn btn-sm btn-secondary"
                                onClick={() => handleSearch(true)}
                            >
                                Change Outbound
                            </button>
                        </div>
                    </div>
                )}

                <div className="card mb-8">
                    <div className="card-header">
                        <h3>Search Filters</h3>
                    </div>
                    <div className="card-body">
                        <div className="mb-4 text-lg font-semibold text-slate-700">
                            {originStation ? `From: ${originStation.name ? `${originStation.city} (${originStation.name})` : originStation.city}` : `From: ${fromName || 'N/A'}`}
                            <br />
                            {destinationStation ? `To: ${destinationStation.name ? `${destinationStation.city} (${destinationStation.name})` : destinationStation.city}` : `To: ${toName || 'N/A'}`}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="form-group">
                                <label>Departure Date</label>
                                <input
                                    type="date"
                                    value={filters.departureDate}
                                    min={today}
                                    onChange={(e) =>
                                        setFilters((prev) => ({
                                            ...prev,
                                            departureDate: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label>Return Date (Optional)</label>
                                <input
                                    type="date"
                                    value={filters.returnDate}
                                    min={filters.departureDate || today}
                                    onChange={(e) =>
                                        setFilters((prev) => ({
                                            ...prev,
                                            returnDate: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <label>Passengers</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="6"
                                    value={filters.passengers}
                                    onChange={(e) =>
                                        setFilters((prev) => ({
                                            ...prev,
                                            passengers: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                            <div className="flex items-end md:col-start-2">
                                <button
                                    className="btn btn-primary w-full"
                                    onClick={() => handleSearch(true)}
                                >
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
                                <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 items-center">
                                    <div>
                                        <p className="text-lg font-bold">
                                            {trip.userDeparture}
                                        </p>
                                        <p className="text-slate-600 text-sm">
                                            Departure
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-slate-600">
                                            ━ {trip.duration} ━
                                        </p>
                                        <p className="text-slate-500 text-sm">
                                            {trip.busPlate}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-lg font-bold">
                                            {trip.userArrival}
                                        </p>
                                        <p className="text-slate-600 text-sm">
                                            Arrival
                                        </p>
                                    </div>

                                    <div className="text-center sm:text-right col-span-2 sm:col-span-1">
                                        <p className="text-xl font-bold text-green-600">
                                            {trip.price}€ 
                                        </p>
                                        <p className="text-slate-600 text-sm">Price</p>
                                    </div>
                                    <button
                                        className="btn btn-primary w-full sm:w-auto whitespace-nowrap px-2 sm:px-6"
                                        onClick={() => {
                                            handleSelectTrip(trip);
                                        }}
                                    >
                                        Select
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;
