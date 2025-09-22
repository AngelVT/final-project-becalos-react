import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config/env.config.js";
import { useNavigate } from "react-router-dom";
import "../styles/login.css"

axios.defaults.withCredentials = true;

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const checkSession = async () => {
            try {
                await axios.get(`${API_URL}/auth/check`);
                navigate("/map");
            } catch {
                // not logged in → stay on login
            }
        };
        checkSession();
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await axios.post(
                `${API_URL}/auth/signin`,
                { username, password },
                { withCredentials: true }
            );
            console.log("Login success:", res.data);
            navigate("/map");
        } catch (err) {
            setError(err.response?.data?.msg || "Login failed");
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="form-group">
                    <label>Username: </label>
                    <input
                        type="text"
                        value={username}
                        placeholder="Enter your username"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password: </label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {error && <p className="error">{error}</p>}

                <button type="submit" className="btn-login">Login</button>

                <p className="register-link" onClick={() => navigate("/register")}>
                    Register here!
                </p>
            </form>
        </div>
    );
}

export default Login;