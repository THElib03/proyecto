import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useMemo } from "react";

const UserLayout = () => {
    const { token } = useAuth();

    const isAdmin = useMemo(() => {
        if (!token) return false;
        try {
            const parts = token.split('.');
            if (parts.length < 2) return false;            
            const payload = JSON.parse(window.atob(parts[1]));

            return payload.role === "ROLE_ADMIN" || 
                (Array.isArray(payload.roles) && payload.roles.includes("ROLE_ADMIN")) ||
                (Array.isArray(payload.authorities) && payload.authorities.includes("ROLE_ADMIN"));
        } catch (e) {
            return false;
        }
    }, [token]);

    const getLinkClass = ({ isActive }) => 
        isActive 
            ? "text-blue-500! no-underline font-medium px-4 py-2 border-b-2 border-blue-500" 
            : "text-slate-600 no-underline font-medium px-4 py-2 hover:text-blue-500! transition-colors";

    return (
        // Another Navbar with the user menu
        <div>
            {/* Profile Navbar */}
            <div className="border-b border-slate-200">
                <div className="flex gap-4 flex-wrap">
                    <NavLink to="." end className={getLinkClass}>
                        Profile
                    </NavLink>
                    <NavLink
                        to="my-tickets"
                        className={getLinkClass}
                    >
                        My Tickets
                    </NavLink>
                    <NavLink
                        to="settings"
                        className={getLinkClass}
                    >
                        Settings
                    </NavLink>
                    {isAdmin && (
                        <NavLink to="/admin" className={getLinkClass}>
                            Admin
                        </NavLink>
                    )}
                </div>
            </div>
            <Outlet />
        </div>
    );
};

export default UserLayout;
