import { useEffect, useState } from "react";
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

const UserProtectedRoute = () => {
    const {isAuthenticated, token, logout} = useAuth();
    const [status, setStatus] = useState(token ? 'loading' : 'invalid');

    useEffect(() => {
        if(!token && !isAuthenticated) {
            return;
        }
        
        console.log("Validating user signature...");
        fetch('/api/auth/validate', {
            method: 'GET',
            headers: {'Authorization': `Bearer ${token}`},
        })
        .then(validateRes => { 
            if(!validateRes.ok) {
                throw new Error("Your session has expired. Please log in again.")
            }
            console.log("User signature valid");
            setStatus('valid');
        })
        .catch(err => {
            console.error(err.message);
            logout();
            setStatus('invalid');
        })
    }, [token, logout]);

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

export default UserProtectedRoute;
