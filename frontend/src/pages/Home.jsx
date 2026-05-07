import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HighlightRoute from "../components/HighlightRoute";

const Home = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        source: "",
        destination: "",
        returnDate: "",
        departureDate: "",
    });
    const [displayText, setDisplayText] = useState({
        source: "",
        destination: ""
    });
    const [stations, setStations] = useState([]);
    const [popularRoutes, setPopularRoutes] = useState([]);
    const [offset, setOffset] = useState(0);
    const [isLoadingRoutes, setIsLoadingRoutes] = useState(true);
    const today = new Date().toLocaleDateString('en-CA');

    useEffect(() => {
        const fetchStations = async () => {
            try {
                const response = await fetch("/api/station", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });
                if (!response.ok) throw new Error("Failed to fetch stations");
                const data = await response.json();
                setStations(Array.isArray(data) ? data : data.data || []);
            } catch (err) { console.error("Error fetching stations:", err); }
        };
        fetchStations();
    }, []);

    useEffect(() => {
        fetchPopularRoutes(0);
    }, []);

    const fetchPopularRoutes = async (newOffset) => {
        setIsLoadingRoutes(true);
        try {
            const response = await fetch(
                `/api/route/highlighted?limit=6&offset=${newOffset}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (!response.ok) throw new Error("Failed to fetch popular routes");
            const data = await response.json();

            if (newOffset === 0) {
                setPopularRoutes(data);
            } else {
                setPopularRoutes((prev) => [...prev, ...data]);
            }
            setOffset(newOffset + 6);
        } catch (err) {
            console.error("Error fetching popular routes:", err);
        } finally {
            setIsLoadingRoutes(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const selectedStation = stations.find(s => `${s.city}, ${s.name}` === value);
    
        setDisplayText((prev) => ({ ...prev, [name]: value }));
        if (selectedStation) {
            // If it matches a station, store the ID
            setFormData((prev) => ({ ...prev, [name]: selectedStation.id }));
        } else {
            // Otherwise, store the value as-is (for manual typing)
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSearch = () => {
        if (formData.source && formData.destination && formData.departureDate) {
            const params = new URLSearchParams();
            params.append("from", formData.source);
            params.append("to", formData.destination);
            params.append("date", formData.departureDate);
            if (formData.returnDate) {
                params.append("returnDate", formData.returnDate);
            }
            navigate(`/search?${params.toString()}`);
        } else {
            alert("Please fill in all required fields");
        }
    };

    return (
        <div className="flex-1 p-8 mx-auto w-full max-w-7xl">
            {/* Hero Section */}
            <div className="bg-[var(--color-primary-teal)] text-white py-12 px-6 text-center rounded-t-lg">
                <h1 className="text-4xl mb-4 font-bold">Book Your Bus Ticket</h1>
                <p className="text-xl opacity-90">
                    Find and book buses to your favorite destinations
                </p>
            </div>

            {/* Search Section */}
            <div className="page-container -mt-4 shadow-xl">
                <div className="card ">
                    <div className="card-header">
                        <h3>Search Trips</h3>
                    </div>
                    <div className="card-body">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
                            <div className="form-group">
                                <label>
                                    From
                                </label>
                                <input
                                    type="text"
                                    name="source"
                                    value={displayText.source}
                                    onChange={handleInputChange}
                                    list="home-stations-list"
                                    placeholder="Sevilla"
                                    className="search-input w-full"
                                    // className="w-full p-3 border border-slate-300 rounded-md text-base transition-colors focus:outline-none focus:border-[--color-accent-sky] focus:ring-4 focus:ring-[--color-accent-sky]/20"
                                />
                            </div>
                            <datalist id="home-stations-list">
                                {stations.filter((s) => !s.delist).map((s) => (
                                    <option key={s.id} value={`${s.city}, ${s.name}`} />
                                ))}
                            </datalist>
                            <div className="mb-6">
                                <label className="block mb-2 font-medium text-slate-800">
                                    To
                                </label>
                                <input
                                    type="text"
                                    name="destination"
                                    value={displayText.destination}
                                    onChange={handleInputChange}
                                    list="home-stations-list"
                                    placeholder="Granada"
                                    className="search-input w-full"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block mb-2 font-medium text-slate-800">
                                    Departure Date
                                </label>
                                <input
                                    type="date"
                                    name="departureDate"
                                    value={formData.departureDate}
                                    min={today}
                                    onChange={handleInputChange}
                                    className="search-input w-full"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block mb-2 font-medium text-slate-800">
                                    Return Date (Optional)
                                </label>
                                <input
                                    type="date"
                                    name="returnDate"
                                    value={formData.returnDate}
                                    min={formData.departureDate || today}
                                    onChange={handleInputChange}
                                    className="search-input w-full"
                                />
                            </div>
                            <button
                                className="btn btn-primary w-full md:w-auto"
                                onClick={handleSearch}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>

                {/* Popular Routes */}
                <div className="page-header mt-8">
                    <h2>
                        Popular Routes
                    </h2>
                    <p>
                        Check out our most popular destinations
                    </p>
                </div>

                {isLoadingRoutes ? (
                    <div className="text-center py-8">Loading routes...</div>
                ) : popularRoutes.length === 0 ? (
                    <div className="empty-state">
                        No highlighted routes available
                    </div>
                ) : (
                    <>
                        <HighlightRoute popularRoutes={popularRoutes} />
                        <div className="flex justify-center mb-8">
                            <button
                                className="btn btn-secondary"
                                onClick={() => fetchPopularRoutes(offset)}
                            >
                                Show More Routes
                            </button>
                        </div>
                    </>
                )}

                {/* Quick Links */}
                <div className="mt-12">
                    <div className="page-header">
                        <h2>Special Offers</h2>
                        <p>Don't miss our current deals</p>
                    </div>

                    <div className="grid-2">
                        <div className="card">
                            <div className="card-header">
                                <h3>Travel Bonds</h3>
                            </div>
                            <div className="card-body">
                                <p>Get exclusive discounts with our monthly travel bonds</p>
                            </div>
                            <div className="card-footer">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => navigate("/bonds")}
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
                                    className="btn btn-primary"
                                    onClick={() => navigate("/promos")}
                                >
                                    View Promos
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
