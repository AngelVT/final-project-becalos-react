import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { z } from "zod";
import { API_URL } from "../config/env.config.js";
import "../styles/register.css";

axios.defaults.withCredentials = true;

// Zod validation schema
const registerSchema = z
    .object({
        name: z
            .string()
            .min(2, "Name must be at least 2 characters")
            .max(50, "Name must be at most 50 characters")
            .regex(/^[a-zA-ZÀ-ÿ' -]+$/, "Invalid name format"),

        username: z.string().email("Invalid email format"),

        password: z
            .string()
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/,
                "Password must be at least 8 chars, include upper/lowercase, number, and special char"
            ),

        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (submitting) return;
        setSubmitting(true);
        setErrors({});

        // Validate inputs with Zod
        const result = registerSchema.safeParse(formData);
        if (!result.success) {
            const fieldErrors = {};
            result.error.issues.forEach((err) => {
                fieldErrors[err.path[0]] = err.message;
            });
            setErrors(fieldErrors);
            setSubmitting(false);
            return;
        }

        try {
            await axios.post(
                `${API_URL}/user/register`,
                {
                    name: formData.name,
                    username: formData.username,
                    password: formData.password,
                },
                { withCredentials: true }
            );

            navigate("/map"); // Redirect to map on success
        } catch (err) {
            if (err.response?.data?.errors) {
                setErrors(err.response.data.errors);
            } else if (err.response?.data?.msg) {
                setErrors({ general: err.response.data.msg });
            } else {
                setErrors({ general: "Registration failed. Please try again." });
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit} className="register-form" noValidate>
                <h2>Create Account</h2>

                {/* Name */}
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    {errors.name && <p className="error">{errors.name}</p>}
                </div>

                {/* Email */}
                <div className="form-group">
                    <label htmlFor="username">Email</label>
                    <input
                        type="email"
                        name="username"
                        placeholder="Enter your email"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    {errors.username && <p className="error">{errors.username}</p>}
                </div>

                {/* Password */}
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter a strong password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                </div>

                {/* Confirm Password */}
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    {errors.confirmPassword && (
                        <p className="error">{errors.confirmPassword}</p>
                    )}
                </div>

                {/* General error */}
                {errors.general && <p className="error">{errors.general}</p>}

                <button type="submit" className="btn-register" disabled={submitting}>
                    {submitting ? "Registering..." : "Register"}
                </button>

                <p className="login-link" onClick={() => navigate("/login")}>
                    Log in here!
                </p>
            </form>
        </div>
    );
}

export default Register;