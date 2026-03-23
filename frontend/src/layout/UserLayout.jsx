import { Link, Outlet } from "react-router-dom";

const UserLayout = () => {
    return (
        // Another Navbar with the user menu
        <div>
            {/* Profile Navbar */}
            <div className="mb-6 border-b border-slate-200">
                <div className="flex gap-4 flex-wrap">
                    <Link
                        to="."
                        className="text-blue-500 no-underline font-medium px-4 py-2 border-b-2 border-blue-500"
                    >
                        Profile
                    </Link>
                    <Link
                        to="my-tickets"
                        className="text-slate-600 no-underline font-medium px-4 py-2 hover:text-blue-500 transition-colors"
                    >
                        My Tickets
                    </Link>
                    <Link
                        to="settings"
                        className="text-slate-600 no-underline font-medium px-4 py-2 hover:text-blue-500 transition-colors"
                    >
                        Settings
                    </Link>
                    <Link
                        to="/admin"
                        className="text-slate-600 no-underline font-medium px-4 py-2 hover:text-blue-500 transition-colors"
                    >
                        Admin
                    </Link>
                </div>
            </div>
            <Outlet />
        </div>
    );
};

export default UserLayout;
