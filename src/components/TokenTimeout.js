import React, { useEffect } from "react";
import jwt from "jsonwebtoken";
import { useNavigate } from "react-router-dom";

function TokenExpiration() {
    const navigate = useNavigate();

    function checkTokenExpired(token) {
        const decodedToken = (() => {
            try {
                return jwt.decode(token);
            } catch (error) {
                console.error(`Error decoding the token ${error}`);
                return null;
            }
        })();

        if (decodedToken && decodedToken.exp) {
            const currentTime = Math.floor(Date.now() / 1000);
            const warningThreshold = 30;
            const timeUntilExpiration = decodedToken.exp - currentTime;

            if (timeUntilExpiration < warningThreshold) {
                alert(
                    "Your session will expire soon. Please refresh or log out.",
                );
            }

            if (timeUntilExpiration <= 0) {
                localStorage.removeItem("jwt");
                localStorage.removeItem("userId");
                navigate("/login");
            }
        }
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            const storedToken = localStorage.getItem("jwt");
            if (storedToken) {
                checkTokenExpired(storedToken);
            }
        }, 30_000);

        return () => {
            clearInterval(intervalId);
        };
    });

    return null;
}

export default TokenExpiration;
