/*import { MapContainer, TileLayer, useMap } from "react-leaflet";
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

export default Map;*/

import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/map.css";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config/env.config.js";
import UserIcon from "../assets/user-icon.svg";
import 'bootstrap-icons/font/bootstrap-icons.css';

axios.defaults.withCredentials = true;

function RecenterMap({ position, zoom }) {
    const map = useMap();
    useEffect(() => {
        if (position) map.setView(position, zoom);
    }, [position, zoom, map]);
    return null;
}

// Helper to convert average rating (0-10) to stars
function renderStarsFromScore(score) {
    const fullStars = Math.floor(score / 2);
    const halfStar = score % 2 >= 1;
    const stars = [];

    for (let i = 0; i < fullStars; i++) stars.push(<i key={i} className="bi bi-star-fill" style={{ color: "#FFD700" }}></i>);
    if (halfStar) stars.push(<i key="half" className="bi bi-star-half" style={{ color: "#FFD700" }}></i>);
    while (stars.length < 5) stars.push(<i key={stars.length} className="bi bi-star" style={{ color: "#FFD700" }}></i>);

    return <span>{stars}</span>;
}

function Map() {
    const [position, setPosition] = useState([19.4326, -99.1332]);
    const [hasLocation, setHasLocation] = useState(false);
    const [username, setUsername] = useState(null);
    const [points, setPoints] = useState([]);
    const [ratingInputs, setRatingInputs] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setPosition([pos.coords.latitude, pos.coords.longitude]);
                setHasLocation(true);
            },
            () => console.warn("Could not get location, using default.")
        );

        const checkSession = async () => {
            try {
                const res = await axios.get(`${API_URL}/auth/check`, {
                    withCredentials: true,
                });
                if (res.data?.user) setUsername(res.data.user);
            } catch {
                setUsername(null);
            }
        };

        checkSession();
        fetchPoints();
    }, []);

    // Fetch all points from API
    const fetchPoints = async () => {
        try {
            const res = await axios.get(`${API_URL}/points/all`);
            // Assume server returns geojson: { geojson: { features: [...] } }
            setPoints(res.data.geojson.features);
        } catch (err) {
            console.error("Failed to fetch points:", err);
        }
    };

    const handleLogout = async () => {
        try {
            await axios.post(`${API_URL}/auth/signout`, {}, { withCredentials: true });
            setUsername(null);
            navigate("/login");
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    const handleRatingChange = (pointID, value) => {
        setRatingInputs({ ...ratingInputs, [pointID]: value });
    };

    const submitRating = async (pointID) => {
        const score = ratingInputs[pointID];
        if (!score) return;
        try {
            await axios.put(`${API_URL}/points/rate/${pointID}`, { score });
            await fetchPoints(); // refresh points to update ratings
            setRatingInputs({ ...ratingInputs, [pointID]: "" });
        } catch (err) {
            console.error("Failed to submit rating:", err);
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

                {points.map((p) => (
                    <Marker
                        key={p.properties.point_id}
                        position={[p.geometry.coordinates[1], p.geometry.coordinates[0]]}
                    >
                        <Popup>
                            <div className="popup-content">
                                <strong className="popup-title">{p.properties.name}</strong>
                                <p className="popup-description">{p.properties.description}</p>
                                <p className="popup-rating">
                                    Rating: <br />
                                    {renderStarsFromScore(p.properties.average_score || 0)}
                                </p>
                                <p className="popup-total-ratings">Total Ratings: {p.properties.total_ratings || 0}</p>

                                {username && (
                                    <div className="popup-user-rating">
                                        <input
                                            type="range"
                                            min={0}
                                            max={10}
                                            step={1}
                                            value={ratingInputs[p.properties.point_id] || 0}
                                            onChange={(e) =>
                                                handleRatingChange(p.properties.point_id, parseInt(e.target.value))
                                            }
                                            className="rating-slider"
                                        />
                                        <div className="rating-stars">
                                            {renderStarsFromScore(ratingInputs[p.properties.point_id] || 0)}
                                        </div>
                                        <button className="rating-button" onClick={() => submitRating(p.properties.point_id)}>
                                            Rate
                                        </button>
                                    </div>
                                )}
                            </div>
                        </Popup>
                    </Marker>
                ))}
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
                    //<Link to="/login">Login</Link>
                    <button onClick={() => navigate("/login")}>LogIn</button>
                )}
            </div>
        </div>
    );
}

export default Map;