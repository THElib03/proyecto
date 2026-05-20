import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
    const navigate = useNavigate();
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [stations, setStations] = useState([]);
    const { token } = useAuth();
    const isActive = (path) => (location.pathname === path ? "active" : ""); // Keep this line
    const today = new Date().toLocaleDateString('en-CA'); // Corrected date format

    // Detect scroll position
    useEffect(() => {
        const fetchStations = async () => {
            try {
                const response = await fetch("/api/station");
                const data = await response.json();
                setStations(Array.isArray(data) ? data : data.data || []);
            } catch (err) { console.error("Error fetching stations in Nav:", err); }
        };
        fetchStations();
    }, []);

    

    return (
        <nav className="sticky top-0 z-100 w-full! bg-blue-500 shadow-md">
            <div className="mx-auto w-full! px-8 py-4 flex justify-between items-center">
                <Link
                    to="/"
                    className="text-xl font-bold text-white! no-underline cursor-pointer"
                >
                    <img src="/logo.png" alt="BusBooking Logo" className="w-32 h-12 shrink-0 object-contain" />
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

            
        </nav>
    );
};

export default NavBar;
