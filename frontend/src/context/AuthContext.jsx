import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem("sessionToken"));
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true)

    const login = async (mail, password) => {
        setLoading(true);

        try {
            const passRes = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ mail, password }),
            });

            const passData = await passRes.json();

            if(!passRes.ok) {
                throw new Error(passData.error || "Invalid email or password");
            }

            console.log("OK");
            setIsAuthenticated(true);
            localStorage.setItem("sessionToken", passData.token);
            setToken(passData.token);
        } catch (err) {
            console.debug(err);
            throw new Error(err.message || "Invalid email or password");
        } finally {
            setLoading(false);
        }
    }

    const register = async (formData) => {
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if(!response.ok) {
                throw new Error(data.error || "Registration failed. Please try again.");
            }

            alert("Registration successful! You can now log in.");
            navigate("/login");
        } catch (err) {
            console.error(err.message);
            throw new Error(err.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    const logout = () => {
        localStorage.removeItem("sessionToken");
        setToken(null);
        setIsAuthenticated(false);
        navigate("/");
    }

    return (
        <AuthContext.Provider value={{ token, isAuthenticated, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
