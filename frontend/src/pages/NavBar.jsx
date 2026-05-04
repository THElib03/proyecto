import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
    const navigate = useNavigate();
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [showStickySearch, setShowStickySearch] = useState(false);
    const [stickySearchData, setStickySearchData] = useState({
        source: "",
        destination: "",
        departureDate: "", // Keep departureDate
        returnDate: "",
    });
    const [stations, setStations] = useState([]);
    const { token } = useAuth();
    const isActive = (path) => (location.pathname === path ? "active" : ""); // Keep this line
    const today = new Date().toLocaleDateString('en-CA'); // Corrected date format

    // Detect scroll position
    useEffect(() => {
        const handleScroll = () => {
            // Show sticky search when scrolled past ~350px
            if (window.scrollY > 380) {
                setShowStickySearch(true);
            } else {
                setShowStickySearch(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        const fetchStations = async () => {
            try {
                const response = await fetch("/api/station");
                const data = await response.json();
                setStations(Array.isArray(data) ? data : data.data || []);
            } catch (err) { console.error("Error fetching stations in Nav:", err); }
        };
        fetchStations();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleStickySearchInputChange = (e) => {
        const { name, value } = e.target;
        setStickySearchData((prev) => ({ ...prev, [name]: value }));
    };

    const handleStickySearch = () => {
        if (stickySearchData.source && stickySearchData.destination) {
            const params = new URLSearchParams();
            params.append("source", stickySearchData.source);
            params.append("destination", stickySearchData.destination);
            params.append("from", stickySearchData.source);
            params.append("to", stickySearchData.destination);
            params.append("departureDate", stickySearchData.departureDate);
            if (stickySearchData.returnDate) {
                params.append("returnDate", stickySearchData.returnDate);
            }
            navigate(`/search?${params.toString()}`);
        }
    };

    return (
        <nav className="sticky top-0 z-100 w-full! bg-blue-500 shadow-md">
            <div className="mx-auto w-full! px-8 py-4 flex justify-between items-center">
                <Link
                    to="/"
                    className="text-xl font-bold text-white! no-underline cursor-pointer"
                >
                    <img src="/logo.png" alt="BusBooking Logo" className="h-12" />
                </Link>
                <div className="flex w-full justify-end items-center gap-8 md:gap-0">
                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsNavOpen(!isNavOpen)}
                        className="md:hidden bg-transparent! border-none text-black text-xl! cursor-pointer menu-toggle"
                    >
                        ☰
                    </button>

                    {/* Navigation Links */}
                    <div
                        className={`${isNavOpen ? "flex" : "hidden"} md:flex gap-8 items-center flex-col md:flex-row md:flex-wrap absolute md:relative top-16 md:top-0 left-0 right-0 bg-blue-500 md:bg-transparent p-4 md:p-0 w-full md:w-auto`}
                    >
                        <Link
                            to="/"
                            className={`text-white! no-underline font-medium px-3 py-2 rounded transition-colors ${isActive("/")}`}
                        >
                            Home
                        </Link>
                        <Link
                            to="/search"
                            className={`text-white! no-underline font-medium px-3 py-2 rounded transition-colors ${isActive("/search")}`}
                        >
                            Search
                        </Link>
                        {/* <Link
                            to="/bonds"
                            className={`text-white! no-underline font-medium px-3 py-2 rounded transition-colors ${isActive("/bonds")}`}
                        >
                            Bonds
                        </Link> 
                        <Link
                            to="/promos"
                            className={`text-white! no-underline font-medium px-3 py-2 rounded transition-colors ${isActive("/promos")}`}
                        >
                            Promos
                        </Link>*/}

                        {/* User Menu */}
                        <div className="flex gap-4 items-center ml-auto pl-8 border-l border-white border-opacity-20">
                            {!token && (<Link
                                to="/login"
                                className={`text-blue-500 no-underline font-semibold px-4 py-2 rounded bg-white ${isActive("/login")}`}
                            >
                                Sign In
                            </Link>)}
                            
                            {token && (
                                <Link to="/profile"
                                    className={`text-white! no-underline font-medium px-3 py-2 rounded transition-colors ${isActive("/profile")}`}
                                >
                                    Profile
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Search Bar - appears when scrolling past main search */}
            {showStickySearch && (
                <div className="bg-blue-600 border-t border-blue-400 px-8 py-3 animate-fadeIn transition-all duration-300 ease-out">
                    <div className="max-w-7xl mx-auto flex gap-3 items-end justify-center md:justify-start flex-wrap">
                        <div className="flex-1 min-w-[150px]">
                            <input
                                type="text"
                                name="source"
                                value={stickySearchData.source}
                                onChange={handleStickySearchInputChange}
                                list="nav-stations-list"
                                placeholder="From..."
                                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>
                        <datalist id="nav-stations-list">
                            {stations.map((s) => (
                                <option key={s.id} value={s.name} />
                            ))}
                        </datalist>
                        <div className="flex-1 min-w-[150px]">
                            <input
                                type="text"
                                name="destination"
                                value={stickySearchData.destination}
                                onChange={handleStickySearchInputChange}
                                list="nav-stations-list"
                                placeholder="To..."
                                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>
                        <div className="flex-1 min-w-[150px]">
                            <input
                                type="date"
                                name="departureDate"
                                value={stickySearchData.departureDate}
                                min={today}
                                onChange={handleStickySearchInputChange}
                                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>
                        <div className="flex-1 min-w-[150px]">
                            <input
                                type="date"
                                name="returnDate"
                                value={stickySearchData.returnDate}
                                min={stickySearchData.departureDate || today}
                                onChange={handleStickySearchInputChange}
                                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>
                        <button
                            onClick={handleStickySearch}
                            className="px-4 py-2 text-sm font-medium rounded-md bg-blue-500 text-white hover:bg-blue-700 transition-colors whitespace-nowrap"
                        >
                            Search
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default NavBar;
