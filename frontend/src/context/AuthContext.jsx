import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try{
            const token = localStorage.getItem('token');
            if(token){
                setIsLogin(true);
            }
        }
        catch(err){
            setError(err);
            setIsLogin(false);
        }
        finally{
            setLoading(false)
        }
    }

    return <AuthContext.Provider value={{ /* values */}}>{children}</AuthContext.Provider>
}