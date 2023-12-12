import React from "react";
import { Link, useNavigate } from "react-router-dom";

function LogoutPage() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear authentication-related information from local storage
        localStorage.removeItem("jwt");
        localStorage.removeItem("userId");

        // Redirect the user to the login page
        navigate("/login");
    };

    return (
        <div className="container h-100 d-flex align-items-center justify-content-center">
            <div className="col-md-4 mb-5">
                <div className="card h-100">
                    <div className="card-body">
                        <h2 className="card-title">Log out</h2>
                        <p className="card-text">
                            Are you sure you want to logout?
                        </p>
                        <button
                            className="btn btn-danger"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                    <div className="card-footer">
                        <Link
                            to="/dashboard"
                            className="btn btn-primary btn-sm"
                            href="#!"
                        >
                            Cancel
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LogoutPage;
