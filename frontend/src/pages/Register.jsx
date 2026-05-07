import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
    const { register } = useAuth();

    const [formData, setFormData] = useState({
        username: "",
        mail: "",
        password: "",
        confirmPassword: "",
        citId: "",
        phone: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const { username, mail, password, confirmPassword, citId, phone } = formData;

        if (!username || !mail || !password || !citId || !phone) {
            setError("All fields are required.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(mail)) {
            setError("Please enter a valid email address.");
            return;
        }

        const idRegex = /^\d{8}[a-zA-Z]$/;
        if (!idRegex.test(citId)) {
            setError("ID Number must be 8 digits followed by a letter (e.g., 12345678A).");
            return;
        }

        const phoneRegex = /^\d+$/;
        if (!phoneRegex.test(phone)) {
            setError("Phone number must contain only numbers.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);
        try {
            await register(formData);
        } catch (err) {
            setError(err.message || "Registration failed. Please try again.");
            console.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="app-container min-h-screen flex items-center justify-center p-4">
            <div className="page-container max-w-lg">
                <div className="page-header">
                    <h1>Create Account</h1>
                    <p>Join us and start booking your tickets</p>
                </div>

                <div className="form-container">
                    {error && <div className="alert alert-error">{error}</div>}
                    {console.log(error)}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Full Name</label>
                            <input
                                id="username"
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="John Doe"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="mail">Email Address</label>
                            <input
                                id="mail"
                                type="mail"
                                name="mail"
                                value={formData.mail}
                                onChange={handleChange}
                                placeholder="your@email.com"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="citId">ID Number</label>
                            <input
                                id="citId"
                                type="text"
                                name="citId"
                                value={formData.citId}
                                onChange={handleChange}
                                placeholder="12345678A"
                                pattern="\d{8}[a-zA-Z]"
                                title="8 numbers followed by 1 letter"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input
                                id="phone"
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="612345678"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                            disabled={loading}
                        >
                            {loading ? "Creating Account..." : "Create Account"}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p>
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="text-blue-500 no-underline"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
