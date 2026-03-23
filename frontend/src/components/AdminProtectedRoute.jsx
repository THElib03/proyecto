import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';

//TODO: Adapt to whatever is necessary for admins.
const AdminProtectedRoute = () => {
    const {isAuthenticated, token, logout} = useAuth();
    const [status, setStatus] = useState(token ? 'loading' : 'invalid');

    useEffect(() => {});

    if(status === 'loading') {
        return <div>Loading...</div>
    }
    if(status === 'invalid') {
        console.log("Not authenticated");
        logout();
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
};

export default AdminProtectedRoute;