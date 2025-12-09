import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
    const { user, isAuthenticated, setUser, setIsAuthenticated } =
        useContext(AuthContext);

    const handleLogout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    return (
        <nav className="flex justify-between items-center p-4 bg-white shadow-md">
            <button className="theme-toggle"
                onClick={() => {
                    const currentTheme = document.documentElement.getAttribute("data-theme");
                    if (currentTheme === "dark") {
                        document.documentElement.setAttribute("data-theme", "light");
                        localStorage.setItem("theme", "light");
                    } else {
                        document.documentElement.setAttribute("data-theme", "dark");
                        localStorage.setItem("theme", "dark");
                    }
                }}
            >
                Toggle Dark Mode
            </button>
            {/* Logo / App name */}
            <Link to="/" className="text-xl font-bold text-blue-600">
                ToDo Manager
            </Link>

            {/* Navigation links */}
            <div className="space-x-4">
                {isAuthenticated ? (
                    <>
                        <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
                            Dashboard
                        </Link>
                        <Link to="/profile" className="text-gray-700 hover:text-blue-600">
                            Profile
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="text-red-600 font-medium hover:underline"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="text-gray-700 hover:text-blue-600">
                            Login
                        </Link>
                        <Link to="/register" className="text-gray-700 hover:text-blue-600">
                            Register
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
