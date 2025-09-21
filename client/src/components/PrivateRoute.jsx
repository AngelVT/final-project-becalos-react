import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config/env.config.js";

axios.defaults.withCredentials = true;

function PrivateRoute({ children }) {
    const [isAuth, setIsAuth] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get(`${API_URL}/auth/check`, { withCredentials: true });
                if (res.status === 200) {
                    setIsAuth(true);
                } else {
                    setIsAuth(false);
                }
            } catch (err) {
                setIsAuth(false);
                setError(err.response?.data?.msg || "Unauthorized");
            }
        };

        checkAuth();
    }, []);

    if (isAuth === null) return <p>Checking authentication...</p>;
    if (!isAuth) return <Navigate to="/login" state={{ error }} />;

    return children;
}

export default PrivateRoute;