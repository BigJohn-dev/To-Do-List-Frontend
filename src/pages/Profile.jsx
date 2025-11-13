import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Profile() {
    const { user } = useContext(AuthContext);

    if (!user) {
        return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <p className="text-gray-600">No user data available.</p>
            <Link to="/login" className="text-blue-600 mt-4">
            Go to Login
            </Link>
        </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded p-8 w-96">
            <h2 className="text-2xl font-bold mb-6 text-center">Profile</h2>
            <div className="space-y-4">
            <p>
                <strong>Username:</strong> {user.username}
            </p>
            <p>
                <strong>Email:</strong> {user.email}
            </p>
            </div>
            <div className="mt-6 text-center">
            <Link
                to="/dashboard"
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Back to Dashboard
            </Link>
            </div>
        </div>
        </div>
    );
}

export default Profile;
