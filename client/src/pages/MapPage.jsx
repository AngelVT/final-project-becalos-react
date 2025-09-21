import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/map.css"
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config/env.config.js";
import UserIcon from "../assets/user-icon.svg";

axios.defaults.withCredentials = true;

function RecenterMap({ position, zoom }) {
    const map = useMap();
    useEffect(() => {
        if (position) {
            map.setView(position, zoom);
        }
    }, [position, zoom, map]);
    return null;
}

function Map() {
    const [position, setPosition] = useState([19.4326, -99.1332]);
    const [hasLocation, setHasLocation] = useState(false);
    const [username, setUsername] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setPosition([pos.coords.latitude, pos.coords.longitude]);
                setHasLocation(true);
            },
            () => {
                console.warn("Could not get location, using default.");
            }
        );

        const checkSession = async () => {
            try {
                const res = await axios.get(`${API_URL}/auth/check`, {
                    withCredentials: true,
                });
                if (res.data?.user) {
                    setUsername(res.data.user);
                }
            } catch {
                setUsername(null);
            }
        };

        checkSession();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post(`${API_URL}/auth/signout`, {}, { withCredentials: true });
            setUsername(null);
            navigate("/login");
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    return (
        <div style={{ height: "100vh", width: "100%", position: "relative" }}>
            <MapContainer
                center={position}
                zoom={hasLocation ? 13 : 10}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                />

                <RecenterMap position={position} zoom={hasLocation ? 13 : 10} />
            </MapContainer>

            <div className="user-control">

                <img src={UserIcon} alt="User" width={24} height={24} />

                {username ? (
                    <>
                        <span>{username}</span>
                        <button onClick={() => navigate("/register-point")}>Register point</button>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <Link to="/login">
                        Login
                    </Link>
                )}
            </div>
        </div>
    );
}

export default Map;