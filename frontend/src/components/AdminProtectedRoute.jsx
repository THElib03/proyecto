import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import Error from '../pages/Error';

//TODO: Adapt to whatever is necessary for admins.
const AdminProtectedRoute = () => {
    const {isAuthenticated, token, logout} = useAuth();
    const [status, setStatus] = useState(token ? 'loading' : 'invalid');

    useEffect(() => {
        if(!token && !isAuthenticated) {
            return;
        }
        
        fetch('/api/auth/admin', {
            method: 'POST',
            headers: {'Authorization': `Bearer ${token}`},
        })
        .then(validateRes => { 
            if(!validateRes.ok) {
                setStatus('invalid');
                return;
            }
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
        return <Error/>;
    }
    return <Outlet />;
};

export default AdminProtectedRoute;