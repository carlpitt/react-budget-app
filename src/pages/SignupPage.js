import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

const url = "http://159.203.118.58:5000";

function SignupPage() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const navigate = useNavigate();
    function handleInputChange (change) {
        setFormData({
            ...formData,
            [change.target.name]: change.target.value,
        });
    };

    async function handleRegister  ()  {
        try {
            localStorage.removeItem("jwt");
            localStorage.removeItem("userId");
            const registerResponse = await Axios.post(
                `${url}/api/register`,
                {
                    username: formData.username,
                    password: formData.password,
                },
            );
            console.log("Server response (sign up):", registerResponse.data);

            const loginResponse = await Axios.post(
                `${url}/api/login`,
                {
                    username: formData.username,
                    password: formData.password,
                },
            );
            console.log("Server response (login):", loginResponse.data);
            localStorage.setItem("jwt", loginResponse.data.token);
            localStorage.setItem("userId", loginResponse.data.userId);
            navigate("/dashboard");
        } catch (error) {
            console.error(`Sign up failed: ${error}`);
        }
    };

    return (
        <div className="container">
            <form>
                <div className="form-outline">
                    <input
                        type="Username"
                        id="form2Example1"
                        className="form-control"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                    ></input>
                    <label className="form-label" htmlFor="form2Example1">
                        Username
                    </label>
                </div>

                <div className="form-outline">
                    <input
                        type="password"
                        id="form2Example2"
                        className="form-control"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    ></input>
                    <label className="form-label" htmlFor="form2Example2">
                        Password
                    </label>
                </div>

                <div className="row"></div>

                <button
                    type="button"
                    className="btn"
                    onClick={handleRegister}
                >
                    Register
                </button>

                <div className="text-center">
                    <p>
                        Already signed up? <Link to="/login">Sign in</Link>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default SignupPage;
