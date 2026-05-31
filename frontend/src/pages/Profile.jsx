import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
    const { logout } = useAuth();
    const [token, setToken] = useState(localStorage.getItem('sessionToken') || null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/login");
        } else {
            fetchUserProfile();
        }
    }, [token, navigate]);

    const handleLogout = async () => {
        if (window.confirm("Are you sure you want to log out?")) {
            await logout();
            navigate("/login");
        }
    };

    const fetchUserProfile = async () => {
        try {
            // TODO: Implement API call to fetch user profile
            const userResponse = await fetch('/api/auth/validate', {
                method: 'GET',
                headers: {'Authorization': `Bearer ${token}`},
            });
            const userData = await userResponse.json()
            setUser(userData);
        } catch (err) {
            console.error("Error fetching profile:", err);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        return dateString.split("T")[0];
    };

    if (loading) {
        return (
            <div className="app-container">
                <div className="page-container">
                    <div className="loading">Loading your profile...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="app-container">
            <div className="page-container">
                <div className="page-header">
                    <div>
                        <h1>My Profile</h1>
                        <p>View and manage your personal information</p>
                    </div>
                </div>

                {user && (
                    <div className="grid grid-2">
                        <div className="card">
                            <div className="card-header">
                                <h3>Personal Information</h3>
                            </div>
                            <div className="card-body">
                                <div className="mb-4">
                                    <p>
                                        <strong>Name:</strong> {user.username}
                                    </p>
                                    <p>
                                        <strong>Email:</strong> {user.mail}
                                    </p>
                                    <p>
                                        <strong>Member since:</strong>{" "}
                                        {formatDate(user.joinDate)}
                                    </p>
                                </div>
                            </div>
                            <div className="card-footer">
                                <Link
                                    to="/settings"
                                    className="btn btn-primary text-white!"
                                >
                                    Edit Profile
                                </Link>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-header">
                                <h3>Quick Stats</h3>
                            </div>
                            <div className="card-body">
                                <div className="text-center py-4">
                                    <div className="text-5xl text-blue-500 mb-2">
                                        {user.totalTicket || 0}
                                    </div>
                                    <p className="text-slate-600">
                                        Total Tickets Booked
                                    </p>
                                </div>
                            </div>
                            <div className="card-footer">
                                <Link
                                    to="/my-tickets"
                                    className="btn btn-primary text-white! w-full text-center"
                                >
                                    View My Tickets
                                </Link>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-header">
                                <h3>Account Settings</h3>
                            </div>
                            <div className="card-body">
                                <ul className="list-none p-0">
                                    <li className="mb-3">
                                        <Link
                                            to="profile/settings"
                                            className="text-blue-500 no-underline"
                                        >
                                            ⚙️ Settings
                                        </Link>
                                    </li>
                                    <li className="mb-3">
                                        <Link
                                            to="profile/my-tickets"
                                            className="text-blue-500 no-underline"
                                        >
                                            🎫 My Tickets
                                        </Link>
                                    </li>
                                    <li>
                                        <button
                                            onClick={handleLogout}
                                            className="text-red-500 bg-transparent border-none p-0 cursor-pointer font-inherit hover:underline"
                                        >
                                            🚪 Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
