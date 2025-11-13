import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../css/Register.css";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    // Theme toggle function
    const toggleTheme = () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    };

    // Load saved theme on mount
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", savedTheme);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://127.0.0.1:5000/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: name, email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage("✅ Registration successful! Redirecting to login...");
                setIsError(false);
                setTimeout(() => navigate("/login"), 2500);
            } else {
                setMessage(data.error || "❌ Registration failed. Try again.");
                setIsError(true);
            }
        } catch (err) {
            console.error("Registration error:", err);
            setMessage("⚠️ Something went wrong. Please try again.");
            setIsError(true);
        }
    };

    return (
        <div className="register-container fade-in">
            <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Dark Mode">
                💡
            </button>

            <div className="register-card">
                <h2 className="register-title">Create Your Account 🚀</h2>
                <p className="register-subtitle">Join us and manage your tasks with ease</p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        className="register-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="register-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Enter your password"
                        className="register-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit" className="register-btn">
                        Register
                    </button>
                </form>

                {message && (
                    <p className={`register-message ${isError ? "error" : "success"}`}>
                        {message}
                    </p>
                )}

                <p className="register-footer">
                    Already have an account?{" "}
                    <Link to="/login" className="register-link">
                        Login
                    </Link>
                </p>

                <p className="backToHome">
                    <Link to="/" className="homepage_link">
                        Back to homepage
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
