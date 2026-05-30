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
    const [showStickySearch, setShowStickySearch] = useState(false);
    const [stations, setStations] = useState([]);
    const [popularRoutes, setPopularRoutes] = useState([]);
    const [offset, setOffset] = useState(0);
    const [isLoadingRoutes, setIsLoadingRoutes] = useState(true);
    const today = new Date().toLocaleDateString('en-CA');

    useEffect(() => {
        const handleScroll = () => {
            const width = window.innerWidth;
            let threshold = 420; // Default for Desktop (lg and up)

            if (width < 640) {
                console.log("<640 called");
                threshold = 920; // Mobile: Search card is tall due to vertical stacking
            } else if (width < 1024) {
                console.log("<1024 called");
                threshold = 550; // Tablet: Search card uses 2 columns
            } else {
                console.log("general size called");
            }


            if (window.scrollY > threshold) {
                setShowStickySearch(true);
                console.log("showing sticky search");
            } else {
                setShowStickySearch(false);
            }
        };
        window.addEventListener("scroll", handleScroll);

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

        return () => window.removeEventListener("scroll", handleScroll);
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
            <div className="bg-primary-teal text-white py-12 px-6 text-center rounded-t-lg">
                <h1 className="text-4xl mb-4 font-bold">Book Your Bus Ticket</h1>
                <p className="text-xl opacity-90">
                    Find and book buses to your favorite destinations
                </p>
            </div>

            {/* Sticky Search Bar - appears when scrolling past main search */}
            {showStickySearch && (
                <div className="fixed top-20 left-0 w-full bg-blue-600 border-t border-blue-400 px-8 py-3 z-40 shadow-lg animate-fadeIn transition-all duration-300 ease-out">
                    <div className="max-w-7xl mx-auto flex gap-3 items-end justify-center md:justify-start flex-wrap">
                        <div className="flex-1 min-w-38">
                            <input
                                type="text"
                                name="source"
                                value={displayText.source}
                                onChange={handleInputChange}
                                list="nav-stations-list"
                                placeholder="From..."
                                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>
                        <datalist id="nav-stations-list">
                            {stations.filter((s) => !s.delist).map((s) => (
                                    <option key={s.id} value={`${s.city}, ${s.name}`} />
                                ))}
                        </datalist>
                        <div className="flex-1 min-w-38">
                            <input
                                type="text"
                                name="destination"
                                value={displayText.destination}
                                onChange={handleInputChange}
                                list="nav-stations-list"
                                placeholder="To..."
                                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>
                        <div className="flex-1 min-w-38">
                            <input
                                type="date"
                                name="departureDate"
                                value={formData.departureDate}
                                min={today}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>
                        <div className="flex-1 min-w-38">
                            <input
                                type="date"
                                name="returnDate"
                                value={formData.returnDate}
                                min={formData.departureDate || today}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>
                        <button
                            onClick={handleSearch}
                            className="px-4 py-2 text-sm font-medium rounded-md bg-blue-500 text-white hover:bg-blue-700 transition-colors whitespace-nowrap"
                        >
                            Search
                        </button>
                    </div>
                </div>
            )}

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
                                    placeholder="From..."
                                    className="search-input w-full min-w-0 "
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
                                    className="search-input w-full min-w-0 "
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
                                    className="search-input w-full min-w-0 "
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
                                    className="search-input w-full min-w-0 "
                                />
                            </div>
                            <div className="sm:col-span-2 lg:col-span-4 flex justify-center mt-4">
                                <button
                                    className="btn btn-primary w-full md:w-64"
                                    onClick={handleSearch}
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Popular Routes */}
                <div className="page-header mt-8">
                    <div>
                        <h2>Popular Routes</h2>
                        <p>Check out our most popular destinations</p>
                    </div>
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
                <div className="mt-8">
                    <div className="page-header">
                        <div>
                            <h2>Special Offers</h2>
                            <p>Don't miss our current deals</p>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="card flex-1 flex flex-col">
                            <div className="card-header">
                                <h3 className="text-2xl">Travel Bonds</h3>
                            </div>
                            <div className="card-body flex-1">
                                <p>Get exclusive discounts with our monthly travel bonds</p>
                            </div>
                            <div className="card-footer flex items-center justify-center">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => navigate("/bonds")}
                                >
                                    Explore Bonds
                                </button>
                            </div>
                        </div>
                        <div className="card flex-1 flex flex-col">
                            <div className="card-header">
                                <h3 className="text-2xl">Promotions</h3>
                            </div>
                            <div className="card-body flex-1">
                                <p>Check out our latest sales and promotional offers</p>
                            </div>
                            <div className="card-footer flex items-center justify-center">
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
