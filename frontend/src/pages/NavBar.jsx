import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
    const navigate = useNavigate();
    const navRef = useRef(null);
    const { token } = useAuth();
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [stations, setStations] = useState([]);
    const isActive = (path) => (location.pathname === path ? "active" : "");
    const today = new Date().toLocaleDateString('en-CA');

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

    // Handle closing menu on scroll or click outside
    useEffect(() => {
        if (!isNavOpen) return;

        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setIsNavOpen(false);
            }
        };

        const handleScroll = () => {
            setIsNavOpen(false);
        };

        document.addEventListener("mousedown", handleClickOutside);
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isNavOpen]);

    return (
        <nav ref={navRef} className="sticky top-0 z-100 w-full! bg-blue-500 shadow-md">
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
                        className={`flex gap-8 items-center flex-col md:flex-row md:flex-wrap absolute md:relative top-16 md:top-0 left-0 right-0 bg-blue-500 md:bg-transparent p-4 md:p-0 w-full md:w-auto transition-all duration-300 ease-in-out
                            ${isNavOpen 
                                ? "opacity-100 translate-y-0 pointer-events-auto" 
                                : "opacity-0 -translate-y-4 pointer-events-none md:opacity-100 md:translate-y-0 md:pointer-events-auto"}
                        `}
                        onClick={() => setIsNavOpen(false)}
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
