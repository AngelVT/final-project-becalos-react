import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config/env.config.js";
import { useNavigate } from "react-router-dom";

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
        <div style={{ padding: "2rem" }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username: </label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password: </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}

export default Login;