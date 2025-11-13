import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "../css/Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const toggleTheme = () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", newTheme);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://127.0.0.1:5000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                login(data.user, data.token);
                setMessage("✅ Login successful! Redirecting...");
                setIsError(false);
                setTimeout(() => navigate("/dashboard"), 1500);
            } else {
                setMessage(data.error || "❌ Login failed.");
                setIsError(true);
            }
        } catch (err) {
            console.error("Login error:", err);
            setMessage("⚠️ Something went wrong. Please try again.");
            setIsError(true);
        }
    };

    return (
        <div className="login-container fade-in">
            <button onClick={toggleTheme} className="theme-toggle">
                &#128161;
            </button>

            <div className="login-card">
                <h2 className="login-title">Welcome Back 👋</h2>
                <p className="login-subtitle">Login to manage your tasks</p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="login-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Enter your password"
                        className="login-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit" className="login-btn">
                        Login
                    </button>
                </form>

                {message && (
                    <p
                        className={`login-message ${isError ? "error" : "success"}`}
                    >
                        {message}
                    </p>
                )}

                <p className="login-footer">
                    Don’t have an account?{" "}
                    <Link to="/register" className="login-link">
                        Register
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

export default Login;
