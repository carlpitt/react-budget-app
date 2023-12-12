import React from "react";
import { Link } from "react-router-dom";

function Menu() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container px-5">
                <Link to="/" className="navbar-brand" href="#!">
                    Personal Budget
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/login" className="nav-link" href="#!">
                                Login
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/logout" className="nav-link" href="#!">
                                Logout
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/signup" className="nav-link">
                                Signup
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                to="/dashboard"
                                className="nav-link"
                                href="#!"
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                to="/update_budget"
                                className="nav-link"
                                href="#!"
                            >
                                Update Budget
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Menu;
