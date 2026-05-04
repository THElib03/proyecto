import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(mail)) {
            setError("Please enter a valid email address.");
            return;
        }

        try{
            await login(mail, password);
            alert("Login successful! Redirecting...");
            navigate("/");
        } catch (err) {
            setError(err.message || "Login failed. Please try again.");
            console.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="app-container min-h-screen flex items-center justify-center p-4">
            <div className="page-container">
                <div className="page-header">
                    <h1>Sign In</h1>
                    <p>Welcome back! Please login to your account</p>
                </div>

                <div className="form-container">
                    {error && <div className="alert alert-error">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="mail">Email Address</label>
                            <input
                                id="mail"
                                type="mail"
                                value={mail}
                                onChange={(e) => setMail(e.target.value)}
                                placeholder="your@email.com"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                            disabled={loading}
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p>
                            Don't have an account?{" "}
                            <Link
                                to="/register"
                                className="text-blue-500 no-underline"
                            >
                                Create one
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
