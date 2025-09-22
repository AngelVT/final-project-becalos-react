/*import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { API_URL } from "../config/env.config.js";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/form.css";

axios.defaults.withCredentials = true;

const pointSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(100),
    description: z.string().min(2, "Description must be at least 2 characters").max(250),
    location: z
        .array(z.number())
        .length(2, "Location must be provided")
        .refine(([lon, lat]) => lon >= -180 && lon <= 180 && lat >= -90 && lat <= 90, {
            message: "Invalid coordinates",
        }),
});

function LocationPicker({ position, setPosition, setValue }) {
    useMapEvents({
        click(e) {
            const coords = [e.latlng.lng, e.latlng.lat]; // GeoJSON [lon, lat]
            setPosition(coords);
            setValue("location", coords, { shouldValidate: true });
        },
    });

    return position ? <Marker position={[position[1], position[0]]} /> : null;
}

function PointRegister() {
    const [position, setPosition] = useState(null);
    const [serverError, setServerError] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(pointSchema),
        defaultValues: { name: "", description: "", location: null },
    });

    const onSubmit = async (data) => {
        setServerError("");
        try {
            await axios.post(`${API_URL}/points/register`, data, { withCredentials: true });
            reset();
            setPosition(null);
        } catch (err) {
            setServerError(err.response?.data?.msg || "Failed to register point");
        }
    };

    return (
        <div className="form-container">
            <h2>Register Point</h2>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" {...register("name")} />
                    {errors.name && <p className="error">{errors.name.message}</p>}
                </div>

                <div className="form-group">
                    <label>Description:</label>
                    <textarea {...register("description")} />
                    {errors.description && <p className="error">{errors.description.message}</p>}
                </div>

                <div className="map-wrapper">
                    <MapContainer center={[19.4326, -99.1332]} zoom={13} style={{ height: "300px" }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                        />
                        <LocationPicker position={position} setPosition={setPosition} setValue={setValue} />
                    </MapContainer>
                    <p className="map-instruction">Click on the map to select a point</p>
{errors.location && <p className="error">{errors.location.message}</p>}
                    {(!position || errors.location) && (
                        <p className="error">
                            {position ? errors.location?.message : "Please click on the map to select a point"}
                        </p>
                    )}
                </div>

                {serverError && <p className="error">{serverError}</p>}

                <button type="submit">Register Point</button>
            </form>
        </div>
    );
}

export default PointRegister;*/

/*import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { API_URL } from "../config/env.config.js";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/form.css";
import UserIcon from "../assets/user-icon.svg";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

const pointSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(100),
    description: z.string().min(2, "Description must be at least 2 characters").max(250),
    location: z
        .array(z.number())
        .length(2, "Location must be provided")
        .refine(([lon, lat]) => lon >= -180 && lon <= 180 && lat >= -90 && lat <= 90, {
            message: "Invalid coordinates",
        }),
});

// Component to pick location on the map
function LocationPicker({ position, setPosition, setValue }) {
    useMapEvents({
        click(e) {
            const coords = [e.latlng.lng, e.latlng.lat]; // GeoJSON [lon, lat]
            setPosition(coords);
            setValue("location", coords, { shouldValidate: true });
        },
    });

    return position ? <Marker position={[position[1], position[0]]} /> : null;
}

// Floating user control with logout
function UserControl() {
    const [username, setUsername] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkSession = async () => {
            try {
                const res = await axios.get(`${API_URL}/auth/check`, { withCredentials: true });
                if (res.data?.user) setUsername(res.data.user);
            } catch {
                navigate("/login");
            }
        };
        checkSession();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await axios.post(`${API_URL}/auth/signout`, {}, { withCredentials: true });
            navigate("/login");
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    return (
        <div className="user-control" style={{ position: "absolute", top: "10px", right: "10px", zIndex: 999 }}>
            <img src={UserIcon} alt="User" width={24} height={24} />
            <span>{username}</span>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

function PointRegister() {
    const [position, setPosition] = useState(null);
    const [serverError, setServerError] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(pointSchema),
        defaultValues: { name: "", description: "", location: null },
    });

    const onSubmit = async (data) => {
        setServerError("");
        try {
            await axios.post(`${API_URL}/points/register`, data, { withCredentials: true });
            reset();
            setPosition(null);
        } catch (err) {
            setServerError(err.response?.data?.msg || "Failed to register point");
        }
    };

    return (
        <>
            <UserControl />
            <div className="form-container">
                <h2>Register Point</h2>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="form-group">
                        <label>Name:</label>
                        <input type="text" {...register("name")} />
                        {errors.name && <p className="error">{errors.name.message}</p>}
                    </div>

                    <div className="form-group">
                        <label>Description:</label>
                        <textarea {...register("description")} />
                        {errors.description && <p className="error">{errors.description.message}</p>}
                    </div>

                    <div className="map-wrapper">
                        <MapContainer center={[19.4326, -99.1332]} zoom={13} style={{ height: "300px" }}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                            />
                            <LocationPicker position={position} setPosition={setPosition} setValue={setValue} />
                        </MapContainer>
                        <p className="map-instruction">Click on the map to select a point</p>
                        {(!position || errors.location) && (
                            <p className="error">
                                {position ? errors.location?.message : "Please click on the map to select a point"}
                            </p>
                        )}
                    </div>

                    {serverError && <p className="error">{serverError}</p>}

                    <button type="submit">Register Point</button>
                </form>
            </div>
        </>
    );
}

export default PointRegister;*/

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { API_URL } from "../config/env.config.js";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/form.css";
import UserIcon from "../assets/user-icon.svg";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

const pointSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(100),
    description: z.string().min(2, "Description must be at least 2 characters").max(250),
    location: z
        .array(z.number())
        .length(2, "Location must be provided")
        .refine(([lon, lat]) => lon >= -180 && lon <= 180 && lat >= -90 && lat <= 90, {
            message: "Invalid coordinates",
        }),
});

function LocationPicker({ position, setPosition, setValue }) {
    useMapEvents({
        click(e) {
            const coords = [e.latlng.lng, e.latlng.lat]; // GeoJSON [lon, lat]
            setPosition(coords);
            setValue("location", coords, { shouldValidate: true });
        },
    });

    return position ? <Marker position={[position[1], position[0]]} /> : null;
}

function UserControl() {
    const [username, setUsername] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkSession = async () => {
            try {
                const res = await axios.get(`${API_URL}/auth/check`, { withCredentials: true });
                if (res.data?.user) setUsername(res.data.user);
            } catch {
                navigate("/login");
            }
        };
        checkSession();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await axios.post(`${API_URL}/auth/signout`, {}, { withCredentials: true });
            navigate("/login");
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    return (
        <div className="user-control" style={{ position: "absolute", top: "10px", right: "10px", zIndex: 999 }}>
            <img src={UserIcon} alt="User" width={24} height={24} />
            <span>{username}</span>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

function PointRegister() {
    const [position, setPosition] = useState(null);
    const [serverError, setServerError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(pointSchema),
        defaultValues: { name: "", description: "", location: null },
    });

    const onSubmit = async (data) => {
        setServerError("");
        setSuccessMessage("");
        try {
            await axios.post(`${API_URL}/points/register`, data, { withCredentials: true });
            reset();
            setPosition(null);
            setSuccessMessage("Point registered successfully!");
            setTimeout(() => setSuccessMessage(""), 3000); // hide toast after 3s
        } catch (err) {
            setServerError(err.response?.data?.msg || "Failed to register point");
        }
    };

    return (
        <>
            <UserControl />
            <div className="form-container">
                <h2>Register Point</h2>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="form-group">
                        <label>Name:</label>
                        <input type="text" placeholder="Enter a name for this point" {...register("name")} />
                        {errors.name && <p className="error">{errors.name.message}</p>}
                    </div>

                    <div className="form-group">
                        <label>Description:</label>
                        <textarea placeholder="Enter a description for this point" {...register("description")} />
                        {errors.description && <p className="error">{errors.description.message}</p>}
                    </div>

                    <div className="map-wrapper">
                        <MapContainer center={[19.4326, -99.1332]} zoom={13} style={{ height: "300px" }}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                            />
                            <LocationPicker position={position} setPosition={setPosition} setValue={setValue} />
                        </MapContainer>
                        <p className="map-instruction">Click on the map to select a point</p>
                        {(!position || errors.location) && (
                            <p className="error">
                                {position ? errors.location?.message : "Please click on the map to select a point"}
                            </p>
                        )}
                    </div>

                    {serverError && <p className="error">{serverError}</p>}

                    <button type="submit">Register Point</button>
                </form>
            </div>

            {successMessage && (
                <div className="toast success-toast">
                    {successMessage}
                </div>
            )}
        </>
    );
}

export default PointRegister;